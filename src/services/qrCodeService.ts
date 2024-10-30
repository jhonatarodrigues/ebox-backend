import { QRCode as PrismaQrCode } from "@prisma/client";
import { QRCode } from "../model/qrcode";
import { QRCodeRepository } from "../repository/qrCodeRepository";

export type QRCodeCreationParams = Omit<QRCode, "id">;

export class QRCodeService {
  public async createMany(
    creationParams: QRCodeCreationParams[]
  ): Promise<Boolean> {
    const repository = new QRCodeRepository();

    const response = await repository.create(creationParams);
    return response;
  }

  public async getCode(code: string): Promise<PrismaQrCode | null> {
    const repository = new QRCodeRepository();

    const response = await repository.findByCode(code);
    return response;
  }
}
