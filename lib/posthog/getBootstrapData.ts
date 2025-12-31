import { cookies } from "next/headers";
import { PostHog } from "posthog-node";
import { env } from "../env";
import { generateId } from "./genId";

export async function getBootstrapData() {
  let distinct_id = "";
  const phProjectAPIKey = env.NEXT_PUBLIC_POSTHOG_KEY;
  const phCookieName = `ph_${phProjectAPIKey}_posthog`;
  const cookieStore = await cookies();
  const phCookie = cookieStore.get(phCookieName);

  if (phCookie) {
    const phCookieParsed = JSON.parse(phCookie.value);
    distinct_id = phCookieParsed.distinct_id;
  }
  if (!distinct_id) {
    distinct_id = generateId();
  }

  const client = new PostHog(phProjectAPIKey, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
  });
  const flags = await client.getAllFlags(distinct_id);
  const bootstrap = {
    distinctID: distinct_id,
    featureFlags: flags,
  };

  return bootstrap;
}
