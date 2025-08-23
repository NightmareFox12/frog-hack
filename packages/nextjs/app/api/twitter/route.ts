import type { NextRequest } from "next/server";
import crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY || "";

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

//TODO: aqui es donde viene lo dificil. DEBO USAR el secret key mas el payload para no tener que almacenar nada en bd y asi ayudarme con la carga. claro, una vez generado debo entregarlo al front para que el user vaya a twitter y en el redirect poder verificarl
export async function POST(request: NextRequest) {
  try {
    const res = await request.json();

    console.log(res);

    const payload = JSON.stringify({
      nonce: crypto.randomBytes(8).toString("hex"),
      ts: Date.now(),
    });
    const signature = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");

    const state = Buffer.from(`${payload}.${signature}`).toString("base64url");
    return state;

    // return Response.json()
  } catch (err) {
    console.log(err);
    return Response.json({ response: err }, { status: 400 });
  }
}

//verificar en otro endpoint
// function verifyState(state) {
//   const raw = Buffer.from(state, "base64url").toString();
//   const [payload, signature] = raw.split(".");
//   const expected = crypto
//     .createHmac("sha256", process.env.SECRET_KEY)
//     .update(payload)
//     .digest("hex");

//   if (expected !== signature) return false;

//   const { ts } = JSON.parse(payload);
//   return Date.now() - ts < 5 * 60 * 1000; // 5 min
// }
