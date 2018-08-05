const request=require("request");
const IconV=require("iconv").Iconv;
const {JSDOM}=require("jsdom");
const fs=require("fs");

const {jpWikiExtract,extractOptions}=require("./wikiextract-jp");

var urls=[

];

var equipfilenames=[

];

request.get(
    {
        url:"http://azurlane.wikiru.jp/index.php?%B5%FB%CD%EB%A5%EA%A5%B9%A5%C8",
        encoding:null
    },
    (err,res,body)=>{
        var iconv=new IconV("EUC-JP","utf-8");

        var document=new JSDOM(iconv.convert(body).toString("utf8")).window.document;

        fs.writeFile("torp.json",jpWikiExtract(document.querySelectorAll(".ie5 tbody")[1],extractOptions.torpedo),()=>{});
    }
);