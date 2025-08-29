import { NextRequest } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import { mysqlConnection } from "~~/db/mysqlConnection";

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID!;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET!;
// const FROG_USER_ID = process.env.FROG_USER_ID!;

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

    const encoded = Buffer.from(TWITTER_CLIENT_ID + ":" + TWITTER_CLIENT_SECRET).toString("base64");

    const req = await fetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encoded}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: TWITTER_CLIENT_ID,
        redirect_uri: "https://www.froghack.fun",
        code_verifier: row[0].code_verifier,
      }),
    });

    const res: { access_token: string } = await req.json();

    console.log(res);

    if (!req.ok) return Response.json({ message: "OAuth token exchange failed" }, { status: 502 });
    await conn.execute<RowDataPacket[]>("UPDATE user SET bearer_x = ?", [res.access_token]);

    // 2. Obtener el ID del usuario autenticado
    // const meResp = await fetch("https://api.x.com/2/users/me", {
    //   headers: { Authorization: `Bearer ${res.access_token}` },
    // });

    // const meData = await meResp.json();
    // const myUserId = meData.data.id;

    // 3. Verificar si sigue a Froghacknet
    // const followResp = await fetch(`https://api.x.com/2/users/${myUserId}/following/${FROG_USER_ID}`, {
    //   headers: { Authorization: `Bearer ${res.access_token}` },
    // });

    // if (followResp.status === 200) {
    //   console.log("El usuario sigue a Froghacknet");
    // } else if (followResp.status === 404) {
    //   console.log("El usuario NO sigue a Froghacknet");
    // }

    return Response.json({ message: "Successful connection" });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "A server error has occurred" }, { status: 500 });
  } finally {
    conn?.end();
  }
};
