const request=require("request");
const {JSDOM}=require("jsdom");

request("https://risonakamo.github.io/mashiron/",(err,res,body)=>{
    var dom=new JSDOM(body);
    console.log(dom.window.document.querySelector("#mashiron").innerHTML);
});