const request=require("request");
const {JSDOM}=require("jsdom");

const {jpWikiExtract,extractOptions}=require("./wikiextract-jp");

request.get(
    {
        url:"http://azurlane.wikiru.jp/index.php?%B4%CF%CB%A4%A5%EA%A5%B9%A5%C8%2F%B6%EE%C3%E0%B4%CF%BC%E7%CB%A4"
    },
    (err,res,body)=>{
        console.log(body);
    }
);