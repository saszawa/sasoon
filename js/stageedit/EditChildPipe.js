var EditChildPipe = Class.create(Sprite,{
  initialize: function(color){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    this._element = document.createElement('div');
    this._element.className = 'pipeOut ';
    this.image = PIPE_COLORS[color].pipeOut;
    this.color = color;
    this.direction = "right";
    this.directionArrow = { up: null, right: null, left: null, down:null };

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
    //矢印を出現させ方向を決める
    this.directionArrow.up = new PipeDirectionArrow(LANGUAGE[COUNTRYCODE].pipeDirectionUpper,this.color);
    this.directionArrow.up.x = this.x;
    this.directionArrow.up.y = this.y - 15;
    this.directionArrow.up.direction = "up";
    GAME.currentScene.addChild(this.directionArrow.up);

    this.directionArrow.left = new PipeDirectionArrow(LANGUAGE[COUNTRYCODE].pipeDirectionLefter,this.color);
    this.directionArrow.left.x = this.x - 40;
    this.directionArrow.left.y = this.y + 20;
    this.directionArrow.left.direction = "left";
    GAME.currentScene.addChild(this.directionArrow.left);

    this.directionArrow.right = new PipeDirectionArrow(LANGUAGE[COUNTRYCODE].pipeDirectionRighter,this.color);
    this.directionArrow.right.x = this.x + 60;
    this.directionArrow.right.y = this.y + 20;
    this.directionArrow.right.direction = "right";
    GAME.currentScene.addChild(this.directionArrow.right);

    this.directionArrow.down = new PipeDirectionArrow(LANGUAGE[COUNTRYCODE].pipeDirectionDowner,this.color);
    this.directionArrow.down.x = this.x;
    this.directionArrow.down.y = this.y + 60;
    this.directionArrow.down.direction = "down";
    GAME.currentScene.addChild(this.directionArrow.down);
  }
});
