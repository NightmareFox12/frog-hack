import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    console.log(url);

    return Response.json({ message: "Hello World 2.0", url });
    //TODO: verificar en tasks cuando el usuario llegue con el ?state y ?code y comprobar si hace match con el que tenia para enviarlo, mientras se hace eso ponerle un loading al usuario para que espere. porque despues del match debo hacer una locura. el cual es llamar al endpoint a ver si ese usuario sigue a las cuentas que este luis diga. que peo
  } catch (err) {
    console.log(err);
    return Response.json({ success: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();

    console.log(res);

    // return Response.json()
  } catch (err) {
    console.log(err);
    return Response.json({ response: err }, { status: 400 });
  }
}
