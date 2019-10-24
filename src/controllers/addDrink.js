const { SQLCONNECT } = require('../sql/SQLConnect');
const { generateUUID } = require('../sql/generateUUID');



/*
    POST
    {
        "name": {Name of Drink}
        "description": {Description of drink}
    }


*/

module.exports = {
    ADDDRINK: async (req, res) => {
        const connection = SQLCONNECT();
        
        if (req.body.name && req.body.description) {
            const person = await new Promise((success, failure) => { 
                connection.body(`SELECT * FROM drinks WHERE name = "${req.body.name}"`,(error,result)=>{
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
                connection.body(`INSERT INTO drinks (id,name,description,available) VALUES ("${generateUUID()}","${req.body.name}","${req.body.description}",TRUE)`,(error,result)=>{
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
                res.json("That drink already exists!");
            }
        }
        else {
            res.json("Must specify a name and description to add!");
        }
        
    }
}