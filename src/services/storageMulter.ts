import multer from "multer";
import express from "express";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let file_name_string = String(file.originalname).split(".");
    let ext = file_name_string[file_name_string.length - 1];

    cb(null, file.fieldname + "-" + Date.now() + `.${ext}`); // set the extension to .jpg
  },
});

const receiveFile = (request: express.Request): Promise<any> => {
  const multerSingle = multer({
    storage: storage,
  }).single("file");
  return new Promise((resolve, reject) => {
    multerSingle(request, undefined as any, async (error) => {
      console.log("error", error);
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
};

export { receiveFile };
