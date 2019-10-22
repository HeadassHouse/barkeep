const {SQLCONNECT} = require('../sql/SQLConnect');

module.exports = {
    Order: function(req,res){
        const connection = SQLCONNECT();
        if (req.query.drink && req.query.user){
            const available = connection.query(`SELECT VALUE available FROM drinks WHERE name = ${req.query.drink} `,(error,result)=>{
                if (!error){
                    return result[0]["available"];
                }
                else{
                    return error;
                }
            })
            if (available){
                connection.query(`UPDATE guests SET drinkCount = drinkCount + 1 WHERE name = ${req.query.user}`,(error,result)=>{
                    if (error){
                        throw new Error(error);
                    }
                })

                connection.query(`INSERT INTO orders (user,drink) VALUES ("${req.query.user}","${req.query.drink}")`,(error,result)=>{
                    if(error){
                        throw new Error(error);
                    }
                })
            }
        }
        else if(!req.query.drink){
            res.json({
                status_code: 409,
                message: "You didn't provide a drink you mongoloid",
            });
        }
        else if(!req.query.user){
            res.json({
                status_code: 409,
                message: "You didn't provide a user you mongoloid",
            });
        }
        else{
            res.json({
                status_code: 409,
                message: "You didn't provide anything you mongoloid",
            });
        }
    }
}