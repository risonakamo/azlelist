//SortControlMenu()
class SortControlMenu extends React.Component
{
  constructor(props)
  {
    super(props);
    this.changeSort=this.changeSort.bind(this);

    this.state={
      sortDirection:1, //ascending or descending sort
      selectedSort:0,
      selectedUpgrade:0
    };

    this.sortDirections=["","desc"];
  }

  changeSort(newSort)
  {
    if (this.state.selectedSort==newSort)
    {
      this.setState({sortDirection:this.state.sortDirection?0:1});
      return;
    }

    this.setState({selectedSort:newSort});
  }

  changeUpgrade(newUpgrade)
  {
    this.setState({selectedUpgrade:newUpgrade});
  }

  render()
  {
    return (
      <div className={`controlmenu-wrap ${this.sortDirections[this.state.sortDirection]}`}>
        <div className="spacer"></div>

        <div className="label">
          SORT
          <div className="label-line"></div>
        </div>

        {/*sort buttons*/}
        {["DPS","BURST","DMG","RARE","RELOAD","SHOT"].map((x,i)=>{
          var selected="";
          if (i==this.state.selectedSort)
          {
            selected="selected";
          }

          return (
            <div
              className={`sort-button ${selected}`}
              key={i}
              onClick={()=>{
                this.changeSort(i);
              }}
            >
              {x}
            </div>
          );
        })}

        <div className="spacer"></div>

        <div className="label">
          強化
          <div className="label-line"></div>
        </div>

        {/*upgrade buttons*/}
        <div className="upgrade-buttons">
          {["+0","+10"].map((x,i)=>{
            var selected="";
            if (i==this.state.selectedUpgrade)
            {
              selected="selected";
            }

            return (
              <div
                className={`sort-button ${selected}`}
                onClick={()=>{
                  this.changeUpgrade(i);
                }}
                key={i}
              >
                {x}
              </div>
            );
          })}
        </div>

        <div className="spacer"></div>

        <div className="label">
          MARK
          <div className="label-line"></div>
        </div>

        <div className="mark-buttons">
          {["SET","SHOW","CLEAR"].map((x,i)=>{
            return <div className="mark-button" key={i}>{x}</div>;
          })}
        </div>
      </div>
    );
  }
}