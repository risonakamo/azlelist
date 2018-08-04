//EquipBoxControl(object-array data,string equipType,bool enabled,bool upgraded,bool/int markMode,bool/int showMark)
//data: an array of equip data objects
//equipType: the string class of equips of the data received
//enabled: if this equipboxcontrol should be displayed
//upgraded: if 1 equipboxes will be upgraded
//markMode: 1=enable mark mode
//showMark: 1=show only marked boxes
class EquipBoxControl extends React.Component {
  render() {
    var enabled = "";
    if (!this.props.enabled) {
      enabled = "hidden";
    }

    var markMode = "";
    if (this.props.markMode) {
      markMode = "mark-mode";
    }

    return React.createElement(
      "div",
      { className: `equip-boxes ${enabled} ${markMode}` },
      this.props.data.map((x, i) => {
        return React.createElement(EquipBox, { data: x, key: i, equipType: this.props.equipType,
          upgraded: this.props.upgraded, markMode: this.props.markMode, showMark: this.props.showMark });
      })
    );
  }
}

//EquipBox(object data,string equipType,bool upgraded,bool markMode,bool/int showMark)
//data: a single equipdata object
//equipType: class string of type of equipment
//upgraded: 1 to use upgraded stats, 0 for normal
//markMode: 1=to enable markmode where clicking marks the element
//showMark: 1 to render only if marked
class EquipBox extends React.Component {
  constructor(props) {
    super(props);
    this.getUpgraded = this.getUpgraded.bind(this);
    this.toggleMark = this.toggleMark.bind(this);

    this.state = {
      marked: false
    };
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

  toggleMark() {
    if (this.props.markMode) {
      this.setState({ marked: !this.state.marked });
      this.props.data.marked = this.props.data.marked ? 0 : 1;
    }
  }

  render() {
    var upgradeableStats = this.getUpgraded(this.props.upgraded);

    var dmgText;
    if (!this.props.data.shot) {
      dmgText = upgradeableStats.dmg;
    } else {
      dmgText = `${upgradeableStats.dmg}x${this.props.data.shot}`;
    }

    var markedState = "";
    if (this.props.data.marked) {
      markedState = "marked";
    }

    var markHidden = "";
    if (this.props.showMark && !this.props.data.marked) {
      markHidden = "hidden";
    }

    return React.createElement(
      "div",
      { className: `equip-box ${this.props.equipType} ${markedState} ${markHidden}` },
      React.createElement(
        "div",
        { className: "img-hold", onClick: this.toggleMark },
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
