import { NextRequest } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import { mysqlConnection } from "~~/db/mysqlConnection";

export const POST = async (request: NextRequest) => {
  let conn;
  try {
    const { email, state, code } = await request.json();

    conn = await mysqlConnection();

    const [row] = await conn.execute<RowDataPacket[]>(
      "SELECT code_verifier, state FROM user_x_auth JOIN user AS u ON u.id = user_x_auth.user_idWHERE u.email = ?",
      [email],
    );

    console.log(row);
    if (row.length === 0) return Response.json({ message: "Unauthorized or invalid request" }, { status: 401 });

    if (row[0].code_verifier !== code || state !== row[0].state)
      return Response.json({ message: "Unauthorized or invalid request" }, { status: 401 });

    // 🚀 Intercambio code -> tokens
    // const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: new URLSearchParams({
    //     client_id: process.env.TWITTER_CLIENT_ID!,
    //     grant_type: "authorization_code",
    //     code,
    //     redirect_uri: process.env.TWITTER_REDIRECT_URI!,
    //     code_verifier: record.code_verifier,
    //   }),
    // });

    // const tokenData = await tokenRes.json();

    // console.log(tokenData);
    // if (!tokenRes.ok) {
    //   console.error("Token exchange failed", tokenData);
    //   return Response.json({ message: "OAuth token exchange failed" }, { status: 502 });
    // }
  } catch (err) {
    console.log(err);
  } finally {
    conn?.end();
  }
};
