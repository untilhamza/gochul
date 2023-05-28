This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Next steps for this project

- [x] Implement initial frontend design
- [x] Update loading states during authentication
- [ ] Add api routes for interacting with data models `(in progress)`

### District model

- [x] The districts should be set from the frontend by the admin and not hardcoded in schema
-

### Group model

- [x] The leader can delete / deactivate their group
- [x] The leader can only create a new group if they don't have an active group
- [x] Frontend should allow them to create a group, deactivate a group

### Member model

- [x] The leader can add members to a group
- [x] The leader can delete members from a group
- [x] The leader can update the details of a member
- [ ] The leader can view the details of a member
- [ ] The leader can view the details of all members in their group

## Next.js and Prisma examples

- [ ] Example link for routes [prisma demo 1](https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-nextjs/pages/api/post/index.js)
- [ ] Example link for routes [prisma demo 2](https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/pages/api/post/%5Bid%5D.ts)

## Prisma

- [ ] The [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) is an auto-generated and type-safe query builder that's tailored to your data. It lets you interact with your database from your backend logic written in TypeScript or JavaScript. The Prisma Client is used in your API routes to access your database.
- [ ] The [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate) CLI is used to create and apply migrations. Migrations are declarative files that represent your database schema and can be edited manually. The Prisma Migrate CLI is used in your API routes to create and apply migrations.
- [ ] The [Prisma Studio](https://www.prisma.io/docs/concepts/components/prisma-studio) GUI is a visual editor for your database schema. It lets you view and edit data in your database. Prisma Studio is used in your API routes to view and edit data in your database.
- [ ] The [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli-and-configuration) is a command-line interface that helps you manage your Prisma project. It's used to generate the Prisma Client, create migrations, and more. The Prisma CLI is used in your API routes to generate the Prisma Client.
- [ ] The [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema) is a declarative data modeling language. It's used to define your application models and their relations. The Prisma schema is used in your API routes to define your application models and their relations.
-
