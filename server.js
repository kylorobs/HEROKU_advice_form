var express = require('express');
var bodyParser = require('body-parser');
var allRoutes = require('./routes/routes');
var app = express();
var cors = require('cors');
var multer  = require('multer');
var PORT = require('./utils/stringVals').PORT;

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

app.use(bodyParser.json()); // for parsing application/json
app.use(multer({ storage: imageStorage }).single('file_upload'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use(allRoutes);

app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});

