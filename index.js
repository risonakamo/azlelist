window.onload=main;

function main()
{
    var dataFiles=["ddgun","clgun","cagun","bbgun",
        "torp","aagun","fighter","dive","bomber"];

    var allData={};
    var processed=0;

    dataFiles.forEach((x,i)=>{
        dataLoad(`wikidata/${x}.json`,(data)=>{
            processed++;
            allData[x]=data;

            if (processed==dataFiles.length)
            {
                ReactDOM.render(React.createElement(AzleListControl,{allData,dataClassNames:dataFiles}),document.querySelector(".equipbox-top"))
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