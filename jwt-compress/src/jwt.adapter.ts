import { Decrypter } from "protocols/decrypter";
import { Encrypter } from "protocols/encrypter";
import jwt from "jsonwebtoken";

export class JWTAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret, {
      noTimestamp: true,
      expiresIn: "1d",
    });
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any;
  }
}
