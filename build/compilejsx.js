const babel=require("babel-core");
const fs=require("fs");

var files=[
    "../equipbox/equipbox.jsx",
    "../azlelist-system/azlelistsystem.jsx",
    "../azlelist-system/equipclassmenu.jsx",
    "../azlelist-system/sortmenu.jsx"
];

files.forEach((x)=>{
    babel.transformFile(x,{presets:["react","minify"]},(err,res)=>{
        if (err)
        {
            console.log(err);
            return;
        }

        fs.writeFile(x.slice(0,-1),res.code,()=>{});
    });
});