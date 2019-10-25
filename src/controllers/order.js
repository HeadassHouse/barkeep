const {SQLCONNECT} = require('../sql/SQLConnect');
const { generateUUID } = require('../sql/generateUUID');

/*
    POST
    {
        "name": {Client who ordered}
        "drink": {Drink they ordered}
    }


*/


module.exports = {
    ORDER: async (req,res) => {
        const connection = SQLCONNECT();
        if (req.body.drink && req.body.name){
            const available = await new Promise((success, failure) => { 
                    connection.query(`SELECT available FROM drinks WHERE name = "${req.body.drink}"`,(error,result)=>{
                    if (error){
                        return failure(null);                    
                    }
                    else{
                        return success(result.map(value => {
                            var data = {};
                            for(key in value) data[key] = value[key];
                            return data;
                        })[0]["available"])
                    }
                })
            });
            
            if (available == 1){
                //Incremement drink count
                connection.query(`UPDATE guests SET drinkCount = drinkCount + 1 WHERE name = "${req.body.name}"`,(error,result)=>{
                    if (error){
                        throw new Error(error);
                    } 
                    else {
                        return null;
                    }
                })
                //Insert order data
                connection.query(`INSERT INTO orders (id,name,drink) VALUES ("${generateUUID()}","${req.body.name}","${req.body.drink}","FALSE",CURRENT_TIMESTAMP)`,(error,result)=>{
                    if(error){
                        throw new Error(error);
                    } 
                    else {
                        return null;
                    }
                })
                res.json("Success!");
            }
            else {
                res.json("Drink not available");
            }
        }
        else if(!req.body.drink){
            res.json({
                status_code: 409,
                message: "You didn't provide a drink you mongoloid",
            });
        }
        else if(!req.body.name){
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