//AzleListControl(object allData,array dataClassNames,array classNamesJp)
//allData: object of all data from data get
//dataClassNames: array of equipment class names in desired order
//classNamesJp: exactly what is sounds like
class AzleListControl extends React.Component {
    constructor(props) {
        super(props);
        this.changeCurrentClass = this.changeCurrentClass.bind(this);
        this.sortByStat = this.sortByStat.bind(this);
        this.toggleMarkMode = this.toggleMarkMode.bind(this);

        this.state = {
            currentClass: 0, //index of the current class relative to the dataClassNames object
            allData: this.props.allData,
            upgraded: 0,
            markMode: 0
        };

        this.sortNames = ["dps", "burst", "dmg", "rarity", "reload", "shot"];

        //this.firstSort=0
    }

    componentDidMount() {
        if (!this.firstSort) {
            this.sortByStat(0, 0, 0);
        }
    }

    //give it the INDEX of the new class to set the current class to
    changeCurrentClass(newclass) {
        this.setState({ currentClass: newclass });
    }

    //sortByStat(int stat,int direction,int upgraded)
    //stat: an index representing what stat to sort by.
    //direction: 1=ascending or 0=descending
    //upgraded: sort by 0=non upgraded stats or 1=upgraded stats
    sortByStat(stat, direction, upgraded) {
        var data = this.state.allData[this.props.dataClassNames[this.state.currentClass]];

        stat = this.sortNames[stat];

        data.sort((a, b) => {
            if (!upgraded || !a.upgraded[stat]) {
                if (a[stat] > b[stat]) {
                    return 1;
                } else if (a[stat] < b[stat]) {
                    return -1;
                }

                return 0;
            }

            if (a.upgraded[stat] > b.upgraded[stat]) {
                return 1;
            } else if (a.upgraded[stat] < b.upgraded[stat]) {
                return -1;
            }

            return 0;
        });

        if (direction) {
            data.reverse();
        }

        this.setState({ allData: this.state.allData, upgraded });
    }

    //toggle the mark mode state
    toggleMarkMode() {
        this.setState({ markMode: this.state.markMode ? 0 : 1 });
    }

    render() {
        var equipBoxes = [];
        var enabled;
        var currentClass;
        var markMode;
        for (var x = 0, l = this.props.dataClassNames.length; x < l; x++) {
            currentClass = this.props.dataClassNames[x];

            if (x == this.state.currentClass) {
                enabled = 1;
                markMode = this.state.markMode;
            } else {
                enabled = 0;
                markMode = 0;
            }

            equipBoxes.push(React.createElement(EquipBoxControl, { data: this.props.allData[currentClass],
                equipType: currentClass, key: x, enabled: enabled, upgraded: this.state.upgraded, markMode: markMode }));
        }

        return [equipBoxes, ReactDOM.createPortal(React.createElement(EquipClassMenu, { equipClassNames: this.props.dataClassNames,
            classNamesJp: this.props.classNamesJp, parentChangeClass: this.changeCurrentClass }), document.querySelector(".class-menu")), ReactDOM.createPortal(React.createElement(SortControlMenu, { sortStat: this.sortByStat, toggleMarkMode: this.toggleMarkMode }), document.querySelector(".control-menu"))];
    }
}
