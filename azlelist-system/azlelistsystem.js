//AzleListControl(object allData,array dataClassNames,array classNamesJp)
//allData: object of all data from data get
//dataClassNames: array of equipment class names in desired order
//classNamesJp: exactly what is sounds like
class AzleListControl extends React.Component {
    constructor(props) {
        super(props);
        this.changeCurrentClass = this.changeCurrentClass.bind(this);

        this.state = {
            currentClass: 0 //index of the current class relative to the dataClassNames object
        };
    }

    //give it the INDEX of the new class to set the current class to
    changeCurrentClass(newclass) {
        this.setState({ currentClass: newclass });
    }

    render() {
        var equipBoxes = [];
        var enabled;
        var currentClass;
        for (var x = 0, l = this.props.dataClassNames.length; x < l; x++) {
            currentClass = this.props.dataClassNames[x];

            if (x == this.state.currentClass) {
                enabled = 1;
            } else {
                enabled = 0;
            }

            equipBoxes.push(React.createElement(EquipBoxControl, { data: this.props.allData[currentClass],
                equipType: currentClass, key: x, enabled: enabled }));
        }

        return [equipBoxes, ReactDOM.createPortal(React.createElement(EquipClassMenu, { equipClassNames: this.props.dataClassNames,
            classNamesJp: this.props.classNamesJp, parentChangeClass: this.changeCurrentClass }), document.querySelector(".class-menu")), ReactDOM.createPortal(React.createElement(SortControlMenu, null), document.querySelector(".control-menu"))];
    }
}
