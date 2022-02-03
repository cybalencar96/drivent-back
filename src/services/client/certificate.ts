import PDFDocument from "pdfkit";
import fs from "fs";

function createCertificate() {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  doc.pipe(fs.createWriteStream("output.pdf"));
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

  const distanceMargin = 18;

  const maxImageWidth = 150;
  const maxImageHeight = 150;

  doc
    .fillAndStroke("#0e8cc3")
    .lineWidth(20)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2
    )
    .stroke();

  doc.image(
    "./src/assets/driven.jpg",
    (doc.page.width - maxImageWidth) / 2,
    40,
    {
      fit: [maxImageWidth, maxImageHeight],
      align: "center",
    }
  );

  jumpLine(doc, 6);

  doc.fontSize(15).fill("#021c27").text("Drivent", { align: "center" });

  jumpLine(doc, 3);

  doc
    .fontSize(30)
    .fill("black")
    .text("Certificado de conclusão", { align: "center" });

  jumpLine(doc, 5);

  doc
    .fontSize(15)
    .fill("black")
    .text(
      "Certificamos que João ABCD concluiu o drivent, com uma carga horária de 300h na modalidade Presencial",
      { align: "center" }
    );

  doc.end();
}

function jumpLine(doc: PDFKit.PDFDocument, lines: number) {
  for (let i = 0; i < lines; i++) {
    doc.moveDown();
  }
}

export { createCertificate };
