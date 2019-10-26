const {SQLCONNECT} = require('../sql/SQLConnect');

/*
    POST
    {
        "name": {Name of Client}
        "value": {Amount of drinks to add}
    }


*/


module.exports = {
    CHANGEDRINKCOUNT: async (req, res) => {
        const connection = SQLCONNECT();
        if (req.body.name && req.body.value) {
            const failure = await new Promise((success, failure) => {
                connection.query(`UPDATE guests SET drinkCount = ${req.body.value} + drinkCount WHERE name = "${req.body.name}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    } 
                    else {
                        return success(null);
                    }
                });
            });
            if (!failure) {
                res.json(`${req.body.name}'s drinks ${(req.body.value > 0) ? "increased" : "decreased"}`);
            }
            else {
                res.json("Could not update this client's drink count!");
            }
        }
        else {
            res.json("Must specify a name and the value to change the drink count");
        }
    }
}

