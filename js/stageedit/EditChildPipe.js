var EditChildPipe = Class.create(Sprite,{
  initialize: function(color){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    this._element = document.createElement('div');
    this._element.className = 'pipeOut ';
    this.image = PIPE_COLORS[color].pipeOut;
    this.color = color;
    this.direction = "right";
    this.directionArrow = { up: null, right: null, left: null, down:null };

    this.xId = -1;
    this.yId = -1;
    this.restoreFlg = false;

    // Beam用ステータス
    this.beamStatus = {
      up:{
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
  onaddedtoscene: function(){
    //戻すボタンで作られた時をのぞく
    if(!this.restoreFlg){
      //矢印を出現させ方向を決める
      //LANGUAGE[COUNTRYCODE].pipeDirectionUpper
      //LANGUAGE[COUNTRYCODE].pipeDirectionLefter
      //LANGUAGE[COUNTRYCODE].pipeDirectionRighter
      //LANGUAGE[COUNTRYCODE].pipeDirectionDowner
      this.directionArrow.up = new PipeDirectionArrow("",this.color);
      this.directionArrow.up.x = this.x + 20;
      this.directionArrow.up.y = this.y - 30 ;
      this.directionArrow.up.direction = "up";
      this.directionArrow.up.setClassName("icon-arrow-up edit_direction_arrow");
      GAME.currentScene.addChild(this.directionArrow.up);

      this.directionArrow.left = new PipeDirectionArrow("",this.color);
      this.directionArrow.left.x = this.x - 26;
      this.directionArrow.left.y = this.y + 15;
      this.directionArrow.left.direction = "left";
      this.directionArrow.left.setClassName("icon-arrow-left edit_direction_arrow");
      GAME.currentScene.addChild(this.directionArrow.left);

      this.directionArrow.right = new PipeDirectionArrow("",this.color);
      this.directionArrow.right.x = this.x + 65;
      this.directionArrow.right.y = this.y + 15;
      this.directionArrow.right.direction = "right";
      this.directionArrow.right.setClassName("icon-arrow-right edit_direction_arrow");
      GAME.currentScene.addChild(this.directionArrow.right);

      this.directionArrow.down = new PipeDirectionArrow("",this.color);
      this.directionArrow.down.x = this.x + 20;
      this.directionArrow.down.y = this.y + 60;
      this.directionArrow.down.direction = "down";
      this.directionArrow.down.setClassName("icon-arrow-down edit_direction_arrow");
      GAME.currentScene.addChild(this.directionArrow.down);
    }
  },
  ontouchstart: function(){
    //currentScene
    //Stages
    //pipeStatus
    //消しゴム
    if(creater.penColor == "eraser"){
      var color = this.color;
      creater.stages[this.xId][this.yId] = null;
      //これ
      pipeManager.pipeEntity[color].child.x = null;
      pipeManager.pipeEntity[color].child.y = null;
      pipeManager.pipeEntity[color].child.direction = null;
      pipeManager.pipeStatus[color] = "parentPut";
      pipeManager.childPipe[color] = null;

      boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
      //インクを子に戻す
      GAME.currentScene.removeChild(pipeManager.pipeInk);
      pipeManager.pipeInk = void 0;
      pipeManager.pipeInk = new ChildPipeInk(this.color);
      GAME.currentScene.removeChild(this);
      GAME.currentScene.addChild(pipeManager.pipeInk);
    }
  }
});
