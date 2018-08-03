//SortControlMenu(function sortStat,function toggleMarkMode)
//sortStat(int stat,int direction,int upgraded): function from parent to
//call with data from this object
//toggleMarkMode(): parent function to activate markmode
class SortControlMenu extends React.Component {
  constructor(props) {
    super(props);
    this.changeSort = this.changeSort.bind(this);
    this.changeUpgrade = this.changeUpgrade.bind(this);
    this.sendSortData = this.sendSortData.bind(this);
    this.setMarkEvent = this.setMarkEvent.bind(this);

    this.state = {
      sortDirection: 1, //ascending or descending sort
      selectedSort: 0,
      selectedUpgrade: 0
    };

    this.sortDirections = ["", "desc"];
  }

  //switch the current sort to one specfied by index, propogates up
  changeSort(newSort) {
    if (this.state.selectedSort == newSort) {
      this.setState({ sortDirection: this.state.sortDirection ? 0 : 1 }, this.sendSortData);
      return;
    }

    this.setState({ selectedSort: newSort }, this.sendSortData);
  }

  //switch current uprade mode, propgates up
  changeUpgrade(newUpgrade) {
    this.setState({ selectedUpgrade: newUpgrade }, this.sendSortData);
  }

  //trigger sort render update in parent
  sendSortData() {
    this.props.sortStat(this.state.selectedSort, this.state.sortDirection, this.state.selectedUpgrade);
  }

  setMarkEvent(e) {
    e.currentTarget.classList.toggle("selected");
    this.props.toggleMarkMode();
  }

  render() {
    return React.createElement(
      "div",
      { className: `controlmenu-wrap ${this.sortDirections[this.state.sortDirection]}` },
      React.createElement("div", { className: "spacer" }),
      React.createElement(
        "div",
        { className: "label" },
        "SORT",
        React.createElement("div", { className: "label-line" })
      ),
      ["DPS", "BURST", "DMG", "RARE", "RELOAD", "SHOT"].map((x, i) => {
        var selected = "";
        if (i == this.state.selectedSort) {
          selected = "selected";
        }

        return React.createElement(
          "div",
          {
            className: `sort-button ${selected}`,
            key: i,
            onClick: () => {
              this.changeSort(i);
            }
          },
          x
        );
      }),
      React.createElement("div", { className: "spacer" }),
      React.createElement(
        "div",
        { className: "label" },
        "\u5F37\u5316",
        React.createElement("div", { className: "label-line" })
      ),
      React.createElement(
        "div",
        { className: "upgrade-buttons" },
        ["+0", "+10"].map((x, i) => {
          var selected = "";
          if (i == this.state.selectedUpgrade) {
            selected = "selected";
          }

          return React.createElement(
            "div",
            {
              className: `sort-button ${selected}`,
              onClick: () => {
                this.changeUpgrade(i);
              },
              key: i
            },
            x
          );
        })
      ),
      React.createElement("div", { className: "spacer" }),
      React.createElement(
        "div",
        { className: "label" },
        "MARK",
        React.createElement("div", { className: "label-line" })
      ),
      React.createElement(
        "div",
        { className: "mark-buttons" },
        [["SET", this.setMarkEvent], ["SHOW", null], ["CLEAR", null]].map((x, i) => {
          return React.createElement(
            "div",
            { className: "mark-button", key: i, onClick: x[1] },
            x[0]
          );
        })
      )
    );
  }
}
