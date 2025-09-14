// import Database from "better-sqlite3";
import { bearer, lastLoginMethod, oidcProvider, admin, openAPI, jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

import {getGenericOAuthConfig} from "./oidc-cofig"

const trustedClients = await getGenericOAuthConfig()


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

    disabledPaths: [
        "/token",
    ],

    plugins: [
        lastLoginMethod() ,        
        jwt(), 
        oidcProvider({
            loginPage: "/sign-in",
            useJWTPlugin: true,
            trustedClients: [
               ...trustedClients
            ]
            
        }),
        admin(),
        bearer(),
        openAPI(),
        nextCookies(),
    ],
});
