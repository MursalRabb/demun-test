import { sendMessageAndRetrieveResponse } from "@/services/openai";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const { query } = await request.json();

  const name = searchParams.get("assistant");

  try {
    const message = await sendMessageAndRetrieveResponse(
      "thread_VRd2K4vgv7krK0MPTkYCg2R3",
      query,
      name
    );
    return Response.json({ message });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
