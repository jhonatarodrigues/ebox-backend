import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let file_name_string = String(file.originalname).split(".");
    let ext = file_name_string[file_name_string.length - 1];

    console.log("file_storage", file.originalname.split("."));

    cb(null, file.fieldname + "-" + Date.now() + `.${ext}`); // set the extension to .jpg
  },
});

export default storage;
