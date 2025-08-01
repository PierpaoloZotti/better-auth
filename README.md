# installation: Installation

URL: /docs/installation
Source: https://raw.githubusercontent.com/better-auth/better-auth/refs/heads/main/docs/content/docs/installation.mdx

Learn how to configure Better Auth in your project.

---

title: Installation
description: Learn how to configure Better Auth in your project.

---

<Steps>
  <Step>
    ### Install the Package

    Let's start by adding Better Auth to your project:

    <Tabs items={}>
      <Tab value="npm">
        ```bash
        npm install better-auth
        ```
      </Tab>

      <Tab value="pnpm">
        ```bash
        pnpm add better-auth
        ```
      </Tab>

      <Tab value="yarn">
        ```bash
        yarn add better-auth
        ```
      </Tab>

      <Tab value="bun">
        ```bash
        bun add better-auth
        ```
      </Tab>
    </Tabs>

    <Callout type="info">
      If you're using a separate client and server setup, make sure to install Better Auth in both parts of your project.
    </Callout>

  </Step>

  <Step>
    ### Set Environment Variables

    Create a `.env` file in the root of your project and add the following environment variables:

    1. **Secret Key**

    Random value used by the library for encryption and generating hashes. **You can generate one using the button below** or you can use something like openssl.

    ```txt title=".env"
    BETTER_AUTH_SECRET=
    ```

    <GenerateSecret />

    2. **Set Base URL**

    ```txt title=".env"
    BETTER_AUTH_URL=http://localhost:3000 #Base URL of your app
    ```

  </Step>

  <Step>
    ### Create A Better Auth Instance

    Create a file named `auth.ts` in one of these locations:

    * Project root
    * `lib/` folder
    * `utils/` folder

    You can also nest any of these folders under `src/`, `app/` or `server/` folder. (e.g. `src/lib/auth.ts`, `app/lib/auth.ts`).

    And in this file, import Better Auth and create your auth instance. Make sure to export the auth instance with the variable name `auth` or as a `default` export.

    ```ts title="auth.ts"
    import { betterAuth } from "better-auth";

    export const auth = betterAuth({
      //...
    });
    ```

  </Step>

  <Step>
    ### Configure Database

    Better Auth requires a database to store user data.
    You can easily configure Better Auth to use SQLite, PostgreSQL, or MySQL, and more!

    <Tabs items={["sqlite", "postgres", "mysql"]}>
      <Tab value="sqlite">
        ```ts title="auth.ts"
        import { betterAuth } from "better-auth";
        import Database from "better-sqlite3";

        export const auth = betterAuth({
            database: new Database("./sqlite.db"),
        })
        ```
      </Tab>

      <Tab value="postgres">
        ```ts title="auth.ts"
        import { betterAuth } from "better-auth";
        import { Pool } from "pg";

        export const auth = betterAuth({
            database: new Pool({
                // connection options
            }),
        })
        ```
      </Tab>

      <Tab value="mysql">
        ```ts title="auth.ts"
        import { betterAuth } from "better-auth";
        import { createPool } from "mysql2/promise";

        export const auth = betterAuth({
            database: createPool({
                // connection options
            }),
        })
        ```
      </Tab>
    </Tabs>

    Alternatively, if you prefer to use an ORM, you can use one of the built-in adapters.

    <Tabs items={["drizzle", "prisma", "mongodb"]}>
      <Tab value="drizzle">
        ```ts title="auth.ts"
        import { betterAuth } from "better-auth";
        import { drizzleAdapter } from "better-auth/adapters/drizzle";
        import { db } from "@/db"; // your drizzle instance

        export const auth = betterAuth({
            database: drizzleAdapter(db, {
                provider: "pg", // or "mysql", "sqlite"
            }),
        });
        ```
      </Tab>

      <Tab value="prisma">
        ```ts title="auth.ts"
        import { betterAuth } from "better-auth";
        import { prismaAdapter } from "better-auth/adapters/prisma";
        // If your Prisma file is located elsewhere, you can change the path
        import { PrismaClient } from "@/generated/prisma";

        const prisma = new PrismaClient();
        export const auth = betterAuth({
            database: prismaAdapter(prisma, {
                provider: "sqlite", // or "mysql", "postgresql", ...etc
            }),
        });
        ```
      </Tab>

      <Tab value="mongodb">
        ```ts title="auth.ts"
        import { betterAuth } from "better-auth";
        import { mongodbAdapter } from "better-auth/adapters/mongodb";
        import { client } from "@/db"; // your mongodb client

        export const auth = betterAuth({
            database: mongodbAdapter(client),
        });
        ```
      </Tab>
    </Tabs>

    <Callout>
      If your database is not listed above, check out our other supported
      [databases](/docs/adapters/other-relational-databases) for more information,
      or use one of the supported ORMs.
    </Callout>

  </Step>

  <Step>
    ### Create Database Tables

    Better Auth includes a CLI tool to help manage the schema required by the library.

    * **Generate**: This command generates an ORM schema or SQL migration file.

    <Callout>
      If you're using Kysely, you can apply the migration directly with `migrate` command below. Use `generate` only if you plan to apply the migration manually.
    </Callout>

    ```bash title="Terminal"
    npx @better-auth/cli generate
    ```

    * **Migrate**: This command creates the required tables directly in the database. (Available only for the built-in Kysely adapter)

    ```bash title="Terminal"
    npx @better-auth/cli migrate
    ```

    see the [CLI documentation](/docs/concepts/cli) for more information.

    <Callout>
      If you instead want to create the schema manually, you can find the core schema required in the [database section](/docs/concepts/database#core-schema).
    </Callout>

  </Step>

  <Step>
    ### Authentication Methods

    Configure the authentication methods you want to use. Better Auth comes with built-in support for email/password, and social sign-on providers.

    ```ts title="auth.ts"
    import { betterAuth } from "better-auth";

    export const auth = betterAuth({
      //...other options
      emailAndPassword: {
        // [!code highlight]
        enabled: true, // [!code highlight]
      }, // [!code highlight]
      socialProviders: {
        // [!code highlight]
        github: {
          // [!code highlight]
          clientId: process.env.GITHUB_CLIENT_ID as string, // [!code highlight]
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string, // [!code highlight]
        }, // [!code highlight]
      }, // [!code highlight]
    });
    ```

    <Callout type="info">
      You can use even more authentication methods like [passkey](/docs/plugins/passkey), [username](/docs/plugins/username), [magic link](/docs/plugins/magic-link) and more through plugins.
    </Callout>

  </Step>

  <Step>
    ### Mount Handler

    To handle API requests, you need to set up a route handler on your server.

    Create a new file or route in your framework's designated catch-all route handler. This route should handle requests for the path `/api/auth/*` (unless you've configured a different base path).

    <Callout>
      Better Auth supports any backend framework with standard Request and Response
      objects and offers helper functions for popular frameworks.
    </Callout>

    <Tabs items={["next-js", "nuxt", "svelte-kit", "remix", "solid-start", "hono", "express", "elysia", "tanstack-start", "expo"]} defaultValue="react">
      <Tab value="next-js">
        ```ts title="/app/api/auth/[...all]/route.ts"
        import { auth } from "@/lib/auth"; // path to your auth file
        import { toNextJsHandler } from "better-auth/next-js";

        export const { POST, GET } = toNextJsHandler(auth);
        ```
      </Tab>

      <Tab value="nuxt">
        ```ts title="/server/api/auth/[...all].ts"
        import { auth } from "~/utils/auth"; // path to your auth file

        export default defineEventHandler((event) => {
            return auth.handler(toWebRequest(event));
        });
        ```
      </Tab>

      <Tab value="svelte-kit">
        ```ts title="hooks.server.ts"
        import { auth } from "$lib/auth"; // path to your auth file
        import { svelteKitHandler } from "better-auth/svelte-kit";

        export async function handle({ event, resolve }) {
            return svelteKitHandler({ event, resolve, auth });
        }
        ```
      </Tab>

      <Tab value="remix">
        ```ts title="/app/routes/api.auth.$.ts"
        import { auth } from '~/lib/auth.server' // Adjust the path as necessary
        import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node"

        export async function loader({ request }: LoaderFunctionArgs) {
            return auth.handler(request)
        }

        export async function action({ request }: ActionFunctionArgs) {
            return auth.handler(request)
        }
        ```
      </Tab>

      <Tab value="solid-start">
        ```ts title="/routes/api/auth/*all.ts"
        import { auth } from "~/lib/auth"; // path to your auth file
        import { toSolidStartHandler } from "better-auth/solid-start";

        export const { GET, POST } = toSolidStartHandler(auth);
        ```
      </Tab>

      <Tab value="hono">
        ```ts title="src/index.ts"
        import { Hono } from "hono";
        import { auth } from "./auth"; // path to your auth file
        import { serve } from "@hono/node-server";
        import { cors } from "hono/cors";

        const app = new Hono();

        app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

        serve(app);
        ```
      </Tab>

      <Tab value="express">
        <Callout type="warn">
          ExpressJS v5 introduced breaking changes to route path matching by switching to `path-to-regexp@6`. Wildcard routes like `*` should now be written using the new named syntax, e.g. `/{*any}`, to properly capture catch-all patterns. This ensures compatibility and predictable behavior across routing scenarios.
          See the [Express v5 migration guide](https://expressjs.com/en/guide/migrating-5.html) for details.

          As a result, the implementation in ExpressJS v5 should look like this:

          ```ts
          app.all('/api/auth/{*any}', toNodeHandler(auth));
          ```

          *The name any is arbitrary and can be replaced with any identifier you prefer.*
        </Callout>

        ```ts title="server.ts"
        import express from "express";
        import { toNodeHandler } from "better-auth/node";
        import { auth } from "./auth";

        const app = express();
        const port = 8000;

        app.all("/api/auth/*", toNodeHandler(auth));

        // Mount express json middleware after Better Auth handler
        // or only apply it to routes that don't interact with Better Auth
        app.use(express.json());

        app.listen(port, () => {
            console.log(`Better Auth app listening on port ${port}`);
        });
        ```

        This will also work for any other node server framework like express, fastify, hapi, etc., but may require some modifications. See [fastify guide](/docs/integrations/fastify). Note that CommonJS (cjs) isn't supported.
      </Tab>

      <Tab value="astro">
        ```ts title="/pages/api/auth/[...all].ts"
        import type { APIRoute } from "astro";
        import { auth } from "@/auth"; // path to your auth file

        export const GET: APIRoute = async (ctx) => {
            return auth.handler(ctx.request);
        };

        export const POST: APIRoute = async (ctx) => {
            return auth.handler(ctx.request);
        };
        ```
      </Tab>

      <Tab value="elysia">
        ```ts
        import { Elysia, Context } from "elysia";
        import { auth } from "./auth";

        const betterAuthView = (context: Context) => {
            const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
            // validate request method
            if(BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
                return auth.handler(context.request);
            } else {
                context.error(405)
            }
        }

        const app = new Elysia().all("/api/auth/*", betterAuthView).listen(3000);

        console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
        );
        ```
      </Tab>

      <Tab value="tanstack-start">
        ```ts title="src/routes/api/auth/$.ts"
        import { auth } from '~/lib/server/auth'
        import { createServerFileRoute } from '@tanstack/react-start/server'

        export const ServerRoute = createServerFileRoute('/api/auth/$').methods({
        GET: ({ request }) => {
            return auth.handler(request)
        },
        POST: ({ request }) => {
            return auth.handler(request)
        },
        });
        ```
      </Tab>

      <Tab value="expo">
        ```ts title="app/api/auth/[...all]+api.ts"
        import { auth } from '@/lib/server/auth'; // path to your auth file

        const handler = auth.handler;
        export { handler as GET, handler as POST };
        ```
      </Tab>
    </Tabs>

  </Step>

  <Step>
    ### Create Client Instance

    The client-side library helps you interact with the auth server. Better Auth comes with a client for all the popular web frameworks, including vanilla JavaScript.

    1. Import `createAuthClient` from the package for your framework (e.g., "better-auth/react" for React).
    2. Call the function to create your client.
    3. Pass the base URL of your auth server. (If the auth server is running on the same domain as your client, you can skip this step.)

    <Callout type="info">
      If you're using a different base path other than `/api/auth` make sure to pass
      the whole URL including the path. (e.g.
      `http://localhost:3000/custom-path/auth`)
    </Callout>

    <Tabs
      items={["react", "vue", "svelte", "solid",

"vanilla"]}
defaultValue="react" >
<Tab value="vanilla">
`ts title="lib/auth-client.ts"
        import { createAuthClient } from "better-auth/client"
        export const authClient = createAuthClient({
            /** The base URL of the server (optional if you're using the same domain) */ // [!code highlight]
            baseURL: "http://localhost:3000" // [!code highlight]
        })
        `
</Tab>

      <Tab value="react" title="lib/auth-client.ts">
        ```ts title="lib/auth-client.ts"
        import { createAuthClient } from "better-auth/react"
        export const authClient = createAuthClient({
            /** The base URL of the server (optional if you're using the same domain) */ // [!code highlight]
            baseURL: "http://localhost:3000" // [!code highlight]
        })
        ```
      </Tab>

      <Tab value="vue" title="lib/auth-client.ts">
        ```ts title="lib/auth-client.ts"
        import { createAuthClient } from "better-auth/vue"
        export const authClient = createAuthClient({
            /** The base URL of the server (optional if you're using the same domain) */ // [!code highlight]
            baseURL: "http://localhost:3000" // [!code highlight]
        })
        ```
      </Tab>

      <Tab value="svelte" title="lib/auth-client.ts">
        ```ts title="lib/auth-client.ts"
        import { createAuthClient } from "better-auth/svelte"
        export const authClient = createAuthClient({
            /** The base URL of the server (optional if you're using the same domain) */ // [!code highlight]
            baseURL: "http://localhost:3000" // [!code highlight]
        })
        ```
      </Tab>

      <Tab value="solid" title="lib/auth-client.ts">
        ```ts title="lib/auth-client.ts"
        import { createAuthClient } from "better-auth/solid"
        export const authClient = createAuthClient({
            /** The base URL of the server (optional if you're using the same domain) */ // [!code highlight]
            baseURL: "http://localhost:3000" // [!code highlight]
        })
        ```
      </Tab>
    </Tabs>

    <Callout type="info">
      Tip: You can also export specific methods if you prefer:
    </Callout>

    ```ts
    export const { signIn, signUp, useSession } = createAuthClient()
    ```

  </Step>

  <Step>
    ### 🎉 That's it!

    That's it! You're now ready to use better-auth in your application. Continue to [basic usage](/docs/basic-usage) to learn how to use the auth instance to sign in users.

  </Step>
</Steps>
