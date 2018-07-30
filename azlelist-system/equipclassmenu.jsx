//EquipClassMenu(array equipClassNames,array classNamesJp)
//equipClassNames: array of equip classes
//classNamesJp: jp string of equip class names
class EquipClassMenu extends React.Component
{
  render()
  {
    return [
      <div className="class-holder" key="eqmtop1">
        {this.props.equipClassNames.map((x,i)=>{
          return (
            <div className={`class-button ${x}`} key={i}>
              <img src={`icons/${x}.png`}/>
              <div>{this.props.classNamesJp[i]}</div>
            </div>
          );
        })}
      </div>,

      <div className="current-class" key="eqmtop2">
        <div className="float-border"></div>

        <div className="side-triangle"></div>
      </div>
    ];
  }
}