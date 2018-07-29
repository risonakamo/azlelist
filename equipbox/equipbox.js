//EquipBoxControl(object-array data,string equipType,bool enabled)
//data: an array of equip data objects
//equipType: the string class of equips of the data received
//enabled: if this equipboxcontrol should be displayed
class EquipBoxControl extends React.Component {
  constructor(props) {
    super(props);
    this.sortByStat = this.sortByStat.bind(this);

    this.state = {
      data: this.props.data,
      descend: 1
    };
  }

  componentDidMount() {
    this.sortByStat("dps");
  }

  //sort the data array. give it the stat string to sort, and
  //a 1 for upgraded to sort by upgraded stat.
  sortByStat(stat, upgraded = 0) {
    this.state.data.sort((a, b) => {
      if (!upgraded) {
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

    if (this.state.descend) {
      this.state.data.reverse();
    }

    this.setState({ data: this.state.data });
  }

  render() {
    var enabled = "";
    if (!this.props.enabled) {
      enabled = "hidden";
    }

    return React.createElement(
      "div",
      { className: `equip-boxes ${enabled}` },
      this.state.data.map((x, i) => {
        return React.createElement(EquipBox, { data: x, key: i, equipType: this.props.equipType });
      })
    );
  }
}

//EquipBox(object data,string equipType,bool upgraded)
//data: a single equipdata object
//equipType: class string of type of equipment
//upgraded: 1 to use upgraded stats, 0 for normal
class EquipBox extends React.Component {
  constructor(props) {
    super(props);
    this.getUpgraded = this.getUpgraded.bind(this);
  }

  getUpgraded(yes) {
    if (yes) {
      return {
        dmg: this.props.data.upgraded.dmg,
        reload: this.props.data.upgraded.reload,
        burst: this.props.data.upgraded.burst,
        dps: this.props.data.upgraded.dps
      };
    }

    return {
      dmg: this.props.data.dmg,
      reload: this.props.data.reload,
      burst: this.props.data.burst,
      dps: this.props.data.dps
    };
  }

  render() {
    var upgradeableStats = this.getUpgraded(this.props.upgraded);

    var dmgText;
    if (!this.props.data.shot) {
      dmgText = upgradeableStats.dmg;
    } else {
      dmgText = `${upgradeableStats.dmg}x${this.props.data.shot}`;
    }

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
        React.createElement(
          "div",
          { className: "bot-imgs" },
          (() => {
            if (this.props.data.mag) {
              return React.createElement("img", { className: "icon", src: "icons/mag.png", title: "Magnetic Torpedo" });
            }

            switch (this.props.data.type) {
              case 1:
                return React.createElement("img", { className: "icon", src: "icons/ap.png", title: "Armour Penetrating" });

              case 2:
                return React.createElement("img", { className: "icon", src: "icons/he.png", title: "High Explosive" });

              case 3:
                return React.createElement("img", { className: "icon", src: "icons/sanshiki.png", title: "Sanshiki Round" });
            }
          })()
        )
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
              dmgText
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
                  upgradeableStats.burst,
                  "/atk"
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
              upgradeableStats.reload,
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
              upgradeableStats.dps,
              "/s"
            )
          ),
          (() => {
            if (this.props.data.weapons) {
              return React.createElement(
                "div",
                { className: "stat-box weapon-box" },
                this.props.data.weapons.map((x, i) => {
                  return React.createElement(
                    "div",
                    { className: "plane-weapon", key: i },
                    x
                  );
                })
              );
            }
          })()
        )
      )
    );
  }
}
