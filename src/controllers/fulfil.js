const {SQLCONNECT} = require('../sql/SQLConnect');


/*
    POST
    {
        "user": {Name of Client}
        "drink": {Name of Drink}
    }


*/

module.exports = {
    FULFIL: async (req, res) => {
        const connection = SQLCONNECT();
        if (req.body.user && req.body.drink) {
            const failed = await new Promise((success, failure) => {
                connection.query(`UPDATE drinks SET available = ${req.body.value} WHERE name = "${req.body.name}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    } 
                    else {
                        return success(null);
                    }
                });
            });
            if (!failed) {
                res.json(`${req.body.user}'s order has been marked as fulfilled`);
            }
            else {
                res.json("Order has failed to be marked as fulfilled");
            }
        }
        else {
            res.json("Must specify a name and a drink to fulfill an order");
        }
    }
}

