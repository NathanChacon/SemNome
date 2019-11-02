const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:'./public/imagesUploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
}).single('myImage')


const store = (req,res,next) =>{
        upload(req, res, (err) => {
            if(err){
                return res.send(err).status(500)
            }else{
                console.log(req.file)
                const newPath = req.file.path.split('public')
                req.imgPath = newPath[1]
                next()
            }
        })
}

module.exports =  store