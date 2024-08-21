import { Exception } from "tsoa";

export type BusinessErrorInfo = {
  status: number;
  message?: string;
};
export default class BusinessError extends Error implements Exception {
  info: BusinessErrorInfo;
  status: number;

  constructor(message: string, info: BusinessErrorInfo) {
    super(message);
    this.name = "BusinessError";
    this.info = info;
    this.status = info.status || 500;
  }
}
