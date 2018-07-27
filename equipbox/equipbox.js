//EquipBoxControl(object-array data)
//data: an array of equip data objects
class EquipBoxControl extends React.Component {
  render() {
    return this.props.data.map((x, i) => {
      return React.createElement(EquipBox, { data: x, key: i, equipType: "torp" });
    });
  }
}

//EquipBox(object data,string equipType)
//data: a single equipdata object
class EquipBox extends React.Component {
  constructor(props) {
    super(props);
    this.toggleUpgraded = this.toggleUpgraded.bind(this);

    this.state = {
      dmg: this.props.data.dmg,
      reload: this.props.data.reload,
      burst: this.props.data.burst,
      dps: this.props.data.dps
    };

    this.showingUpgraded = 0;
  }

  toggleUpgraded() {
    if (this.showingUpgraded) {
      this.setState({
        dmg: this.props.data.dmg,
        reload: this.props.data.reload,
        burst: this.props.data.burst,
        dps: this.props.data.dps
      });

      this.showingUpgraded = 0;
    } else {
      this.setState({
        dmg: this.props.data.upgraded.dmg,
        reload: this.props.data.upgraded.reload,
        burst: this.props.data.upgraded.burst,
        dps: this.props.data.upgraded.dps
      });

      this.showingUpgraded = 1;
    }
  }

  render() {
    return React.createElement(
      "div",
      { className: `equip-box ${this.props.equipType}` },
      React.createElement(
        "div",
        { className: "img-hold" },
        React.createElement(
          "div",
          { className: "top-img" },
          React.createElement("img", { src: this.props.data.img })
        ),
        React.createElement("div", { className: "bot-imgs" })
      ),
      React.createElement(
        "div",
        { className: "info" },
        React.createElement(
          "div",
          { className: "name" },
          this.props.data.name
        ),
        React.createElement("div", { className: "divider" }),
        React.createElement(
          "div",
          { className: "stats" },
          React.createElement(
            "div",
            { className: "stat-box" },
            React.createElement(
              "div",
              { className: "label" },
              "DMG"
            ),
            React.createElement(
              "div",
              { className: "stat" },
              this.state.dmg,
              "x",
              this.props.data.shot
            )
          ),
          (() => {
            if (this.props.data.burst) {
              return React.createElement(
                "div",
                { className: "stat-box" },
                React.createElement(
                  "div",
                  { className: "label" },
                  "BURST"
                ),
                React.createElement(
                  "div",
                  { className: "stat" },
                  this.state.burst,
                  "/vol"
                )
              );
            }
          })(),
          React.createElement(
            "div",
            { className: "stat-box" },
            React.createElement(
              "div",
              { className: "label" },
              "RELOAD"
            ),
            React.createElement(
              "div",
              { className: "stat" },
              this.state.reload,
              "s"
            )
          ),
          React.createElement(
            "div",
            { className: "stat-box" },
            React.createElement(
              "div",
              { className: "label" },
              "DPS"
            ),
            React.createElement(
              "div",
              { className: "stat" },
              this.state.dps,
              "/s"
            )
          )
        )
      )
    );
  }
}
