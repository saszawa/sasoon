var EditBlock = Class.create(EditObj,{
  initialize: function(color){
    EditObj.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;
    this.objName = this.color;

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;

    if(this.color === 'orange'){
      this.image = ORANGE;
    } else if(this.color === 'purple'){
      this.image = PURPLE;
    }

    // Beam用ステータス
    this.beamStatus = {
      top:{
        moveX: 0,
        moveY: -MOVE_PX,
      },
      right:{
        moveX: MOVE_PX,
        moveY: 0
      },
      down:{
        moveX: 0,
        moveY: MOVE_PX
      },
      left:{
        moveX: -MOVE_PX,
        moveY: 0
      }
    };
  },
  beamFire: function beamFire(){
    var i = 0;
    for(var beam in this.beamStatus){
      if(DIRECTIONS[this.color][i]){
        // 初期設定的な
        var beamInit = {
          x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
          y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
          parentBlock:this,
          beamLength:BEAM_LENGTH
        }
        this.parentNode.addChild(new EditBeam(this.beamStatus[beam],beamInit));
      }
      i++;
    }
  }
});
