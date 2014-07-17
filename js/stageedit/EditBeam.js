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
//    var gimmicks = creater.currentStage.length;
    var distance = BOX_HALF+12;

    //currentStage[10][10]
    for(var x = 0; x < 10; x++){
      for(var y = 0; y < 10; y++){
        if(!creater.currentStage[x][y]){
        }
        else if(this.within(creater.currentStage[x][y], distance) && creater.currentStage[x][y] !== this.parentBlock){
          creater.currentStage[x][y].run();
          GAME.currentScene.removeChild(this);
        }
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
