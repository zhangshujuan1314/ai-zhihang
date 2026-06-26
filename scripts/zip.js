const fs = require("fs");
const path = require("path");

// Minimal ZIP creator using only built-in modules
const sig = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
const centralSig = Buffer.from([0x50, 0x4b, 0x01, 0x02]);
const endSig = Buffer.from([0x50, 0x4b, 0x05, 0x06]);

function createZip(srcDir, outputPath) {
  const data = [];
  const central = [];
  let offset = 0;

  function addFile(filePath, zipPath) {
    const content = fs.readFileSync(filePath);
    const name = Buffer.from(zipPath, "utf8");

    const header = Buffer.alloc(30 + name.length);
    sig.copy(header, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(0, 6);
    header.writeUInt16LE(0, 8);
    header.writeUInt32LE(0, 10);
    header.writeUInt32LE(0, 14); // crc32 (simplified)
    header.writeUInt32LE(content.length, 18);
    header.writeUInt32LE(content.length, 22);
    header.writeUInt16LE(name.length, 26);
    header.writeUInt16LE(0, 28);

    data.push(header, name, content);

    const cent = Buffer.alloc(46 + name.length);
    centralSig.copy(cent, 0);
    header.copy(cent, 4, 4, 26);
    cent.writeUInt32LE(0, 20); // crc32
    cent.writeUInt32LE(content.length, 24);
    cent.writeUInt32LE(content.length, 28);
    cent.writeUInt16LE(name.length, 32);
    cent.writeUInt16LE(0, 34);
    cent.writeUInt16LE(0, 36);
    cent.writeUInt16LE(0, 38);
    cent.writeUInt16LE(0, 40);
    cent.writeUInt32LE(0, 42);
    cent.writeUInt32LE(offset, 42);
    name.copy(cent, 46);

    central.push(cent);
    offset += header.length + name.length + content.length;
  }

  function walkDir(dir, base) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = base ? base + "/" + e.name : e.name;
      if (e.isDirectory()) {
        walkDir(full, rel);
      } else {
        addFile(full, rel);
      }
    }
  }

  walkDir(srcDir, "");

  const centralOffset = offset;
  const centralSize = central.reduce((s, b) => s + b.length, 0);

  const endRecord = Buffer.alloc(22);
  endSig.copy(endRecord, 0);
  endRecord.writeUInt16LE(0, 4);
  endRecord.writeUInt16LE(0, 6);
  endRecord.writeUInt16LE(central.length, 8);
  endRecord.writeUInt16LE(central.length, 10);
  endRecord.writeUInt32LE(centralSize, 12);
  endRecord.writeUInt32LE(centralOffset, 16);
  endRecord.writeUInt16LE(0, 20);

  const all = [...data, ...central, endRecord];
  const totalSize = all.reduce((s, b) => s + b.length, 0);

  const result = Buffer.concat(all, totalSize);
  fs.writeFileSync(outputPath, result);
  console.log(`Zip created: ${totalSize} bytes, ${central.length} files`);
}

const outDir = path.join(__dirname, "..", "out");
const zipPath = path.join(__dirname, "..", "site-correct.zip");
createZip(outDir, zipPath);
