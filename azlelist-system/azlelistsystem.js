//AzleListControl(object allData)
//allData: object of all data from data get
//dataClassNames: array of equipment class names in desired order
class AzleListControl extends React.Component {
    render() {
        var equipBoxes = [];
        var enabled;
        var currentClass;
        for (var x = 0, l = this.props.dataClassNames.length; x < l; x++) {
            currentClass = this.props.dataClassNames[x];

            if (x == 0) {
                enabled = 1;
            } else {
                enabled = 0;
            }

            equipBoxes.push(React.createElement(EquipBoxControl, { data: this.props.allData[currentClass],
                equipType: currentClass, key: x, enabled: enabled }));
        }

        return equipBoxes;
    }
}