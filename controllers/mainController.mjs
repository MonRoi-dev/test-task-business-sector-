class Main {

    getMain(req, res){
        try{
            res.render('index')
        }catch(error){
            console.log(error)
        }
    }

}

export default new Main()