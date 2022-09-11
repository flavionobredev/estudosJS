import { JWTAdapter } from "./jwt.adapter";
import { ZlibCompressAdapter } from "./zlib.adapter";

async function bootstrap() {
  const jwtAdapter = new JWTAdapter("wrong_secret");
  const compressAdapter = new ZlibCompressAdapter();

  const token = await jwtAdapter.encrypt(
    JSON.stringify({
      name: "John Doe",
      age: 30,
      city: "New York",
    })
  );

  console.log("unzipped token", token);

  const compressedToken = compressAdapter.compress(token);

  console.log("\n\ncompressed token", compressedToken);
}

bootstrap();
