# Next-project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) :

```bash
npx create-next-app@latest next-project --ts --app --src-dir --eslint --turbopack --tailwind --import-alias "@/*"
```

Inspiration for the architecture and components comes from [Digest.club application](https://github.com/premieroctet/digestclub)

Backend is provided by [Directus](https://directus.io/)

- [Directus Next.js example](https://github.com/directus-labs/examples/tree/main/nextjs)
- [Directus page components](https://docs.directus.io/guides/headless-cms/reusable-components.html)
- [Directus JavaScript SDK](https://docs.directus.io/guides/sdk/getting-started.html)
- [Using Directus Auth with NextAuth.js](https://docs.directus.io/blog/directus-auth-nextauth.html)
- [Using Directus Auth in Next.js](https://docs.directus.io/blog/implement-directus-auth-in-next-js-14.html)
- [Internationalization](https://nextjs.org/docs/pages/building-your-application/routing/internationalization)
- [App Router setup with i18n routing](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
- [next-intl example app](https://github.com/amannn/next-intl/tree/main/examples/example-app-router)
- [Translate i18next JSON resources/files](https://translate.i18next.com/)
- [How to set up Next.js for production](https://janhesters.com/blog/how-to-set-up-nextjs-15-for-production-in-2025)
- [Vitest tests](https://vitest.dev/)
- [Playwright end-to-end tests](https://playwright.dev/)

Frontend libraries

- [Radix UI](https://www.radix-ui.com/primitives)

## Architecture

Next

- page.tsx files are used to define a specific routes for the application
  and typically exports a React component that represents the content of that page
- layout.tsx files applies a layout for the current and all subfolders pages.tsx files

Directus

- requests are made from Next.js on server side, not from client side

## Install

```bash
git clone git@github.com:marsender/next-project.git
cd next-project
npm install
```

## Adjut env for dev and test

```bash
nano .env.local
nano .env.test
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
npm run lint:fix # to fix lint errors
```

## Run tests

Vitest tests

```bash
npm test
```

Playwright end-to-end tests

```bash
npm run test:e2e # Console tests
npm run test:e2e:ui # UI tests
```
