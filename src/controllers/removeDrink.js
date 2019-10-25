const {SQLCONNECT} = require('../sql/SQLConnect');


/*
    POST
    {
        "drink": {Name of Drink to be removed}
    }


*/

module.exports = {
    REMOVEDRINK: async (req, res) => {
        const connection = SQLCONNECT();
        if (req.body.drink) {
            const failed = await new Promise((success, failure) => {
                connection.query(`DELETE FROM drinks WHERE name = "${req.body.drink}}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    }
                    else {
                        return success(null);
                    }
                });
            });
            if (!failed) {
                res.json(`${req.body.drink} has been removed`);
            }
            else {
                res.json("Failed to remove drink from database");
            }
        }
        else {
            res.json("Must specify a drink to delete");
        }
    }
}

