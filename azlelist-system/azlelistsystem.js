//AzleListControl(object allData)
class AzleListControl extends React.Component {
    render() {
        var equipBoxes = [];
        var i = 0;
        for (var x in this.props.allData) {
            equipBoxes.push(React.createElement(EquipBoxControl, { data: this.props.allData[x], equipType: x, key: i }));
            i++;
        }

        return equipBoxes;
    }
}
