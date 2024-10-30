import { Body, Controller, Get, Path, Post, Route } from "tsoa";
import { QRCode as QRCodePrisma } from "@prisma/client";

import { QRCodeCreationParams, QRCodeService } from "../services/qrCodeService";

@Route("qrcode")
export class QRCodeController extends Controller {
  @Post("/generate")
  public async createListCode(
    @Body() requestBody: { product_id: number; quantity_code: number }
  ): Promise<QRCodeCreationParams[] | null> {
    console.log("requestBody", requestBody);

    const codes: QRCodeCreationParams[] = [];

    for (let i = 0; i < requestBody.quantity_code; i++) {
      const code = btoa(
        new Date().getTime().toString() +
          i +
          requestBody.product_id +
          requestBody.quantity_code
      );

      codes.push({
        code: code,
        product_id: requestBody.product_id,
        views: 0,
      });
    }

    const response = await new QRCodeService().createMany(codes);

    return response ? codes : null;
  }

  @Get("/:code")
  public async getCode(@Path() code: string): Promise<QRCodePrisma | null> {
    const response = await new QRCodeService().getCode(code);

    return response;
  }
}
