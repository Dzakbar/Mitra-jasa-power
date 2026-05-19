const BACKEND_BASE_URL = "http://127.0.0.1:8000";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/gallery`, {
      cache: "no-store",
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch gallery", error: String(error) },
      { status: 500 }
    );
  }
}
