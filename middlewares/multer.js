const multer = require('multer');

// تحديد مكان واسم الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // المسار الذي سيتم حفظ الصور فيه
},
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // تسمية الملفات
  },
});

const upload = multer({ storage });

module.exports=upload