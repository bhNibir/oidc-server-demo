import Database from "better-sqlite3";
import { genericOAuth, oidcProvider } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: new Database(process.env.DATABASE_URL || "database.sqlite"),
    appName: "odic-test",
    plugins: [
        oidcProvider({
            loginPage: "/sign-in",
        }),
        genericOAuth({
            config: [],
        }),
        nextCookies(),
    ],
});
