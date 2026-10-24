// Production is reverse-proxied under usepitchlabs.com/learn (see the main PitchLabs app's own
// next.config.ts rewrite) — every internal link and static asset this app emits needs the
// /learn prefix baked in to resolve correctly once requests actually arrive through that proxy.
// Gated on NEXT_PUBLIC_VERCEL_ENV (same value Vercel sets for VERCEL_ENV, just also exposed to
// the client — see lib/site.js's BASE_PATH, which needs the identical check at runtime) rather
// than always-on, so `next dev` and this project's own Preview deployments keep working
// unprefixed at their own root — only a real Production build picks up the prefix.
const isProxiedProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  // The Age & Development pillar moved from U6–U10 to U8–U12 (2026-10-24). Permanent, so search engines move the
  // old URL's ranking to the new one and the closing links in older articles keep working. basePath is added automatically.
  async redirects() {
    return [
      { source: '/articles/coaching-u6-to-u10', destination: '/articles/coaching-u8-to-u12', permanent: true },
    ]
  },
  ...(isProxiedProduction && { basePath: '/learn' }),
}

module.exports = nextConfig
