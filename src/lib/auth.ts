import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
import { organization } from "better-auth/plugins";
import { getActiveOrganization } from "@/server/organizations";
import { ac, administrator, member, owner } from "./auth/permissions";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await getActiveOrganization(session.userId);
          return {
            data: {
              ...session,
              activeOrganizationId: organization?.id,
            },
          };
        },
      },
    },
  },
  database: drizzleAdapter(db, { provider: "pg", schema }),
  plugins: [
    admin(),
    organization({
      ac,
      roles: {
        owner,
        administrator,
        member,
      },
    }),
    nextCookies(),
  ],
});
