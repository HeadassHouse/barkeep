const {SELECT} = require('../sql/dynamicSQLSelect');

module.exports = {
    DRINKS: async (req, res) => res.json(await SELECT("drinks", "available = TRUE"))
}