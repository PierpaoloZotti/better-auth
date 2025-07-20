import { createAuthClient } from "better-auth/react";
import { adminClient, organizationClient } from "better-auth/client/plugins";
import { ac, administrator, member, owner } from "./auth/permissions";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    adminClient(),
    organizationClient({
      ac,
      roles: {
        owner,
        administrator,
        member,
      },
    }),
  ],
});
