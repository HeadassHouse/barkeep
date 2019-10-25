const {SQLCONNECT} = require('../sql/SQLConnect');


/*
    POST
    {
        "id":{The id of the order to complete}
    }
*/

module.exports = {
    FULFILL: async (req, res) => {
        const connection = SQLCONNECT();
        if (req.body.name && req.body.drink) {
            const failed = await new Promise((success, failure) => {
                connection.query(`UPDATE orders SET fulfilled = TRUE WHERE id = "${req.body.id}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    } 
                    else {
                        return success(null);
                    }
                });
            });
            if (!failed) {
                res.json(`order ${req.body.id} has been marked as fulfilled`);
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

