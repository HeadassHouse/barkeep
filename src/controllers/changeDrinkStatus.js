const {SQLCONNECT} = require('../sql/SQLConnect');


/*
    POST
    {
        "name": {Name of Drink}
        "value": {Drinks status (empty/full)}
    }


*/

module.exports = {
    CHANGEDRINKSTATUS: async (req, res) => {
        const connection = SQLCONNECT();
        if (req.body.name && req.body.value != null) {
            const availability = await new Promise((success, failure) => {
                connection.query(`UPDATE drinks SET available = ${req.body.value} WHERE name = "${req.body.name}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    } 
                    else {
                        return success(null);
                    }
                });
            });
            if (!availability) {
                res.json(`${req.body.name} is now ${(req.body.value == 1) ? "available" : "not available"}`);
            }
            else {
                res.json("Could not update the drink!");
            }
        }
        else {
            res.json("Must specify a name and a value for which it is to become");
        }
    }
}

