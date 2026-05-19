const BACKEND_BASE_URL = "http://127.0.0.1:8000";

export async function GET(request, { params }) {
  try {
    const parts = Array.isArray(params?.path) ? params.path : [];
    const encodedPath = parts.map(encodeURIComponent).join("/");
    const backendUrl = `${BACKEND_BASE_URL}/storage/${encodedPath}`;

    const response = await fetch(backendUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return new Response("Image not found", { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (error) {
    return new Response(`Failed to fetch image: ${String(error)}`, { status: 500 });
  }
}
