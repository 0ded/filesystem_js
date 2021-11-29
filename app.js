var express = require("express");
var vh = require("./view_handler");
var app = express();
var port = 420
var share_folder = "./share/"

app.listen(port, function()
{
    console.log("serving on port 420");
}
);

app.get("/", async (req, res) =>
{
    const dir = share_folder;
    vh.ejs_assembler(dir, res, req);
    
}
);

app.get("*/*", (req, res) =>
{
    const dir = share_folder + req.originalUrl;
    vh.ejs_assembler(dir, res, req);
    
}
);

