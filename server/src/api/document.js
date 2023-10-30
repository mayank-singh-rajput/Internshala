const DocumentService = require("../services/document");

var multer = require("multer");
var storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname);
  }
})
const upload = multer({ storage: storage });

module.exports = (app) => {
  const service = new DocumentService();

  app.post('/file', upload.single('file'), async (req, res, next) => {
    try {
      const { title, content, value1, value2, value3, value4, value5 } = req.body;
      if(!title || !content){
        return res.json({error:"Please fill all fields"});
      }
      const File = req.file;
      if(!File){
        return res.json({message:"No file uploaded"});
      }
      const { data } = await service.CreateFile({ title, content, value1, value2, value3, value4, value5, File });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/file', async (req, res, next) => {
    try {
      const { value1, value2, value3, value4, value5 } = req.query;
      const { data } = await service.FindFile({ value1, value2, value3, value4, value5 });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  })
};