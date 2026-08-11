const configuredVercelUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (configuredVercelUrl
    ? `https://${configuredVercelUrl}`
    : "https://portfolio-woad-chi-55.vercel.app");

export const SITE_URL = new URL(configuredSiteUrl);

export function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export const SITE = {
  name: "Jethro Arciaga",
  url: SITE_URL.origin,
  location: "Muntinlupa, Philippines",
  email: "jet.arciaga@gmail.com",
  linkedin: "https://linkedin.com/in/jethroarciaga",
  github: "https://github.com/jetarciaga",
  availability: true,
  availabilityText: "Open to remote and visa-sponsored roles.",
} as const;
