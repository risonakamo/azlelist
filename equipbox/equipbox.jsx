//EquipBoxControl(object-array data)
//data: an array of equip data objects
class EquipBoxControl extends React.Component
{
  render()
  {
    return this.props.data.map((x,i)=>{
      return <EquipBox data={x} key={i} equipType="torp"/>;
    });
  }
}

//EquipBox(object data,string equipType)
//data: a single equipdata object
class EquipBox extends React.Component
{
  render()
  {
    return (
      <div className={`equip-box ${this.props.equipType}`}>
        <div className="img-hold">
          <div className="top-img">
            <img src={this.props.data.img}/>
          </div>

          <div className="bot-imgs"></div>
        </div>

        <div className="info">
          <div className="name">{this.props.data.name}</div>
          <div className="divider"></div>
          <div className="stats">
            <div className="stat-box">
              <div className="label">DMG</div>
              <div className="stat">{this.props.data.dmg}x{this.props.data.shot}</div>
            </div>

            {(()=>{
              if (this.props.data.burst)
              {
                return (
                  <div className="stat-box">
                    <div className="label">BURST</div>
                    <div className="stat">{this.props.data.burst}/vol</div>
                  </div>
                );
              }
            })()}

            <div className="stat-box">
              <div className="label">RELOAD</div>
              <div className="stat">{this.props.data.reload}s</div>
            </div>

            <div className="stat-box">
              <div className="label">DPS</div>
              <div className="stat">{this.props.data.dps}/s</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}