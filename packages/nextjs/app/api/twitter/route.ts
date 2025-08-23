import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log(req);

    return Response.json({ message: "Hello World 2.0" });
  } catch (err) {
    console.log(err);
    return Response.json({ success: false });
  }
}

export async function POST(res: NextResponse, req: NextRequest) {
  try {
    const body = await req.json();
    console.log(req);
    console.log(res);

    return Response.json({ response: body });
  } catch (err) {
    console.log(err);
    return Response.json({ success: false });
  }
}
