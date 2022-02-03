import { Request, Response } from "express";
import fs from "fs";
import * as service from "@/services/client/certificate";

async function getCertificate(req: Request, res: Response) {
  service.createCertificate();
  res.contentType("applicaton/pdf");
  res.attachment("certificate.pdf");
  fs.createReadStream("./output.pdf").pipe(res);
}

export { getCertificate };
