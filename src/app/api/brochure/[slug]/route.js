import { apiGet } from "@/lib/api/get";
import { defaultLocale, hasLocale } from "@/i18n/config";

// Longest wait for the file to start; the body itself may take longer.
const HEADERS_TIMEOUT_MS = 10000;

const fail = (status) => new Response(null, { status });

// The CMS serves brochures from another origin without Content-Disposition, where <a download> is ignored,
// so the file is passed through here as an attachment. Only the CMS decides the URL: the visitor sends a slug.
export async function GET(request, { params }) {
  const { slug } = await params;
  if (!/^[\w-]+$/.test(slug)) return fail(404);

  // Passed explicitly: next/root-params is not available in Route Handlers.
  const query = new URL(request.url).searchParams.get("lang");
  const lang = hasLocale(query) ? query : defaultLocale;

  const { data, error } = await apiGet(`/vehicles/${slug}`, { lang });
  if (error) return fail(error.status === 404 ? 404 : 502);
  const brochure = data?.vehicle?.brochure;
  if (!brochure) return fail(404);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HEADERS_TIMEOUT_MS);
  let file;
  try {
    file = await fetch(brochure, {
      cache: "no-store",
      signal: controller.signal,
    });
  } catch (fetchError) {
    console.error(`brochure ${slug} failed:`, fetchError.message);
    return fail(502);
  } finally {
    clearTimeout(timer);
  }

  const type = file.headers.get("content-type");
  if (!file.ok || !type?.includes("application/pdf")) {
    console.error(`brochure ${slug} failed: ${file.status} ${type}`);
    await file.body?.cancel();
    return fail(502);
  }

  return new Response(file.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}-brochure.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
