# Next-project

![CI](https://github.com/marsender/next-project/workflows/CI/badge.svg)

## Description

This is a starter web application template built with Next.js framework for the frontend and Directus as a headless CMS for the backend. It features internationalization, a component-based architecture inspired by Digest.club, and a comprehensive testing suite using Vitest for unit tests and Playwright for end-to-end tests. The user interface is built with Tailwind CSS, Radix UI and Shadcn UI.

---

[Next.js](https://nextjs.org) frontend

- [Bootstrap next project with `create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- [Internationalization](https://nextjs.org/docs/pages/building-your-application/routing/internationalization)
- [App Router setup with i18n routing](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
- [next-intl example app](https://github.com/amannn/next-intl/tree/main/examples/example-app-router)
- [Translate i18next JSON resources/files](https://translate.i18next.com/)
- [How to set up Next.js for production](https://janhesters.com/blog/how-to-set-up-nextjs-15-for-production-in-2025)
- [Vitest tests](https://vitest.dev/)
- [Playwright end-to-end tests](https://playwright.dev/)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com/primitives)
- [Shadcn UI](https://ui.shadcn.com/)

[Directus](https://directus.io/) backend

- [Directus Next.js example](https://github.com/directus-labs/examples/tree/main/nextjs)
- [Directus page components](https://docs.directus.io/guides/headless-cms/reusable-components.html)
- [Directus JavaScript SDK](https://docs.directus.io/guides/sdk/getting-started.html)
- [Using Directus Auth with NextAuth.js](https://docs.directus.io/blog/directus-auth-nextauth.html)
- [Using Directus Auth in Next.js](https://docs.directus.io/blog/implement-directus-auth-in-next-js-14.html)

## Architecture

Inspiration for the architecture and components comes from [Digest.club application](https://github.com/premieroctet/digestclub)

Next

- page.tsx files are used to define a specific routes for the application
  and typically exports a React component that represents the content of that page
- layout.tsx files applies a layout for the current and all subfolders pages.tsx files

Directus

- requests are made from Next.js on server side, not from client side

## Requirements

This project require the following to get started:

- Node.js v22.19 (lts/jod)
- A directus instance [see my directus-project](https://github.com/marsender/directus-project)

## Install

```bash
git clone https://github.com/marsender/next-project.git
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
npm run type-check
```

## Finds and fixes unused dependencies, exports and files

```bash
npm run knip
```

## Run tests

Copy env and adjust

```bash
cp .env.test .env.test.local
```

Vitest tests

```bash
npm test
```

Vitest coverage

```bash
npm run coverage
```

Playwright end-to-end tests

```bash
npm run test:e2e # Console tests
npm run test:e2e:ui # UI tests
```
