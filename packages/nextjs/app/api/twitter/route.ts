import { NextRequest } from "next/server";
import crypto from "crypto";
import { RowDataPacket } from "mysql2/promise";
import { mysqlConnection } from "~~/db/mysqlConnection";

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;

export const POST = async (request: NextRequest) => {
  let conn;
  try {
    const { email } = await request.json();

    const redirectUri = encodeURIComponent("https://www.froghack.fun");
    const codeVerifier = crypto.randomBytes(32).toString("base64url");
    const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");
    const state = crypto.randomBytes(16).toString("hex");

    conn = await mysqlConnection();

    const [row] = await conn.execute<RowDataPacket[]>("SELECT userID FROM user WHERE email = ?", [email]);

    await conn.execute("DELETE FROM user_x_auth WHERE userID = ?", [row[0].userID]);
    await conn.execute("INSERT INTO user_x_auth(userID, code_verifier, state) VALUES (?, ?, ?)", [
      row[0].userID,
      codeVerifier,
      state,
    ]);

    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${redirectUri}&scope=users.read%20follows.read&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`;

    return Response.json({ url });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "A server error has occurred" }, { status: 500 });
  } finally {
    conn?.end();
  }
};
