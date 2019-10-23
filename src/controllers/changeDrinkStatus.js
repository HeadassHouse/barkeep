const {SQLCONNECT} = require('../sql/SQLConnect');

module.exports = {
    CHANGEDRINKSTATUS: async (req, res) => {
        const connection = SQLCONNECT();
        if (req.query.name && req.query.value) {
            const availability = await new Promise((success, failure) => {
                connection.query(`UPDATE drinks SET available = ${req.query.value} WHERE name = "${req.query.name}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    } 
                    else {
                        return success(null);
                    }
                });
            });
            if (!availability) {
                res.json(`${req.query.name} is now ${(req.query.value == 1) ? "available" : "not available"}`);
            }
            else {
                res.json("Could not update the drink!");
            }
        }
        else {
            res.json("Must specify a name and a value for which it is to become");
        }
    }
}

