import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log(req);

    return Response.json({ message: "Hello World 2.0" });
  } catch (err) {
    console.log(err);
    return Response.json({ success: false });
  }
}
