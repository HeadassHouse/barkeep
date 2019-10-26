const {SQLCONNECT} = require('../sql/SQLConnect');


/*
    POST
    {
        "id": {The id of the drink to remove},
        "drink": {The name of the drink},
        "name": {The name of the person}
    }


*/

module.exports = {
    CANCELORDER: async (req, res) => {
        const connection = SQLCONNECT();
        if (req.body.id && req.body.drink && req.body.name) {
            const deleteDrink = await new Promise((success, failure) => {
                connection.query(`DELETE FROM orders WHERE id = "${req.body.id}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    }
                    else {
                        return success(null);
                    }
                });
            });
            const drinkDecrement = await new Promise((success, failure) => {
                connection.query(`UPDATE drinks SET numOrdered = numOrdered - 1 WHERE name = "${req.body.drink}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    }
                    else {
                        return success(null);
                    }
                });
            });
            const guestDecrement = await new Promise((success, failure) => {
                connection.query(`UPDATE guests SET drinkCount = drinkCount - 1 WHERE name = "${req.body.name}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    }
                    else {
                        return success(null);
                    }
                });
            });
            if (!deleteDrink && !drinkDecrement && !guestDecrement) {
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

