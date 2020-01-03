const fs = require('fs')

function deleteImage(path){
    fs.unlink(`public${path}`, () => {
        console.log('Imagem Deletada')
    })
}

module.exports = deleteImage