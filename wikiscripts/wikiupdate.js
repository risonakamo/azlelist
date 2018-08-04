const request=require("request");
const IconV=require("iconv").Iconv;
const {JSDOM}=require("jsdom");

const {jpWikiExtract,extractOptions}=require("./wikiextract-jp");

request.get(
    {
        url:"http://azurlane.wikiru.jp/index.php?%B4%CF%CB%A4%A5%EA%A5%B9%A5%C8%2F%B6%EE%C3%E0%B4%CF%BC%E7%CB%A4",
        encoding:null
    },
    (err,res,body)=>{
        var iconv=new IconV("EUC-JP","utf-8");

        var document=new JSDOM(iconv.convert(body).toString("utf8")).window.document;

        // console.log(document.querySelectorAll(".ie5 tbody")[1].innerText);
        console.log(jpWikiExtract(document.querySelectorAll(".ie5 tbody")[1],extractOptions.torpedo));
    }
);