window.onload=main;

function main()
{
    dataLoad("wikidata/bbgun.json",(data)=>{
        ReactDOM.render(React.createElement(EquipBoxControl,{data,equipType:"bb-gun"}),document.querySelector(".equip-boxes"));
    });
}

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