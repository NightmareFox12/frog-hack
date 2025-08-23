import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    console.log(url);

    return Response.json({ message: "Hello World 2.0", url });
  } catch (err) {
    console.log(err);
    return Response.json({ success: false });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(req);

    return Response.json({ response: body });
  } catch (err) {
    console.log(err);
    return Response.json({ success: false });
  }
}
