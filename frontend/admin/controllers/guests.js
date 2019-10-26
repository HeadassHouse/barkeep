const {SELECT} = require('../sql/dynamicSQLSelect');

module.exports = {
    GUESTS: async (req, res) => res.json(await SELECT("guests", null))
}