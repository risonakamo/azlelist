//usable on torpedoes,sub torpedoes
var torpedoOptions={
    cols:{
        0:"img",
        1:"name",
        3:"rarity",
        4:"dmg",
        5:"dmg10",
        6:"reload",
        7:"reload10",
        9:"angle",
        13:"mag"
    },

    modifiers:{
        0:(element)=>{
            return element.firstChild.src;
        },

        3:(element)=>{
            return element.innerText.slice(1);
        },

        6:(element)=>{
            return parseFloat(element.innerText);
        },

        7:(element)=>{
            return parseFloat(element.innerText);
        },

        13:(element)=>{
            if (element.innerText=="通常弾")
            {
                return 0;
            }

            return 1;
        }
    },

    calculations:(data)=>{
        standardDataCalc(data);
    }
};

var gunOptions={
    cols:{
        0:"img",
        1:"name",
        3:"rarity",
        4:"dmg",
        5:"dmg10",
        6:"reload",
        7:"reload10",
        14:"type"
    },

    modifiers:{
        0:(element)=>{
            return element.firstChild.src;
        },

        3:(element)=>{
            return element.innerText.slice(1);
        },

        6:(element)=>{
            return parseFloat(element.innerText);
        },

        7:(element)=>{
            return parseFloat(element.innerText);
        },

        14:(element)=>{
            var type=element.innerText;
            switch (type)
            {
                case "通常弾":
                return 0;

                case "徹甲弾":
                return 1;

                case "榴弾":
                return 2;

                case "三式弾":
                return 3;

                default:
                return 4;
            }
        }
    },

    calculations:standardDataCalc
};

/*
    table: the element tbody to target. should have only the rows as the children
    extractOptions: object with details on how to extract rows.
        cols: should be an object with keys as indices of cols to target. the data
            should be the label to assign the targetted data.
        modifiers: specify they key as an index previously present in the cols object.
            for each key specify a function taking in an element that returns what
            the data for the entry should be.
        calculations: function taking in the data object after text extraction. use it
            to preform computations and modifications
*/
function jpWikiExtract(table,extractOptions)
{
    var tableRows=table.children;

    var res=[];
    var currentRowChildren;
    var currentRowData;
    for (var x=0,l=tableRows.length;x<l;x++)
    {
        currentRowChildren=tableRows[x].children;
        currentRowData={};

        for (var y in extractOptions.cols)
        {
            if (extractOptions.modifiers[y])
            {
                currentRowData[extractOptions.cols[y]]=extractOptions.modifiers[y](currentRowChildren[y]);
            }

            else
            {
                currentRowData[extractOptions.cols[y]]=currentRowChildren[y].innerText;
            }
        }

        extractOptions.calculations(currentRowData);
        res.push(currentRowData);
    }

    // return res;
    return JSON.stringify(res);
}

//does common calc operations.
//requires: dmg as NumberxNumber string,reload,dmg10 and reload10
//splits dmg into dmg and shot
//calcs burst and dps
//seperates upgraded data into upgraded object
function standardDataCalc(data)
{
    //split and calculate dmg/shots
    var dmgSplit=data.dmg.split("x");
    data.dmg=parseInt(dmgSplit[0]);
    data.shot=parseInt(dmgSplit[1]);

    //calculate burst and dps
    data.burst=data.dmg*data.shot;
    data.dps=Number((data.burst/data.reload).toFixed(2));

    //seperate and calculate upgraded stats
    data.upgraded={
        dmg:parseInt(data.dmg10.split("x")[0]),
        reload:data.reload10
    };

    data.upgraded.burst=data.upgraded.dmg*data.shot;
    data.upgraded.dps=Number((data.upgraded.burst/data.upgraded.reload).toFixed(2));

    //clean up
    delete data.dmg10;
    delete data.reload10;
}