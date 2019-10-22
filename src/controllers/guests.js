const {SQLCONNECT} = require('../sql/SQLConnect');

module.exports = {
    GUESTS: function(){
        const connection = SQLCONNECT();
        return new Promise((success, failure) => {
            connection.query(`SELECT * FROM guests`, 
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
        })
    }
}