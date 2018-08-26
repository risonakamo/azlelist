//parents: AzleListControl in azlelistsystem
//SortControlMenu(function sortStat,function toggleMarkMode,function showMarkMode)
//sortStat(int stat,int direction,int upgraded): function from parent to
//call with data from this object
//toggleMarkMode(): parent function to activate markmode
//showMarkMode(): parent function to toggle show marks
//clearMarks(): parent function to clear marks
class SortControlMenu extends React.Component {
  constructor(props) {
    super(props);
    this.changeSort = this.changeSort.bind(this);
    this.changeUpgrade = this.changeUpgrade.bind(this);
    this.sendSortData = this.sendSortData.bind(this);
    this.setMarkEvent = this.setMarkEvent.bind(this);
    this.showMarkEvent = this.showMarkEvent.bind(this);
    this.clearMarksEvent = this.clearMarksEvent.bind(this);
    this.markButtonLoaded = this.markButtonLoaded.bind(this);

    this.state = {
      sortDirection: 1, //ascending or descending sort
      selectedSort: 0,
      selectedUpgrade: 0
    };

    this.sortDirections = ["", "desc"];
    this.markButtons = [];
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

  //event handler for toggling mark mode button
  setMarkEvent(e) {
    e.currentTarget.classList.toggle("selected");
    this.props.toggleMarkMode();
  }

  //event handler for show marks button
  showMarkEvent(e) {
    e.currentTarget.classList.toggle("selected");
    this.props.showMarkMode();
  }

  //event handler for clear mark event button
  clearMarksEvent() {
    this.markButtons[0].classList.remove("selected");
    this.markButtons[1].classList.remove("selected");
    this.props.clearMarks();
  }

  //on load for mark buttons
  markButtonLoaded(ref) {
    this.markButtons.push(ref);
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
        [["SET", this.setMarkEvent], ["SHOW", this.showMarkEvent], ["CLEAR", this.clearMarksEvent]].map((x, i) => {
          return React.createElement(
            "div",
            { className: "mark-button", key: i, onClick: x[1], ref: this.markButtonLoaded },
            x[0]
          );
        })
      )
    );
  }
}
