import Database from "better-sqlite3";
import { genericOAuth, lastLoginMethod, oidcProvider, admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

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
        }
    },
    emailAndPassword: {
        enabled: true,
    },


    plugins: [
        lastLoginMethod() ,        
        jwt(), 
        oidcProvider({
            loginPage: "/sign-in",
            useJWTPlugin: true,
            trustedClients: [
                {
                    clientId: "VfrolVsbmKCPhSYQgIgpEnmFakpmfGgk",
                    clientSecret: "BxUtjGQkBfdxCWjlxGlNsiZoxOFzurPX",
                    name: "test-app",
                    type: "web",
                    redirectURLs: ["http://localhost:3001/api/auth/oauth2/callback/test-app"],
                    disabled: false,
                    skipConsent: true, // Skip consent for this trusted client
                    metadata: { internal: true }
                },
            ]
            
        }),
        admin(),
        nextCookies(),
    ],
});
