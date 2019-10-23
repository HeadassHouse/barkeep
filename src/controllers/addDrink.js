const { SQLCONNECT } = require('../sql/SQLConnect');
const { generateUUID } = require('../generateUUID');

module.exports = {
    ADDDRINK: async (req, res) => {
        const connection = SQLCONNECT();
        
        if (req.query.name && req.query.description) {
            const person = await new Promise((success, failure) => { 
                connection.query(`SELECT * FROM drinks WHERE name = "${req.query.name}"`,(error,result)=>{
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
                connection.query(`INSERT INTO drinks (id,name,description,available) VALUES ("${generateUUID()}","${req.query.name}","${req.query.description}",TRUE)`,(error,result)=>{
                    if(error){
                        throw new Error(error);
                    } 
                    else {
                        return null;
                    }
                });
                res.json(`${req.query.name} created!`);
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