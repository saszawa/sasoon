var EditBeam = Class.create(Beam,{
  initialize: function(direction ,init){
    Beam.call(this,BEAM_SIZE,BEAM_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'beam';

    // 初期状態
    this.direction = direction;
    this.initX = init.x;
    this.initY = init.y;
    this.x = init.x;
    this.y = init.y;

    this.currentStage = currentStage;
    this.parentBlock = init.parentBlock;
    this.beamLength = init.beamLength*BOX_SIZE;

    this.COLORS = COLORS;

  },
  onenterframe: function(){
    // 衝突検知
    // やっぱこうなるの・・・
    var gimmicks = creater.currentStage.length;
    var distance = BOX_HALF+12;
    for(var i = 0; i < gimmicks; i++){
      if(!creater.currentStage[i]){
      } else if(this.within(creater.currentStage[i], distance) && creater.currentStage[i] !== this.parentBlock){
        // 発射！
        creater.currentStage[i].run();

        // 当たったら消える
        delete creater.currentStage[i];
        creater.currentStage.splice(i,1);
        GAME.currentScene.removeChild(this);
        return;
      }
    }

    // Beamの移動と生存期間
    if(Math.abs(this.initX-this.x) < this.beamLength
       &&  Math.abs(this.initY-this.y) < this.beamLength){
         this.x += this.direction.moveX;
         this.y += this.direction.moveY;
       } else {
         // 生存期間を過ぎると消えていく
         this.opacity -= 0.1;
         if(this.opacity < 0){
           GAME.currentScene.removeChild(this);
         }
       }
  }
});
