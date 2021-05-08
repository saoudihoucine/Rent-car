// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: './app/imgs',
//     filename: (req, file, cb) => {
//         cb(null, `${req.MATRICULE}.${(file.mimetype).substring(6)}`);
//     },
// });


// var upload = multer({
//     storage: storage
// })


// module.exports = upload;


const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"./app/imgs");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-----${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;