class Main {

    getMain(req, res){
        try{
            res.render('index')
        }catch(error){
            console.log(error)
            res.status(500)
            return res.render('serverError')
        }
    }

}

export default new Main()