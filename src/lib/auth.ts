import Database from "better-sqlite3";
import { genericOAuth, lastLoginMethod, oidcProvider } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

export const auth = betterAuth({
    database: new Database(process.env.DATABASE_URL || "database.sqlite"),
    appName: "odic-test",
    // trustedOrigins: ["http://localhost:3001"],
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
        nextCookies(),
    ],
});
