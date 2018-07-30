//EquipClassMenu(array equipClassNames,array classNamesJp)
//equipClassNames: array of equip classes
//classNamesJp: jp string of equip class names
class EquipClassMenu extends React.Component {
  render() {
    return [React.createElement(
      "div",
      { className: "class-holder", key: "eqmtop1" },
      this.props.equipClassNames.map((x, i) => {
        return React.createElement(
          "div",
          { className: `class-button ${x}`, key: i },
          React.createElement("img", { src: `icons/${x}.png` }),
          React.createElement(
            "div",
            null,
            this.props.classNamesJp[i]
          )
        );
      })
    ), React.createElement(
      "div",
      { className: "current-class", key: "eqmtop2" },
      React.createElement("div", { className: "float-border" }),
      React.createElement("div", { className: "side-triangle" })
    )];
  }
}
