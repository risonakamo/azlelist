//EquipClassMenu(array equipClassNames,array classNamesJp)
//equipClassNames: array of equip classes
//classNamesJp: jp string of equip class names
class EquipClassMenu extends React.Component
{
  constructor(props)
  {
    super(props);
    this.changeCurrentClass=this.changeCurrentClass.bind(this);

    this.state={
      currentClass:0 //the index of the current class
    };
  }

  changeCurrentClass(newClass)
  {
    this.setState({currentClass:newClass});
  }

  render()
  {
    return [
      <div className="class-holder" key="eqmtop1">
        {this.props.equipClassNames.map((x,i)=>{
          if (i==this.state.currentClass)
          {
            return null;
          }

          return <EquipButton name={x} nameJp={this.props.classNamesJp[i]}
            key={i} index={i} changeCurrentClass={this.changeCurrentClass}/>;
        })}
      </div>,

      <div className="current-class" key="eqmtop2">
        <div className="float-border"></div>

        <EquipButton name={this.props.equipClassNames[this.state.currentClass]}
          nameJp={this.props.classNamesJp[this.state.currentClass]}/>

        <div className="side-triangle"></div>
      </div>
    ];
  }
}

//EquipButton(string name,string nameJp,int index,function changeCurrentClass)
//index: index number for changeCurrentClass, only needed if changecurrentclass is going to be used
//changeCurrentClass: parent function that changes the current class of the parent.
class EquipButton extends React.Component
{
  render()
  {
    return (
      <div
        className={`class-button ${this.props.name}`}
        onClick={()=>{
          this.props.changeCurrentClass(this.props.index);
        }}
      >
        <img src={`icons/${this.props.name}.png`}/>
        <div>{this.props.nameJp}</div>
      </div>
    );
  }
}