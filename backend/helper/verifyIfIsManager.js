function verifyIfIsManager(req,res,next){
        console.log('fui chamado')
    if(!req.user){
        return res.status(400).send()
    }

    if(req.user.role !== 'manager'){
        return res.status(400).send()
    }

    next()
}

module.exports = verifyIfIsManager