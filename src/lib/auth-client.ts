import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth.ts";
import {
    inferAdditionalFields,
    genericOAuthClient,
    oidcClient,
    lastLoginMethodClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
        inferAdditionalFields<typeof auth>(),
        genericOAuthClient(),
        oidcClient(),
        lastLoginMethodClient(),
    ],
});

export const { signIn, signUp, useSession } = authClient;
