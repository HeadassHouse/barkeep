const {SELECT} = require('../sql/dynamicSQLSelect');

module.exports = {
    DRINKCOUNT: async (req, res) => {
        if (req.body.name) {
            const person = await SELECT("guests", `name = "${req.body.name}"`)
            if (person[0]) {
                res.json(person[0]['drinkCount'])
            }
            else {
                res.json("That person does not exist");
            }
        } 
        else {
            res.json("Need to specify a person!");
        }
    }
}