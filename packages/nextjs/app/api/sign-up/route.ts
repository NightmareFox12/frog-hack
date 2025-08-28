import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";
import { mysqlConnection } from "~~/db/mysqlConnection";

export const POST = async (request: NextRequest) => {
  let conn;
  try {
    const { nickName, email, password } = await request.json();

    const now = new Date();
    const mysqlDate = now.toISOString().split("T")[0];

    conn = await mysqlConnection();

    //TODO:  poner a funcionar el login
    // TODO: guardar la vaina del localstorage
    // TODO: empezar con las tasks

    //verify nickName
    const [row] = await conn.execute<RowDataPacket[]>("SELECT nick_name FROM user WHERE nick_name = ?", [nickName]);
    if (row.length > 0) return Response.json({ message: "The username already exists" }, { status: 400 });

    //verify email
    const [row2] = await conn.execute<RowDataPacket[]>("SELECT email FROM user WHERE email = ?", [email]);
    if (row2.length > 0) return Response.json({ message: "The email already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    await conn.execute("INSERT INTO user(nick_name, email, password, date) VALUES (?,?,?,?)", [
      nickName,
      email,
      hashedPassword,
      mysqlDate,
    ]);

    return Response.json({ success: "ok" });
  } catch (err) {
    console.log(err);
    return Response.json({ err }, { status: 400 });
  } finally {
    await conn?.end();
  }
};
