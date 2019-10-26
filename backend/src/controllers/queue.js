const {SELECT} = require('../sql/dynamicSQLSelect');

module.exports = {
    QUEUE: async (req, res) => res.json(await SELECT("orders", "fulfilled = FALSE ORDER BY orderDate"))
}
