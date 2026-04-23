const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const pdfPath = path.join(__dirname, "..", "public", "2026 Anny_Lin Resume.pdf");

async function main() {
  const existingBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingBytes);
  pdfDoc.setTitle("2026 Anny Lin Resume", { showInWindowTitleBar: true });
  const savedBytes = await pdfDoc.save();
  fs.writeFileSync(pdfPath, savedBytes);
  console.log("Updated PDF title to '2026 Anny Lin Resume'");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
