const { SQLCONNECT } = require('../sql/SQLConnect');
const { generateUUID } = require('../sql/generateUUID');


/*
    POST
    {
        "name": {Name of Client}
    }


*/

module.exports = {
    ADDGUEST: async (req, res) => {
        const connection = SQLCONNECT();
        
        if (req.body.name) {
            const person = await new Promise((success, failure) => { 
                connection.body(`SELECT * FROM guests WHERE name = "${req.body.name}"`,(error,result)=>{
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
                connection.body(`INSERT INTO guests (id,name,venmo,drinkCount) VALUES ("${generateUUID()}","${req.body.name}","NULL",0)`,(error,result)=>{
                    if(error){
                        throw new Error(error);
                    } 
                    else {
                        return null;
                    }
                });
                res.json(`${req.body.name} created!`);
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