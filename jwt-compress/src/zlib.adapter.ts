import { UnzipCompression } from "protocols/unzip";
import { ZipCompression } from "protocols/zip";
import { gzipSync, unzipSync } from "zlib";

const COMPRESSION_ENCODING = "base64";

export class ZlibCompressAdapter implements ZipCompression, UnzipCompression {
  compress(value: string): string {
    const buffer = gzipSync(value);
    return buffer.toString(COMPRESSION_ENCODING);
  }

  uncompress(value: string): string {
    const buffer = Buffer.from(value, COMPRESSION_ENCODING);
    return unzipSync(buffer).toString();
  }
}
