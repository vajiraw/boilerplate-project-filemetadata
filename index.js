var express = require('express');
var cors = require('cors');
require('dotenv').config()


const multer  = require('multer');
const { type } = require('express/lib/response');
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  //console.log(req);
  const upfile = req.file
  if(upfile===undefined){
    return res.json({'Error':'No $ile selected for uploaded'})
  }
  res.json({'name':upfile.originalname,'type': upfile.mimetype,'size':upfile.size} )

});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
