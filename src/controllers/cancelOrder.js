const {SQLCONNECT} = require('../sql/SQLConnect');


/*
    POST
    {
        "name": {Name of owner of the drink}
        "drink": {Name of drink of that owner}
    }


*/

module.exports = {
    CANCELORDER: async (req, res) => {
        const connection = SQLCONNECT();
        if (req.body.drink && req.body.name) {
            const deleteDrink = await new Promise((success, failure) => {
                connection.query(`DELETE FROM orders WHERE name = "${req.body.name}" AND drink = "${req.body.drink}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    }
                    else {
                        return success(null);
                    }
                });
            });
            const decrement = await new Promise((success, failure) => {
                connection.query(`UPDATE drinks SET numOrdered = numOrdered - 1 WHERE name = "${req.body.drink}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    }
                    else {
                        return success(null);
                    }
                });
            });
            if (!deleteDrink && !decrement) {
                res.json(`${req.body.name}'s ${req.body.drink} order has been removed`);
            }
            else {
                res.json("Failed to remove order from database");
            }
        }
        else {
            res.json("Must specify a name and drink");
        }
    }
}

