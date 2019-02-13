const request=require("request");
const iconv=require("iconv-lite");
const {JSDOM}=require("jsdom");
const fs=require("fs");

const {jpWikiExtract,extractOptions}=require("./wikiextract-jp");

var defaultSelector=".ie5 tbody";
var defaultIndex=1;

var updateSources=[
    {
        url:"http://azurlane.wikiru.jp/index.php?%C2%D0%B6%F5%CB%A4%A5%EA%A5%B9%A5%C8",
        filename:"aagun.json",
        selector:defaultSelector,
        selectorIndex:defaultIndex,
        options:extractOptions.aa
    },
    {
        url:"http://azurlane.wikiru.jp/index.php?%B4%CF%CB%A4%A5%EA%A5%B9%A5%C8%2F%C0%EF%B4%CF%BC%E7%CB%A4",
        filename:"bbgun.json",
        selector:defaultSelector,
        selectorIndex:defaultIndex,
        options:extractOptions.gun
    },
    {
        url:"http://azurlane.wikiru.jp/index.php?%B9%B6%B7%E2%B5%A1%A5%EA%A5%B9%A5%C8",
        filename:"bomber.json",
        selector:defaultSelector,
        selectorIndex:defaultIndex,
        options:extractOptions.plane
    },
    {
        url:"http://azurlane.wikiru.jp/index.php?%B4%CF%CB%A4%A5%EA%A5%B9%A5%C8%2F%BD%C5%BD%E4%BC%E7%CB%A4",
        filename:"cagun.json",
        selector:defaultSelector,
        selectorIndex:defaultIndex,
        options:extractOptions.gun
    },
    {
        url:"http://azurlane.wikiru.jp/index.php?%B4%CF%CB%A4%A5%EA%A5%B9%A5%C8%2F%B7%DA%BD%E4%BC%E7%CB%A4",
        filename:"clgun.json",
        selector:defaultSelector,
        selectorIndex:defaultIndex,
        options:extractOptions.gun
    },
    {
        url:"http://azurlane.wikiru.jp/index.php?%B4%CF%CB%A4%A5%EA%A5%B9%A5%C8%2F%B6%EE%C3%E0%B4%CF%BC%E7%CB%A4",
        filename:"ddgun.json",
        selector:defaultSelector,
        selectorIndex:defaultIndex,
        options:extractOptions.gun
    },
    {
        url:"http://azurlane.wikiru.jp/index.php?%C7%FA%B7%E2%B5%A1%A5%EA%A5%B9%A5%C8",
        filename:"dive.json",
        selector:defaultSelector,
        selectorIndex:defaultIndex,
        options:extractOptions.plane
    },
    {
        url:"http://azurlane.wikiru.jp/index.php?%C0%EF%C6%AE%B5%A1%A5%EA%A5%B9%A5%C8",
        filename:"fighter.json",
        selector:defaultSelector,
        selectorIndex:defaultIndex,
        options:extractOptions.plane
    },
    {
        url:"http://azurlane.wikiru.jp/index.php?%B5%FB%CD%EB%A5%EA%A5%B9%A5%C8",
        filename:"torp.json",
        selector:defaultSelector,
        selectorIndex:defaultIndex,
        options:extractOptions.torpedo
    },
    {
        url:"http://azurlane.wikiru.jp/index.php?%B5%FB%CD%EB%A5%EA%A5%B9%A5%C8",
        filename:"subtorp.json",
        selector:defaultSelector,
        selectorIndex:2,
        options:extractOptions.torpedo
    }
];

function callbackloopUpdateSources(index)
{
    if (index==updateSources.length)
    {
        return;
    }

    var x=updateSources[index];

    request.get(
        {
            url:x.url,
            encoding:null
        },
        (err,res,body)=>{
            console.log(x.filename);
            var document=new JSDOM(iconv.decode(Buffer.from(body),"EUC-JP").toString("utf8")).window.document;

            fs.writeFile(x.filename,jpWikiExtract(document.querySelectorAll(x.selector)[x.selectorIndex],x.options),()=>{});

            callbackloopUpdateSources(index+1);
        }
    );
}

callbackloopUpdateSources(0);