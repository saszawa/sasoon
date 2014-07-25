var EditSlanter = Class.create(EditObj,{
  initialize: function(){
    EditObj.call(this,BOX_SIZE,BOX_SIZE);
    this._element = document.createElement('div');
    this._element.className = 'slanter';
    this.image = SLANTER;
    this.rotation = 45;
    this.objName = "slanter";

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;

    this.beamStatus = {
      topRight: {moveX: MOVE_PX  ,moveY: -MOVE_PX},
      rightDown:{moveX: MOVE_PX  ,moveY: MOVE_PX },
      downLeft: {moveX: -MOVE_PX ,moveY: MOVE_PX },
      leftTop:  {moveX: -MOVE_PX ,moveY: -MOVE_PX}
    };
    this.color = "green";
  }
});
