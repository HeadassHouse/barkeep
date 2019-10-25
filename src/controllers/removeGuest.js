const {SQLCONNECT} = require('../sql/SQLConnect');


/*
    POST
    {
        "name": {Name of Client}
    }


*/

module.exports = {
    REMOVEGUEST: async (req, res) => {
        const connection = SQLCONNECT();
        if (req.body.name) {
            const failed = await new Promise((success, failure) => {
                connection.query(`DELETE FROM guests WHERE name = "${req.body.name}"`,(error,result)=>{
                    if (error){
                        return failure(new Error(error));
                    }
                    else {
                        return success(null);
                    }
                });
            });
            if (!failed) {
                res.json(`${req.body.name} has been removed`);
            }
            else {
                res.json("Failed to remove user from database");
            }
        }
        else {
            res.json("Must specify a name to delete");
        }
    }
}

