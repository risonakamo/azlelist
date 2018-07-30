//EquipClassMenu(array equipClassNames,array classNamesJp)
//equipClassNames: array of equip classes
//classNamesJp: jp string of equip class names
class EquipClassMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentClass: 0 //the index of the current class
    };
  }

  render() {
    return [React.createElement(
      "div",
      { className: "class-holder", key: "eqmtop1" },
      this.props.equipClassNames.map((x, i) => {
        if (i == this.state.currentClass) {
          return null;
        }

        return React.createElement(EquipButton, { name: x, nameJp: this.props.classNamesJp[i], key: i });
      })
    ), React.createElement(
      "div",
      { className: "current-class", key: "eqmtop2" },
      React.createElement("div", { className: "float-border" }),
      React.createElement(EquipButton, { name: this.props.equipClassNames[this.state.currentClass],
        nameJp: this.props.classNamesJp[this.state.currentClass] }),
      React.createElement("div", { className: "side-triangle" })
    )];
  }
}

//EquipButton(string name,string nameJp)
class EquipButton extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: `class-button ${this.props.name}` },
      React.createElement("img", { src: `icons/${this.props.name}.png` }),
      React.createElement(
        "div",
        null,
        this.props.nameJp
      )
    );
  }
}
