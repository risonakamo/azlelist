window.onload=main;

var _initialmarks;
var _markUpdateTimer;

function main()
{
    var dataFiles=["ddgun","clgun","cagun","bbgun",
        "torp","aagun","fighter","dive","bomber"];

    var classNamesJp=["駆逐艦主砲","軽巡主砲","重巡主砲","戦艦主砲",
        "魚雷","対空砲","戦闘機","爆撃機","攻撃機"];

    var allData={};
    var processed=0;

    _initialmarks=JSON.parse(localStorage.getItem("marks"));

    if (!_initialmarks)
    {
        _initialmarks={};
    }

    dataFiles.forEach((x,i)=>{
        dataLoad(`wikidata/${x}.json`,(data)=>{
            processed++;
            allData[x]=data;

            if (processed==dataFiles.length)
            {
                ReactDOM.render(React.createElement(AzleListControl,{allData,dataClassNames:dataFiles,classNamesJp}),
                    document.querySelector(".equipbox-top"));
            }
        });
    });
}

//filename to load
//callback(object data): recieves parsed data
function dataLoad(filename,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",filename);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response));
        }
    };

    r.send();
}

function queueUpdateMarks()
{
    clearInterval(_markUpdateTimer);
    _markUpdateTimer=setTimeout(()=>{
        localStorage.setItem("marks",JSON.stringify(_initialmarks));
    },800);
}