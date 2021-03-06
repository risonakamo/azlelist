//EquipBoxControl(object-array data,string equipType,bool enabled,bool upgraded,bool/int markMode,bool/int showMark)
//data: an array of equip data objects
//equipType: the string class of equips of the data received
//enabled: if this equipboxcontrol should be displayed
//upgraded: if 1 equipboxes will be upgraded
//markMode: 1=enable mark mode
//showMark: 1=show only marked boxes
class EquipBoxControl extends React.Component
{
  constructor(props)
  {
    super(props);
    this.resetMarks=this.resetMarks.bind(this);

    this.equipBoxes=[];
  }

  //reset equipbox marks
  resetMarks()
  {
    for (var x=0,l=this.equipBoxes.length;x<l;x++)
    {
      if (this.equipBoxes[x])
      {
        this.equipBoxes[x].resetMarks();
      }
    }
  }

  render()
  {
    var enabled="";
    if (!this.props.enabled)
    {
      enabled="hidden";
    }

    var markMode="";
    if (this.props.markMode)
    {
      markMode="mark-mode";
    }

    return (
      <div className={`equip-boxes ${enabled} ${markMode}`}>
        {this.props.data.map((x,i)=>{
          return <EquipBox data={x} key={i} equipType={this.props.equipType}
            upgraded={this.props.upgraded} markMode={this.props.markMode} showMark={this.props.showMark}
            ref={(ref)=>{
              if (ref)
              {
                this.equipBoxes.push(ref);
              }
            }}/>;
        })}
      </div>
    );
  }
}

//EquipBox(object data,string equipType,bool upgraded,bool markMode,bool/int showMark)
//data: a single equipdata object
//equipType: class string of type of equipment
//upgraded: 1 to use upgraded stats, 0 for normal
//markMode: 1=to enable markmode where clicking marks the element
//showMark: 1 to render only if marked
class EquipBox extends React.Component
{
  constructor(props)
  {
    super(props);
    this.getUpgraded=this.getUpgraded.bind(this);
    this.toggleMark=this.toggleMark.bind(this);
    this.resetMarks=this.resetMarks.bind(this);

    this.state={
      marked:0
    };

    if (_initialmarks[this.props.data.name])
    {
      this.state.marked=1;
      this.props.data.marked=1;
    }
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

  toggleMark()
  {
    if (this.props.markMode)
    {
      this.setState({marked:this.state.marked?0:1});
      this.props.data.marked=this.props.data.marked?0:1;

      if (this.props.data.marked)
      {
        _initialmarks[this.props.data.name]=1;
      }

      else
      {
        delete _initialmarks[this.props.data.name];
      }

      queueUpdateMarks();
    }
  }

  resetMarks()
  {
    if (this.props.data.marked)
    {
      this.setState({marked:0});
      this.props.data.marked=0;
    }
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

    var markedState="";
    if (this.props.data.marked)
    {
      markedState="marked";
    }

    var markHidden="";
    if (this.props.showMark && !this.props.data.marked)
    {
      markHidden="hidden";
    }

    return (
      <div className={`equip-box ${this.props.equipType} ${markedState} ${markHidden}`}>
        <div className="img-hold" onClick={this.toggleMark}>
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