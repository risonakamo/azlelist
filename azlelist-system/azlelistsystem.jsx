//AzleListControl(object allData,array dataClassNames,array classNamesJp)
//allData: object of all data from data get
//dataClassNames: array of equipment class names in desired order
//classNamesJp: exactly what is sounds like
class AzleListControl extends React.Component
{
    constructor(props)
    {
        super(props);
        this.changeCurrentClass=this.changeCurrentClass.bind(this);
        this.sortByStat=this.sortByStat.bind(this);
        this.toggleMarkMode=this.toggleMarkMode.bind(this);
        this.toggleShowMarks=this.toggleShowMarks.bind(this);
        this.clearMarks=this.clearMarks.bind(this);

        this.state={
            currentClass:0, //index of the current class relative to the dataClassNames object
            allData:this.props.allData,
            upgraded:0,
            markMode:0,
            showMark:0
        };

        //sort by stat indexes based off this
        this.sortNames=["dps","burst","dmg","rarity","reload","shot"];

        //this.firstSort=0* whether first sort has happened
        this.sortMenu=React.createRef(); //sort menu component

        this.equipControls=[];
    }

    componentDidMount()
    {
        if (!this.firstSort)
        {
            this.sortByStat(0,0,0);
        }
    }

    //give it the INDEX of the new class to set the current class to
    changeCurrentClass(newclass)
    {
        this.setState({currentClass:newclass},()=>{
            this.sortByStat(this.sortMenu.current.state.selectedSort,
                this.sortMenu.current.state.sortDirection,
                this.sortMenu.current.state.selectedUpgrade);
        });
    }

    //sortByStat(int stat,int direction,int upgraded)
    //stat: an index representing what stat to sort by.
    //direction: 1=ascending or 0=descending
    //upgraded: sort by 0=non upgraded stats or 1=upgraded stats
    sortByStat(stat,direction,upgraded)
    {
        var data=this.state.allData[this.props.dataClassNames[this.state.currentClass]];

        stat=this.sortNames[stat];

        data.sort((a,b)=>{
            if (!upgraded || !a.upgraded[stat])
            {
                if (a[stat]>b[stat])
                {
                    return 1;
                }

                else if (a[stat]<b[stat])
                {
                    return -1;
                }

                return 0;
            }

            if (a.upgraded[stat]>b.upgraded[stat])
            {
                return 1;
            }

            else if (a.upgraded[stat]<b.upgraded[stat])
            {
                return -1;
            }

            return 0;
        });

        if (direction)
        {
            data.reverse();
        }

        this.setState({allData:this.state.allData,upgraded});
    }

    //toggle the mark mode state
    toggleMarkMode()
    {
        this.setState({markMode:this.state.markMode?0:1});
    }

    //toggle show marked equips only
    toggleShowMarks()
    {
        this.setState({showMark:this.state.showMark?0:1});
    }

    //reset the markmode and showmark after clearing marks
    clearMarks()
    {
        localStorage.removeItem("marks");
        _initialmarks={};
        this.setState({showMark:0,markMode:0});

        for (var x=0,l=this.equipControls.length;x<l;x++)
        {
            if (this.equipControls[x])
            {
                this.equipControls[x].resetMarks();
            }
        }
    }

    render()
    {
        var equipBoxes=[];
        var enabled;
        var currentClass;
        var markMode;
        var showMark;
        for (var x=0,l=this.props.dataClassNames.length;x<l;x++)
        {
            currentClass=this.props.dataClassNames[x];

            if (x==this.state.currentClass)
            {
                enabled=1;
                markMode=this.state.markMode;
                showMark=this.state.showMark;
            }

            else
            {
                enabled=0;
                markMode=0;
                showMark=0;
            }

            equipBoxes.push(<EquipBoxControl data={this.props.allData[currentClass]}
                equipType={currentClass} key={x} enabled={enabled}
                upgraded={this.state.upgraded} markMode={markMode} showMark={showMark}
                ref={(ref)=>{
                    this.equipControls.push(ref);
                }}/>);
        }

        return [
            equipBoxes,

            <div className="background"></div>,

            ReactDOM.createPortal(<EquipClassMenu equipClassNames={this.props.dataClassNames}
                classNamesJp={this.props.classNamesJp} parentChangeClass={this.changeCurrentClass}/>,
                document.querySelector(".class-menu")),

            ReactDOM.createPortal(<SortControlMenu sortStat={this.sortByStat}
                toggleMarkMode={this.toggleMarkMode} showMarkMode={this.toggleShowMarks}
                clearMarks={this.clearMarks} ref={this.sortMenu}/>,
                document.querySelector(".control-menu"))
        ];
    }
}