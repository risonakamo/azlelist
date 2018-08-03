//SortControlMenu(function sortStat,function toggleMarkMode,function showMarkMode)
//sortStat(int stat,int direction,int upgraded): function from parent to
//call with data from this object
//toggleMarkMode(): parent function to activate markmode
//showMarkMode(): parent function to toggle show marks
class SortControlMenu extends React.Component
{
  constructor(props)
  {
    super(props);
    this.changeSort=this.changeSort.bind(this);
    this.changeUpgrade=this.changeUpgrade.bind(this);
    this.sendSortData=this.sendSortData.bind(this);
    this.setMarkEvent=this.setMarkEvent.bind(this);
    this.showMarkEvent=this.showMarkEvent.bind(this);

    this.state={
      sortDirection:1, //ascending or descending sort
      selectedSort:0,
      selectedUpgrade:0
    };

    this.sortDirections=["","desc"];
  }

  //switch the current sort to one specfied by index, propogates up
  changeSort(newSort)
  {
    if (this.state.selectedSort==newSort)
    {
      this.setState({sortDirection:this.state.sortDirection?0:1},this.sendSortData);
      return;
    }

    this.setState({selectedSort:newSort},this.sendSortData);
  }

  //switch current uprade mode, propgates up
  changeUpgrade(newUpgrade)
  {
    this.setState({selectedUpgrade:newUpgrade},this.sendSortData);
  }

  //trigger sort render update in parent
  sendSortData()
  {
    this.props.sortStat(this.state.selectedSort,this.state.sortDirection,this.state.selectedUpgrade);
  }

  setMarkEvent(e)
  {
    e.currentTarget.classList.toggle("selected");
    this.props.toggleMarkMode();
  }

  showMarkEvent(e)
  {
    e.currentTarget.classList.toggle("selected");
    this.props.showMarkMode();
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
          {[["SET",this.setMarkEvent],["SHOW",this.showMarkEvent],["CLEAR",null]].map((x,i)=>{
            return <div className="mark-button" key={i} onClick={x[1]}>{x[0]}</div>;
          })}
        </div>
      </div>
    );
  }
}