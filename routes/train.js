const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");
const { Transform } = require("stream");

// كلاس التشفير
class EncryptStream extends Transform {
  constructor(key, vector) {
    super();
    this.key = key;
    this.vector = vector;
  }

  _transform(chunk, encoding, callback) {
    try {
      const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        this.key,
        this.vector
      );
      const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]);
      this.push(encrypted);
      callback();
    } catch (err) {
      callback(err);
    }
  }
}

// توليد المفتاح و IV (وتخزينهم)
const key = crypto.randomBytes(32); // 256 بت
const vector = crypto.randomBytes(16); // 128 بت

fs.writeFileSync(
  "key.json",
  JSON.stringify({
    key: key.toString("hex"),
    vector: vector.toString("hex"),
  })
);

// إنشاء الـ Streams
const readableStream = fs.createReadStream("input.txt");
const gzipStream = zlib.createGzip();
const encryptStream = new EncryptStream(key, vector);
const writableStream = fs.createWriteStream("output.txt.gz.enc");

// تنفيذ سلسلة الـ pipe
readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream);

console.log("✅ تم ضغط وتشفير الملف!");
