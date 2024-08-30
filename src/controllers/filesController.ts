import { Controller, Post, Request, Route } from "tsoa";
import express from "express";
import multer from "multer";
import { receiveFile } from "../services/storageMulter";

@Route("files")
export class FilesController extends Controller {
  @Post("uploadFile")
  public async uploadFile(@Request() request: express.Request): Promise<any> {
    const response = await receiveFile(request);

    return {
      fileName: response.filename,
    };
  }
}
