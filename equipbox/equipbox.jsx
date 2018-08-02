//EquipBoxControl(object-array data,string equipType,bool enabled,bool upgraded)
//data: an array of equip data objects
//equipType: the string class of equips of the data received
//enabled: if this equipboxcontrol should be displayed
//upgraded: if 1 equipboxes will be upgraded
class EquipBoxControl extends React.Component
{
  render()
  {
    var enabled="";
    if (!this.props.enabled)
    {
      enabled="hidden";
    }

    return (
      <div className={`equip-boxes ${enabled}`}>
        {this.props.data.map((x,i)=>{
          return <EquipBox data={x} key={i} equipType={this.props.equipType} upgraded={this.props.upgraded}/>;
        })}
      </div>
    );
  }
}

//EquipBox(object data,string equipType,bool upgraded)
//data: a single equipdata object
//equipType: class string of type of equipment
//upgraded: 1 to use upgraded stats, 0 for normal
class EquipBox extends React.Component
{
  constructor(props)
  {
    super(props);
    this.getUpgraded=this.getUpgraded.bind(this);
  }

  getUpgraded(yes)
  {
    if (yes)
    {
      return {
        dmg:this.props.data.upgraded.dmg,
        reload:this.props.data.upgraded.reload,
        burst:this.props.data.upgraded.burst,
        dps:this.props.data.upgraded.dps
      };
    }

    return {
      dmg:this.props.data.dmg,
      reload:this.props.data.reload,
      burst:this.props.data.burst,
      dps:this.props.data.dps
    };
  }

  render()
  {
    var upgradeableStats=this.getUpgraded(this.props.upgraded);

    var dmgText;
    if (!this.props.data.shot)
    {
      dmgText=upgradeableStats.dmg;
    }

    else
    {
      dmgText=`${upgradeableStats.dmg}x${this.props.data.shot}`;
    }

    return (
      <div className={`equip-box ${this.props.equipType}`}>
        <div className="img-hold">
          <div className="top-img">
            <img src={this.props.data.img}/>
          </div>

          <div className="bot-imgs">
            {(()=>{
              if (this.props.data.mag)
              {
                return <img className="icon" src="icons/mag.png" title="Magnetic Torpedo"/>;
              }

              switch (this.props.data.type)
              {
                case 1:
                return <img className="icon" src="icons/ap.png" title="Armour Penetrating"/>;

                case 2:
                return <img className="icon" src="icons/he.png" title="High Explosive"/>;

                case 3:
                return <img className="icon" src="icons/sanshiki.png" title="Sanshiki Round"/>;
              }
            })()}
          </div>
        </div>

        <div className="info">
          <div className="name">{this.props.data.name}</div>
          <div className="divider"></div>
          <div className="stats">
            <div className="stat-box">
              <div className="label">DMG</div>
              <div className="stat">{dmgText}</div>
            </div>

            {(()=>{
              if (this.props.data.burst)
              {
                return (
                  <div className="stat-box">
                    <div className="label">BURST</div>
                    <div className="stat">{upgradeableStats.burst}/atk</div>
                  </div>
                );
              }
            })()}

            <div className="stat-box">
              <div className="label">RELOAD</div>
              <div className="stat">{upgradeableStats.reload}s</div>
            </div>

            <div className="stat-box">
              <div className="label">DPS</div>
              <div className="stat">{upgradeableStats.dps}/s</div>
            </div>

            {(()=>{
              if (this.props.data.weapons)
              {
                return (
                  <div className="stat-box weapon-box">
                    {this.props.data.weapons.map((x,i)=>{
                      return <div className="plane-weapon" key={i}>{x}</div>;
                    })}
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}