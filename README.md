# Aman Aditya — Portfolio

Personal portfolio site for Aman Aditya, Software Engineer.

## Stack

- TanStack Start (React 19 + Vite)
- TypeScript
- Tailwind CSS

## Development

Requires Node.js 20+.

```sh
npm install
npm run dev
```

The dev server runs on http://localhost:8080.

## Build

```sh
npm run build
```

## Deploying to Vercel

The build targets the Vercel preset, so no extra configuration is needed:

1. Push this repository to GitHub.
2. In Vercel, "Add New… → Project" and import the repository.
3. Framework preset: **Other**. Build command `npm run build`, install command `npm install`.
4. Deploy.

Static files (photo, resume PDF, favicon, robots.txt) live in `public/`.
