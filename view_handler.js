var fs = require("fs");

module.exports.ejs_assembler = function(path, res, req)
{
    path = check_path(path);
    try 
    {
        if(fs.lstatSync(path).isDirectory())
        {
            serve_page(path, res, req);
        }
        else
        {
            res.download(path, err =>
                {
                    if(err) 
                    {
                      if(res.headersSent) 
                      {
                        console.log(err);
                      } 
                      else 
                      {
                        return serve404(res, req, path) 
                      }
                    }
                  });
              
        }
    } 
    catch (error) 
    {
        serve404(res, req, path);
    }
}

function serve_page(dir, res, req)
{
        dir = check_path(dir);
        fs.readdir(dir, (err, files) => 
        {
            dirs = []
            files.forEach(file => 
            {
                if(fs.lstatSync(dir +"/"+file).isDirectory())
                {
                    dirs.push(file)
                    files.pop(file)
                }
            });
          res.render("files.ejs", {files: files, dir: check_path(req.originalUrl),
                    dirs: dirs});
        });
    
}

function check_path(path)
{
    return path.replace(/(\/?\s*)$/, "/");
}
function serve404(res, req, thing)
{
    res.render("404.ejs", {thing: thing})
}