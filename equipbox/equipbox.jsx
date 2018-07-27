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
  constructor(props)
  {
    super(props);
    this.toggleUpgraded=this.toggleUpgraded.bind(this);

    this.state={
      dmg:this.props.data.dmg,
      reload:this.props.data.reload,
      burst:this.props.data.burst,
      dps:this.props.data.dps
    };

    this.showingUpgraded=0;
  }

  toggleUpgraded()
  {
    if (this.showingUpgraded)
    {
      this.setState({
        dmg:this.props.data.dmg,
        reload:this.props.data.reload,
        burst:this.props.data.burst,
        dps:this.props.data.dps
      });

      this.showingUpgraded=0;
    }

    else
    {
      this.setState({
        dmg:this.props.data.upgraded.dmg,
        reload:this.props.data.upgraded.reload,
        burst:this.props.data.upgraded.burst,
        dps:this.props.data.upgraded.dps
      });

      this.showingUpgraded=1;
    }
  }

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
              <div className="stat">{this.state.dmg}x{this.props.data.shot}</div>
            </div>

            {(()=>{
              if (this.props.data.burst)
              {
                return (
                  <div className="stat-box">
                    <div className="label">BURST</div>
                    <div className="stat">{this.state.burst}/vol</div>
                  </div>
                );
              }
            })()}

            <div className="stat-box">
              <div className="label">RELOAD</div>
              <div className="stat">{this.state.reload}s</div>
            </div>

            <div className="stat-box">
              <div className="label">DPS</div>
              <div className="stat">{this.state.dps}/s</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}