const { send } = require("../helpers");

module.exports = {
    GET: {
        params: ["id"],
        handler: function (req, res, p) {
            send(req, res, { says: "Quack", method: req.method, parm: p });
        }
    },
    POST: {
        handler: function (req, res) {
            send(req, res, { says: "Quack", method: req.method });
        }
    }
}