const multer = require('multer')
const path = require('path')
let uuidv4 = require('uuid/v4')
const DIR = './public/imagesUploads/'
/*const storage = multer.diskStorage({
    destination:'./public/imagesUploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})



const upload = multer({
    storage
}).single('Categoryimage')


const store = (req,res,next) =>{
        upload(req, res, (err) => {
            if(err){
                return res.send(err).status(500)
            }else{
                const newPath = req.file.path.split('public')
                req.imgPath = newPath[1]
                next()
            }
        })
}*/


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage:storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single('categoryImage');

module.exports = upload