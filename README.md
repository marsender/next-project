# Next-project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) :

```bash
npx create-next-app@latest next-project --ts --app --src-dir --eslint --turbopack --tailwind --import-alias "@/*"
```

Inspiration for the architecture and components comes from [Digest.club application](https://github.com/premieroctet/digestclub)

Backend is provided by [Directus](https://directus.io/)

- [Directus Next.js example](https://github.com/directus-labs/examples/tree/main/nextjs)
- [Directus Page Components](https://docs.directus.io/guides/headless-cms/reusable-components.html)
- [Directus JavaScript SDK](https://docs.directus.io/guides/sdk/getting-started.html)
- [Using Directus Auth with NextAuth.js](https://docs.directus.io/blog/directus-auth-nextauth.html)

Frontend libraries

- [Radix UI](https://www.radix-ui.com/primitives)

## Install

```bash
git clone git@github.com:marsender/next-project.git
cd next-project
npm install
```

## Build for dev

```bash
npm run dev
```

## Build for prod

```bash
npm run build
npm run start
```

## Lint code

```bash
npm run lint
```
