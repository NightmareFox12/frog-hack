import { NextRequest } from "next/server";
import crypto from "crypto";
import { RowDataPacket } from "mysql2/promise";
import { mysqlConnection } from "~~/db/mysqlConnection";

// const SECRET_KEY = process.env.SECRET_KEY || "";

export const POST = async (request: NextRequest) => {
  let conn;
  try {
    const { email } = await request.json();

    const clientID = "T1J0LXN0dm9jR3YyM2V0c2FsRlc6MTpjaQ";
    const redirectUri = encodeURIComponent("https://www.froghack.fun");
    const codeVerifier = crypto.randomBytes(32).toString("base64url");
    const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");
    const state = crypto.randomBytes(16).toString("hex");

    conn = await mysqlConnection();

    const [row] = await conn.execute<RowDataPacket[]>("SELECT userID FROM user WHERE email = ?", [email]);

    await conn.execute<RowDataPacket[]>("INSERT INTO user_x_auth(userID, code_challenge, state) VALUES (?, ?, ?)", [
      row[0].userID,
      codeChallenge,
      state,
    ]);

    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}&scope=users.read%20follows.read&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`;

    return Response.json({ url });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "A server error has occurred" }, { status: 500 });
  } finally {
    conn?.end();
  }
};

//TODO: aqui es donde viene lo dificil. DEBO USAR el secret key mas el payload para no tener que almacenar nada en bd y asi ayudarme con la carga. claro, una vez generado debo entregarlo al front para que el user vaya a twitter y en el redirect poder verificarl
// export async function POST(request: NextRequest) {
//   try {
//     const res = await request.json();

//     console.log(res);

//     const payload = JSON.stringify({
//       nonce: crypto.randomBytes(8).toString("hex"),
//       ts: Date.now(),
//     });
//     const signature = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");

//     const state = Buffer.from(`${payload}.${signature}`).toString("base64url");
//     return state;

//     // return Response.json()
//   } catch (err) {
//     console.log(err);
//     return Response.json({ response: err }, { status: 400 });
//   }
// }

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
