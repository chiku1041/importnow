# ImportNow

Next.js App Router site for [importnow.in](https://importnow.in), deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`.

## Local development

```bash
npm install
npm run dev
```

Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Deploy to Cloudflare (free Workers plan)

OpenNext warns that local builds on Windows can be flaky. Prefer **Cloudflare Git builds** (Linux) for production; use WSL or `npm run deploy` only if that works on your machine.

### Recommended: Git-connected deploy

1. Push this repo to GitHub/GitLab.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → connect the repo.
3. Configure:
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx opennextjs-cloudflare deploy`
   - **Environment variables:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. You get a `*.workers.dev` URL first.

### Alternative: CLI deploy from this machine

```bash
npx wrangler login
npm run deploy
```

`NEXT_PUBLIC_*` values are baked in at **build** time. They are read from `.env.local` / `.env.production` (gitignored), or from the shell / Cloudflare build env.

### Attach your domain (`importnow.in`)

1. Add the domain in Cloudflare (or move DNS to Cloudflare if it is elsewhere).
2. In **Workers & Pages → importnow-app → Settings → Domains & Routes**, add `importnow.in` and `www.importnow.in`.
3. Point DNS as Cloudflare instructs.
4. After DNS cuts over, remove or pause the old Vercel project so it is not serving traffic.

### Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local Next.js dev server |
| `npm run preview` | Build and run in the Workers runtime locally |
| `npm run deploy` | Build and deploy to Cloudflare |
| `npm run cf-typegen` | Generate Cloudflare binding types |

## Notes

- Image optimization uses the Cloudflare `IMAGES` binding (configured in `wrangler.jsonc`).
- Google Analytics remains in `src/app/layout.tsx`; Vercel Analytics was removed.
- Keep using `next dev --webpack` on Windows (Turbopack can crash with exit code 3221225501).
