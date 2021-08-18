const { hrtime } = require("process");

module.exports = function(req, res) {
    const timestamp = new Date().toLocaleString();
    let logStr = timestamp;
    const startTime = hrtime();
    res.on("finish", function(){
        const duration = hrtime(startTime);
        logStr += `
            Method: ${req.method}
            URL: ${req.url}
            Status: ${res.statusCode} ${res.statusMessage}
            Duration: ${duration[0]}s ${duration[1]/1000000}ms
            `;
        console.log(logStr);
    })
}