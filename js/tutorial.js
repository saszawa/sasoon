var TUTORIALBEAM = [];
//矢印管理用配列
var ARROWARRAY = [];

var tutoSecondScene = null;
var gameOverLabel = new ExLabel(LANGUAGE[COUNTRYCODE].gameOver,640,100);
gameOverLabel.setClassName('gameOverText');
gameOverLabel.x = 0;
gameOverLabel.y = -80;
gameOverLabel.tl.moveTo(0,230,30,BOUNCE_EASEOUT);

var thirdStartMsg = new ExLabel(LANGUAGE[COUNTRYCODE].tutoThirdStartMsg);
thirdStartMsg.x = 100;
thirdStartMsg.y = 160;
thirdStartMsg.setClassName('tuto_black_msg');

//チュートリアル用のBlockクラス
var TutoBlock = Class.create(Sprite,{
  initialize: function(color){
    Sprite.call(this,BOX_SIZE,BOX_SIZE); 

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;
    if(this.color == "start"){
      this.arccolor = "white";
    }else{
      this.arccolor = this.color;
    }
    //矢印出すかどうかフラグ
    this.arrowFlg = true;

    var specFix = (BEAM_SIZE - HIGH_SPECTRUM)/2;
    this.lastFlg = false;
    this.thirdLastFlg = false;

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

  /**
   * 	4方向にBeamを出します
   */
  run: function(){
    var tutoThirdScene = null;
    var arc = new HitArc(this.arccolor);
    arc.x = this.x-128;
    arc.y = this.y-128;
    this.parentNode.addChild(arc);
    var that = this;
    var i = 0;

    this.parentNode.removeChild(thirdStartMsg);

    for(var beam in this.beamStatus){
      if(TUTODIRECTIONS[this.color][i]){
        // 初期設定的な
        var beamInit = {
          x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
          y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
          color: this.color,
          parentBlock:this
        }
        var beam = new TutoBeam(this.beamStatus[beam],beamInit);
        this.parentNode.addChild(beam);
        TUTORIALBEAM.push(beam);
      }
      i++;
    }

    if(this.color == "start"){
      playSound('start');
    }else if(this.color == "blue"){
      playSound('blue');
    }else if (this.color == "white"){
      playSound('white');
    }

    //最後の場合
    if(this.lastFlg){
      var thatNode = this.parentNode;
      this.parentNode.tl.delay(70).then(function(){
        thatNode.addChild(gameOverLabel);
      });

      //メッセージラベル作成
      var loseMsg = createLoseMsg();

      //ゲームオーバの文字の後にメッセージ
      gameOverLabel.tl.delay(100).then(function(){
        //おくらせたい
        thatNode.removeChild(gameOverLabel);
        thatNode.addChild(loseMsg);
      });
      //文言をだしていく
      loseMsg.tl.delay(40).then(function(){
        loseMsg.x = 160;
        loseMsg._element.innerHTML = LANGUAGE[COUNTRYCODE].yourMission;
      });
      loseMsg.tl.delay(100).then(function(){
        loseMsg._element.innerHTML = LANGUAGE[COUNTRYCODE].letsWin;
      });

      tutoThirdScene = new Scene();
      var titleScene = createTitleScene();

      tutoThirdScene.backToTop = function(){
        GAME.replaceScene(titleScene);
      }

      var backToTop = createBacktoTopLabel();
      backToTop.on('touchend',function(){
        this.parentNode.backToTop();
        initTutorialScene();
      });
      tutoThirdScene.addChild(backToTop);

      //一回空に
      tutoCurrentStage = [];
      loseMsg.tl.delay(120).then(function(){
        var j = 0;
        TUTOSTAGES[1].forEach(function(blockInfo){
          var block = StageBuilder(blockInfo);
          block.x = blockInfo.x*BOX_SIZE;
          block.y = blockInfo.y*BOX_SIZE;
          if(j == 1){
            block.arrowFlg = false;
          }
          //ゴールオブジェクトだったとき
          if(blockInfo.name == "tutoGoal"){
            block.nextEndFlg = true;
          }
          tutoCurrentStage.push(block);
          tutoThirdScene.addChild(block);
          j++;
        });

        var pointerArrow = createPointerArrow();
        ARROWARRAY.push(pointerArrow);

        tutoThirdScene.addChild(pointerArrow);
        tutoThirdScene.addChild(thirdStartMsg);

        this.parentNode.removeChild(this);
        GAME.replaceScene(tutoThirdScene);
      });
    }
    //	出したら消滅
    this.parentNode.removeChild(this);
  }
});

var TutoGoal = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    this._element = document.createElement('div');
    this._element.className = 'goal';
    this.backgroundColor = '#F4D03F';
    this.color = "yellow";
    this.scaleX = 0.8;
    this.scaleY = 0.8;
    this.arrowFlg = true;
    //これがないとチュートリアルが無限ループしちゃう
    this.nextEndFlg = false;

    this.tl.scaleTo(0.6,0.6,30,CUBIC_EASEIN).scaleTo(0.8,0.8,30,CUBIC_EASEOUT).loop();
  },
  run: function(){
    this.tl.scaleTo(0.6,0.6,30,CUBIC_EASEIN).scaleTo(0.8,0.8,30,CUBIC_EASEOUT).unloop();
    var that = this;
    // this.parentNode.addChild(arc);
    if(tutoCurrentStage.length > 1){
      return;
    }
    //this.tl.scaleTo(30,30,0,30);
    clearTimeout(this.parentNode.endTimer);
    this.parentNode.cleared = true;

    playSound('goal');

    //どのシーンのゴールかで挙動変わる
    if(this.nextEndFlg){

      var endLabel = createEndLabel();
      GAME.currentScene.addChild(endLabel);

      //文字表示切り替え
      this.tl.clear().scaleTo(30,30,30).then(function(){

      }).delay(30).then(function(){
        endLabel.setClassName('tuto_black_msg');
        endLabel._element.innerHTML = LANGUAGE[COUNTRYCODE].tutoClearMsg2;
      }).delay(100).then(function(){
        endLabel._element.innerHTML = LANGUAGE[COUNTRYCODE].tutoClearMsg3;
      }).delay(40).then(function(){
      }).delay(100).then(function(){
        var titleScene = createTitleScene();
        that.parentNode.removeChild(this);
        GAME.replaceScene(titleScene);
        initTutorialScene();
      })

    }else{
      tutoSecondScene = null;
      var tutoClearMessage = null;
      var nextLosePatternLabel = null;
      //クリアメッセージを出す
      this.tl.clear().scaleTo(30,30,30).delay(30).then(function(){

        tutoClearMessage = new ExLabel(LANGUAGE[COUNTRYCODE].tutoClear);
        tutoClearMessage.x = 120;
        tutoClearMessage.y = 220;
        tutoClearMessage.width = 500;
        tutoClearMessage.height = 200;
        tutoClearMessage.setClassName('TutoMessaFirst');
        tutorialScene.addChild(tutoClearMessage);

        nextLosePatternLabel = new ExLabel(LANGUAGE[COUNTRYCODE].nextLosePattern);
        nextLosePatternLabel .x = 120;
        nextLosePatternLabel.y = 220;
        nextLosePatternLabel.width = 500;
        nextLosePatternLabel.height = 200;
        nextLosePatternLabel.setClassName('TutoMessaFirst');

        that.tl.delay(60).then(function(){
          tutorialScene.removeChild(tutoClearMessage);
          tutorialScene.addChild(nextLosePatternLabel);
        })

        //        tutoSecondScene = createTutorialSecondScene();
        // kokokaraセカンドシーン作成
        tutoSecondScene = new Scene();

        var titleScene = createTitleScene();

        //戻るボタン
        var backToTop = createBacktoTopLabel();

        tutoSecondScene.backToTop = function(){
          GAME.replaceScene(titleScene);
        }
        tutoSecondScene.addChild(backToTop);

        // /*=== ステージの読み込み ===*/
        //終わりフラグ用の変数
        var i = 0;
        tutoCurrentStage = [];
        TUTOSTAGES[1].forEach(function(blockInfo){
          var block = StageBuilder(blockInfo);
          block.x = blockInfo.x*BOX_SIZE;
          block.y = blockInfo.y*BOX_SIZE;
          if(i == TUTOSTAGES[1].length - 2){
            block.lastFlg = true;
          }
          tutoSecondScene.addChild(block);
          tutoCurrentStage.push(block);

          i++;
        });

        var losePatternText = createLosePatternText();
        tutoSecondScene.addChild(losePatternText);
        tutoSecondScene.loseAotamaFlg = true;

        backToTop.on('touchend',function(){
          tutoSecondScene.backToTop();
          initTutorialScene();
        });

        that.tl.delay(100).then(function(){

          tutorialScene.removeChild(that);
          GAME.replaceScene(tutoSecondScene);
          losePatternText.tl.delay(100).then(function(){
            tutoCurrentStage[0].run();
            tutoCurrentStage.splice(0,1);
            tutoSecondScene.removeChild(losePatternText);
          });
        });
      });
    }
  }
});

//チュートリアル専用の拡張クラス
var TutoBeam = Class.create(Sprite,{
  initialize: function(direction ,init){
    Sprite.call(this,BEAM_SIZE,BEAM_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'beam';

    // 初期状態
    this.backgroundColor = '#F4D03F';
    this.direction = direction;
    this.initX = init.x;
    this.initY = init.y;
    this.x = init.x;
    this.y = init.y;
    this.color = init.color;
    //動くフラグ
    this.moveFlg = true;
    //矢印作ったフラグ
    this.makeArrowFlg = false;
    this.aotamaFlg = true;

    this.tutoCurrentStage = tutoCurrentStage;
    this.parentBlock = init.parentBlock;

    this.beamLength = BEAM_LENGTH*BOX_SIZE; //- (BOX_SIZE-BEAM_SIZE)/2;

    this.COLORS = COLORS;

  },
  onenterframe: function(){
    // 衝突検知
    // やっぱこうなるの・・・
    var gimmicks = this.tutoCurrentStage.length;
    thatCurrentStage = this.tutoCurrentStage;
    for(var i = 0; i < thatCurrentStage.length; i++){

      if ( (this.within(this.tutoCurrentStage[i], this.tutoCurrentStage[i].width - 13)) && (this.tutoCurrentStage[i] !== this.parentBlock) ){
        var thatBlock = this.tutoCurrentStage[i];
        var thatI = i;

        if(!this.makeArrowFlg ){
          if(thatBlock.arrowFlg){
            var that = this;
            this.moveFlg = false;

            var pointerArrow2 = createPointerArrow2(that.x,that.y);
            this.parentNode.addChild(pointerArrow2);

            //ゴール当たる手前のとき
            if(this.parentNode.aotamaEndFlg){
              var prevGoalLabel = createPrevGoalLabel();
              this.parentNode.addChild(prevGoalLabel);
              //負けパターンのとき
            }else if(this.parentNode.loseAotamaFlg){
              var endChainLabel = createEndChainLabel();
              this.parentNode.addChild(endChainLabel);
              this.parentNode.endChainEndFlg = true;
            }
            //最初のとき
            else{
              var aotamaLabel = createAotamaLabel();
              this.parentNode.addChild(aotamaLabel);
              this.parentNode.aotamaEndFlg = true;
            }

            pointerArrow2.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT);
            pointerArrow2.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT);
            //ピョンピョン　＋　ストップ
            pointerArrow2.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT).then(function(){
              this.parentNode.removeChild(endChainLabel);
              this.parentNode.removeChild(prevGoalLabel);
              this.parentNode.removeChild(aotamaLabel);
              this.parentNode.removeChild(pointerArrow2);
              that.parentNode.removeChild(that);
              thatBlock.run();
              this.moveFlg = true;
              that.tutoCurrentStage.splice(thatI ,1);
            });
            this.makeArrowFlg = true;
          }else{
            this.parentNode.removeChild(that);
            thatBlock.run();
            this.tutoCurrentStage.splice(i ,1);
          }
        }
      }
    }

    if(this.moveFlg){
      // Beamの移動と生存期間
      if(Math.abs(this.initX-this.x) < this.beamLength 
         &&  Math.abs(this.initY-this.y) < this.beamLength){
           this.x += this.direction.moveX;
           this.y += this.direction.moveY;
         } else {
           // 生存期間を過ぎると消えていく
           this.opacity -= 0.1;
           if(this.opacity < 0){
             this.parentNode.removeChild(this);
           }
         }
    }
  }
});

var TutoBox = Class.create(Sprite,{
  initialize: function(scene){
    Sprite.call(this,BOX_SIZE,BOX_SIZE); 
    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'box';
    this.scene = scene;
  },
  ontouchend: function(){
    var block = new Block('white');
    block.x = this.x;
    block.y = this.y;
    tutoCurrentStage.push(block);
    this.scene.addChild(block);
  }
});

var PointerArrow = Class.create(Sprite,{
  initialize: function(scene){
    Sprite.call(this); 
  },
  erase: function(){
    this.parentNode.removeChild(this);
  },
  ontouchend: function(){
    var block = new TutoBlock('white');
    block.x = 448;
    block.y = 256;
    tutoCurrentStage.push(block);
    this.scene.addChild(block);

    //ゴール時に説明文でないように
    tutoCurrentStage[2].arrowFlg = false;
    //しろたまに当たって説明文でないように
    tutoCurrentStage[3].arrowFlg = false;
    tutoCurrentStage[0].run();
    tutoCurrentStage.splice(0,1);
    ARROWARRAY[0].erase();
    ARROWARRAY.splice(0,1);
  }
});
