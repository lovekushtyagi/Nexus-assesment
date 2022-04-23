const multer = require("multer");
const path = require('path');

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, './upload')
  },
  filename: function(req, file, callback) {
      //callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
              //callback(null, file.originalname)
      req.body.location=Date.now() + path.extname(file.originalname);

      callback(null, file.fieldname + '-' + req.body.location);
  }
})
var upload = multer({
      storage: storage});

module.exports = upload;

