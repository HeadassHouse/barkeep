const {SQLCONNECT} = require('../sql/SQLConnect');

module.exports = {
    DRINKS: async function(req,res){
        const connection = SQLCONNECT();
        res.json( await new Promise((success, failure) => {
            connection.query(`SELECT * FROM drinks WHERE available = TRUE`, 
            (error, result)=>{
                if (error){
                    return failure(error);
                }
                return success(result.map(value => {
                    var data = {};
                    for(key in value){
                        data[key] = value[key];
                    }
                    return data;
                }));
            })
            connection.end();
        }));
    }
}