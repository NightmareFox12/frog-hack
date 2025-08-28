import { NextRequest } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import { mysqlConnection } from "~~/db/mysqlConnection";

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID!;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET!;

export const POST = async (request: NextRequest) => {
  let conn;
  try {
    const { email, state, code } = await request.json();

    conn = await mysqlConnection();

    const [row] = await conn.execute<RowDataPacket[]>(
      "SELECT code_verifier, state FROM user_x_auth JOIN user AS u ON u.userID = user_x_auth.userID WHERE u.email = ?",
      [email],
    );

    if (row.length === 0) return Response.json({ message: "Unauthorized or invalid request" }, { status: 401 });

    if (state !== row[0].state) return Response.json({ message: "Unauthorized or invalid request" }, { status: 401 });

    // 🚀 Intercambio code -> tokens
    const encoded = Buffer.from(TWITTER_CLIENT_ID + ":" + TWITTER_CLIENT_SECRET).toString("base64");

    const req = await fetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `Bearer ${encoded}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: TWITTER_CLIENT_ID,
        redirect_uri: "https://www.froghack.fun",
        code_verifier: row[0].code_verifier,
      }),
    });

    const res = await req.json();

    console.log(res);
    if (!req.ok) {
      console.error("Token exchange failed", res);
      return Response.json({ message: "OAuth token exchange failed" }, { status: 502 });
    }

    return Response.json({ message: "success!!" });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "A server error has occurred" }, { status: 500 });
  } finally {
    conn?.end();
  }
};
