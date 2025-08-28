import { NextRequest } from "next/server";
import crypto from "crypto";
import { RowDataPacket } from "mysql2/promise";
import { mysqlConnection } from "~~/db/mysqlConnection";

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

    console.log(row);
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
