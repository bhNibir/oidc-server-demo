import Database from "better-sqlite3";
import { genericOAuth, lastLoginMethod, oidcProvider } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: new Database(process.env.DATABASE_URL || "database.sqlite"),
    appName: "odic-test",
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        lastLoginMethod() ,

        oidcProvider({
            loginPage: "/sign-in",
        }),
        genericOAuth({
            config: [],
        }),
        nextCookies(),
    ],
});
