//SortControlMenu()
class SortControlMenu extends React.Component {
  constructor(props) {
    super(props);
    this.changeSort = this.changeSort.bind(this);

    this.state = {
      sortDirection: 1, //ascending or descending sort
      selectedSort: 0,
      selectedUpgrade: 0
    };

    this.sortDirections = ["", "desc"];
  }

  changeSort(newSort) {
    if (this.state.selectedSort == newSort) {
      this.setState({ sortDirection: this.state.sortDirection ? 0 : 1 });
      return;
    }

    this.setState({ selectedSort: newSort });
  }

  changeUpgrade(newUpgrade) {
    this.setState({ selectedUpgrade: newUpgrade });
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
        React.createElement(
          "div",
          { className: "mark-button selected" },
          "SET"
        ),
        React.createElement(
          "div",
          { className: "mark-button" },
          "SHOW"
        ),
        React.createElement(
          "div",
          { className: "mark-button" },
          "CLEAR"
        )
      )
    );
  }
}
