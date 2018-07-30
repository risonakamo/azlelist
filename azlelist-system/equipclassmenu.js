//EquipClassMenu(array equipClassNames,array classNamesJp,function parentChangeClass)
//equipClassNames: array of equip classes
//classNamesJp: jp string of equip class names
//parentChangeClass(int newClass): function from parent that changes the current equipment class
class EquipClassMenu extends React.Component {
  constructor(props) {
    super(props);
    this.changeCurrentClass = this.changeCurrentClass.bind(this);

    this.state = {
      currentClass: 0 //the index of the current class
    };

    this.topElement = document.querySelector(".top");
  }

  //give it an index newClass to set the new current class
  changeCurrentClass(newClass) {
    this.topElement.classList.remove(this.props.equipClassNames[this.state.currentClass]);
    this.topElement.classList.add(this.props.equipClassNames[newClass]);
    this.setState({ currentClass: newClass });
    this.props.parentChangeClass(newClass);
  }

  render() {
    return [React.createElement(
      "div",
      { className: "current-class", key: "eqmtop1" },
      React.createElement("div", { className: "side-triangle" }),
      React.createElement(EquipButton, { name: this.props.equipClassNames[this.state.currentClass],
        nameJp: this.props.classNamesJp[this.state.currentClass] }),
      React.createElement("div", { className: "float-border" })
    ), React.createElement(
      "div",
      { className: "class-holder", key: "eqmtop2" },
      this.props.equipClassNames.map((x, i) => {
        if (i == this.state.currentClass) {
          return null;
        }

        return React.createElement(EquipButton, { name: x, nameJp: this.props.classNamesJp[i],
          key: i, index: i, changeCurrentClass: this.changeCurrentClass });
      })
    )];
  }
}

//EquipButton(string name,string nameJp,int index,function changeCurrentClass)
//index: index number for changeCurrentClass, only needed if changecurrentclass is going to be used
//changeCurrentClass: parent function that changes the current class of the parent.
class EquipButton extends React.Component {
  render() {
    return React.createElement(
      "div",
      {
        className: `class-button ${this.props.name}`,
        onClick: () => {
          if (this.props.changeCurrentClass) {
            this.props.changeCurrentClass(this.props.index);
          }
        }
      },
      React.createElement("img", { src: `icons/${this.props.name}.png` }),
      React.createElement(
        "div",
        null,
        this.props.nameJp
      )
    );
  }
}
