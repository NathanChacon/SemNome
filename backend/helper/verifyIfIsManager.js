function verifyIfIsManager(req,res,next){
    if(!req.user){
        return res.status(400).send()
    }

    if(req.user.role !== 'manager'){
        return res.status(400).send()
    }

    next()
}

module.exports = verifyIfIsManager