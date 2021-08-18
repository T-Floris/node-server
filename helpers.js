const fs = require("fs");
const mimetypes = require("./mimetypes");
const path = require("path");

exports.send = function(req, res, msg, status = 200) {
    res.statusCode = status;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(msg));
}

exports.sendFile = function(req, res, filepath) {
    const ext = path.extname(filepath);
    const mime = mimetypes[ext];
    fs.readFile(filepath, function(err, content){
        if(err) {
            exports.send(req, res, err, 404);
            return;
        }
        res.statusCode = 200;
        res.setHeader("Content-type", mime);
        res.end(content);
    })
}

exports.streamFile = function(req, res, filepath) {
        const ext = path.extname(filepath);
        const mime = mimetypes[ext];
        const stream = fs.createReadStream(filepath);
        stream.on("error", function(err){
            console.log(err);
            exports.send(req, res, err, 404);
        });
        res.statusCode = 200;
        res.setHeader("Content-type", mime);
        stream.pipe(res);
}