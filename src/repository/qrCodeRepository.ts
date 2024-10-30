import { QRCodeCreationParams } from "../services/qrCodeService";
import { prisma } from "./prismaRepository";
import { QRCode as PrismaQrCode } from "@prisma/client";

export class QRCodeRepository {
  public async create(
    creationParams: QRCodeCreationParams[]
  ): Promise<Boolean> {
    try {
      const result = await prisma.qRCode
        .createMany({
          data: creationParams as any,
        })
        .then((response) => response);

      return result.count > 0;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  public async findByCode(code: string): Promise<PrismaQrCode | null> {
    const result = await prisma.qRCode.findFirst({
      where: {
        code: code,
      },
      include: {
        product: true,
      },
    });

    return result;
  }
}
