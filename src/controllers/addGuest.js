const { SQLCONNECT } = require('../sql/SQLConnect');
const { generateUUID } = require('../generateUUID');

module.exports = {
    ADDGUEST: async (req, res) => {
        const connection = SQLCONNECT();
        
        if (req.query.user && req.query.venmo) {
            const person = await new Promise((success, failure) => { 
                connection.query(`SELECT * FROM guests WHERE name = "${req.query.user}"`,(error,result)=>{
                    if (error){
                        return failure(null);                    
                    }
                    else{
                        return success(result.map(value => {
                            var data = {};
                            for(key in value) data[key] = value[key];
                            return data;
                        })[0])
                    }
                })
            });

            if (!person) {
                connection.query(`INSERT INTO guests (id,name,venmo,drinkCount) VALUES ("${generateUUID()}","${req.query.user}","${req.query.venmo}",0)`,(error,result)=>{
                    if(error){
                        throw new Error(error);
                    } 
                    else {
                        return null;
                    }
                });
                res.json(`${req.query.user} created!`);
            }
            else {
                res.json("That person already exists!");
            }
        }
        else {
            res.json("Must specify a person and venmo to add!");
        }
        
    }
}