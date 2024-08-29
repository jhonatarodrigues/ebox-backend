import { Controller, Post, Request, Route } from "tsoa";
import express from "express";
import multer from "multer";

import storage from "../services/storageMulter";

@Route("files")
export class FilesController extends Controller {
  @Post("uploadFile")
  public async uploadFile(@Request() request: express.Request): Promise<any> {
    const response = await this.handleFile(request);

    return {
      fileName: response.filename,
    };
  }

  private handleFile(request: express.Request): Promise<any> {
    const multerSingle = multer({
      storage: storage,
    }).single("file");
    return new Promise((resolve, reject) => {
      multerSingle(request, undefined as any, async (error) => {
        if (error) {
          reject(error);
        }
        const file = request.file;
        if (!file) {
          reject(new Error("File not uploaded"));
        }
        resolve(file);
      });
    });
  }
}
