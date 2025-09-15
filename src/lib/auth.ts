// import Database from "better-sqlite3";
import {
  bearer,
  lastLoginMethod,
  oidcProvider,
  admin,
  openAPI,
  jwt,
} from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { createAuthMiddleware, getSessionFromCtx } from "better-auth/api";

import { getGenericOAuthConfig } from "./oidc-config";

const trustedClients = await getGenericOAuthConfig();

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",

    schema: schema,
  }),
  appName: "odic-test",
  // trustedOrigins: [process.env.BETTER_AUTH_URL!],
  account: {
    accountLinking: {
      enabled: true,
      // trustedProviders: ["test-app"],
    },
  },
  emailAndPassword: {
    enabled: true,
  },

  disabledPaths: ["/token"],

  plugins: [
    lastLoginMethod(),
    jwt(),
    oidcProvider({
      loginPage: "/sign-in",
      useJWTPlugin: true,
      trustedClients: [...trustedClients],
    }),
    admin(),
    bearer(),
    openAPI(),
    nextCookies(),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-out") {
        const session = await getSessionFromCtx(ctx);
        if (session) {
          return;
        }
        ctx.context.session = session;
      }
      return;
    }),

    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-out") {
        const { returned, adapter, session } = ctx.context;
        const result = returned as { success?: boolean } | undefined;
        if (result?.success && session?.user) {
          await adapter.deleteMany({
            model: "oauthAccessToken",
            where: [
              {
                field: "userId",
                value: session.user.id,
              },
            ],
          });
        }
        return;
      }
    }),
  },
});
