# Next-project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) :

```bash
npx create-next-app@latest next-project --ts --app --src-dir --eslint --turbopack --tailwind --import-alias "@/*"
cd next-project
npm install @directus/sdk
npm add next-auth # server session
npm add react-hot-toast
npm add lucide-react
npm add @radix-ui/react-navigation-menu
npm add class-variance-authority
npm add --dev clsx
```

Inspiration for the architecture and components comes from [Digest.club application](https://github.com/premieroctet/digestclub)

Backend is provided by [Directus](https://directus.io/)

- [Directus Next.js example](https://github.com/directus-labs/examples/tree/main/nextjs)
- [Create Re-Usable Page Components](https://docs.directus.io/guides/headless-cms/reusable-components.html)
- [Using Directus Auth with NextAuth.js](https://docs.directus.io/blog/directus-auth-nextauth.html)

Frontend libraries

- [Radix UI](https://www.radix-ui.com/primitives)

## Install

```bash
git clone git@github.com:marsender/next-project.git
cd next-project
npm run dev
```
