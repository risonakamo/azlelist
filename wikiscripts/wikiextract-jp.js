//needed for node which doesnt get the root url in scrape?
var urlrootmod="http://azurlane.wikiru.jp/";

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
        0:defaultImgModifier,

        3:(element)=>{
            return parseInt(element.textContent.slice(1));
        },

        6:(element)=>{
            return parseFloat(element.textContent);
        },

        7:(element)=>{
            return parseFloat(element.textContent);
        },

        13:(element)=>{
            if (element.textContent=="通常弾")
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
        0:defaultImgModifier,

        3:(element)=>{
            return parseInt(element.textContent.slice(1));
        },

        6:(element)=>{
            return parseFloat(element.textContent);
        },

        7:(element)=>{
            return parseFloat(element.textContent);
        },

        14:(element)=>{
            var type=element.textContent;
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

var aaOptions={
    cols:{
        0:"img",
        1:"name",
        3:"rarity",
        4:"dmg",
        5:"dmg10",
        6:"reload",
        7:"reload10"
    },

    modifiers:{
        0:defaultImgModifier,

        3:(element)=>{
            return parseInt(element.textContent.slice(1));
        },

        6:(element)=>{
            return parseFloat(element.textContent);
        },

        7:(element)=>{
            return parseFloat(element.textContent);
        }
    },

    calculations:noBurstDataCalc
};

var planeOptions={
    cols:{
        0:"img",
        1:"name",
        3:"rarity",
        4:"dmg",
        5:"dmg10",
        6:"reload",
        7:"reload10",
        10:"weapon1",
        11:"weapon2"
    },

    modifiers:{
        0:defaultImgModifier,

        3:(element)=>{
            return parseInt(element.textContent.slice(1));
        },

        6:(element)=>{
            return parseFloat(element.textContent);
        },

        7:(element)=>{
            return parseFloat(element.textContent);
        }
    },

    calculations:(data)=>{
        if (data.dmg.split("x").length>1)
        {
            standardDataCalc(data);
        }

        else
        {
            noBurstDataCalc(data);
        }

        data.weapons=[];

        if (data.weapon1!="-")
        {
            data.weapon1=data.weapon1.split("\n");
            for (var x=0;x<data.weapon1.length;x++)
            {
                data.weapons.push(data.weapon1[x]);
            }
        }

        if (data.weapon2!="-")
        {
            data.weapon2=data.weapon2.split("\n");
            for (var x=0;x<data.weapon2.length;x++)
            {
                data.weapons.push(data.weapon2[x]);
            }
        }

        delete data.weapon1;
        delete data.weapon2;
    }
};

//collection of all the options
var extractOptions={
    torpedo:torpedoOptions,
    gun:gunOptions,
    aa:aaOptions,
    plane:planeOptions
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
                currentRowData[extractOptions.cols[y]]=currentRowChildren[y].textContent;
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

//for use with aa gun and planes, where there is no BURST to calculate
function noBurstDataCalc(data)
{
    data.dmg=parseInt(data.dmg);
    data.dps=Number((data.dmg/data.reload).toFixed(2));

    data.upgraded={
        dmg:parseInt(data.dmg10),
        reload:data.reload10
    };

    data.upgraded.dps=Number((data.upgraded.dmg/data.reload10).toFixed(2));

    delete data.dmg10;
    delete data.reload10;
}

function defaultImgModifier(element)
{
    if (element.firstChild && element.firstChild.src)
    {
        if (element.firstChild.src.slice(0,4)!="http")
        {
            return urlrootmod+element.firstChild.src;
        }

        return element.firstChild.src;
    }

    return null;
}

module.exports={extractOptions,jpWikiExtract};