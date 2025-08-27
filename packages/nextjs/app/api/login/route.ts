import { NextRequest } from "next/server";
import { mysqlConnection } from "~~/db/mysqlConnection";

export const POST = async (request: NextRequest) => {
  try {
    const { message } = await request.json();

    const conn = await mysqlConnection();

    const [results, fields] = await conn.query("SELECT * FROM user");

    console.log(results);
    console.log(fields);

    return Response.json({ results, message });
  } catch (err) {
    console.log(err);
    return Response.json({ err }, { status: 400 });
  }
};
