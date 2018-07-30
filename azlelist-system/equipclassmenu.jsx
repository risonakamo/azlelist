//EquipClassMenu(array equipClassNames,array classNamesJp)
//equipClassNames: array of equip classes
//classNamesJp: jp string of equip class names
class EquipClassMenu extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      currentClass:0 //the index of the current class
    };
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

          return <EquipButton name={x} nameJp={this.props.classNamesJp[i]} key={i}/>;
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

//EquipButton(string name,string nameJp)
class EquipButton extends React.Component
{
  render()
  {
    return (
      <div className={`class-button ${this.props.name}`}>
        <img src={`icons/${this.props.name}.png`}/>
        <div>{this.props.nameJp}</div>
      </div>
    );
  }
}