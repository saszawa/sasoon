var EditDiffusioner = Class.create(EditObj,{
  initialize: function(){
    EditObj.call(this,BOX_SIZE,BOX_SIZE);
    this._element = document.createElement('div');
    this._element.className = 'diffusioner';
    this.image = DIFFUSIONER;
    this.objName = "diffusioner";

    // 倍の早さ
    var movePx = MOVE_PX*2;

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;

    this.beamStatus = {
      top:      {moveX: 0        ,moveY: -movePx},
      topRight: {moveX: movePx   ,moveY: -movePx},
      right:    {moveX: movePx   ,moveY: 0       },
      rightDown:{moveX: movePx   ,moveY: movePx },
      down:     {moveX: 0        ,moveY: movePx },
      downLeft: {moveX: -movePx  ,moveY: movePx },
      left:     {moveX: -movePx  ,moveY: 0       },
      leftTop:  {moveX: -movePx  ,moveY: -movePx}
    };

    this.color = "red";

  }
});
