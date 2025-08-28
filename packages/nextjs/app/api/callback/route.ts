import { NextRequest } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import { mysqlConnection } from "~~/db/mysqlConnection";

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;

export const POST = async (request: NextRequest) => {
  let conn;
  try {
    const { email, state, code } = await request.json();

    conn = await mysqlConnection();

    const [row] = await conn.execute<RowDataPacket[]>(
      "SELECT code_verifier, state FROM user_x_auth JOIN user AS u ON u.id = user_x_auth.user_id WHERE u.email = ?",
      [email],
    );

    console.log(row);
    if (row.length === 0) return Response.json({ message: "Unauthorized or invalid request" }, { status: 401 });

    if (row[0].code_verifier !== code || state !== row[0].state)
      return Response.json({ message: "Unauthorized or invalid request" }, { status: 401 });

    // 🚀 Intercambio code -> tokens
    const req = await fetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: TWITTER_CLIENT_ID!,
        redirect_uri: "https://www.froghack.fun",
        code_verifier: row[0].code_verifier,
      }),
    });

    const res = await req.json();

    console.log(res);
    if (!res.ok) {
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
