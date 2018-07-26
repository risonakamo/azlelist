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

        13:(element)=>{
            if (element.innerText=="通常弾")
            {
                return 0;
            }

            return 1;
        }
    },

    calculations:(data)=>{
        var dmg=data.dmg.split("x");
        data.dmg=parseInt(dmg[0]);
        data.shot=parseInt(dmg[1]);

        data.dmg10=data.dmg10.split("x")[0];
        data.burst=data.dmg*data.shot;
        data.burst10=data.dmg10*data.shot;

        data.dps=data.dmg/data.reload;
        data.dps10=data.dmg10/data.reload10;
    }
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

    return res;
}