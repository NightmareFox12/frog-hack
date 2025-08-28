import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2/promise";
import { mysqlConnection } from "~~/db/mysqlConnection";

export const POST = async (request: NextRequest) => {
  let conn;
  try {
    const { email, password } = await request.json();

    conn = await mysqlConnection();

    const [row] = await conn.execute<RowDataPacket[]>("SELECT email, password FROM user WHERE email = ?", [email]);
    if (row.length === 0) return Response.json({ message: "The user no exists" }, { status: 400 });

    const verifyPassword = await bcrypt.compare(password, row[0].password);
    if (!verifyPassword) return Response.json({ message: "The password is incorrect" }, { status: 400 });

    return Response.json({ message: "ok" });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "A server error has occurred" }, { status: 500 });
  } finally {
    await conn?.end();
  }
};
