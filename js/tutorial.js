var TUTORIALBEAM = [];
//矢印管理用配列
var ARROWARRAY = [];

//チュートリアル用のBlockクラス
var TutoBlock = Class.create(Sprite,{
	initialize: function(color){
		Sprite.call(this,BOX_SIZE,BOX_SIZE); 

		// DOMモード
		this._element = document.createElement('div');
		this._element.className = color;

		this.color = color;
		//矢印出すかどうかフラグ
		this.arrowFlg = true;

		var specFix = (BEAM_SIZE - HIGH_SPECTRUM)/2;
		this.lastFlg = false;

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
	* Block.run()
	* 	4方向にBeamを出します
	*/
	run: function(){
		var tutoThirdScene = null;
		var arc = new HitArc(this.color);
		arc.x = this.x-128;
		arc.y = this.y-128;
		this.parentNode.addChild(arc);
		var that = this;
		var i = 0;
		for(var beam in this.beamStatus){
			if(DIRECTIONS[this.color][i]){
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
		//最後の場合
		if(this.lastFlg){
			//メッセージラベル作成
			var loseMsg = new Label();
			loseMsg.text = LANGUAGE[COUNTRYCODE].loseMsg;
			loseMsg.x = 200;		
			loseMsg.y = 200;
			loseMsg.tl.delay(100).then(function(){
				//おくらせたい
				that.parentNode.addChild(loseMsg);
			});
			loseMsg.tl.delay(40).then(function(){
				loseMsg.text =  LANGUAGE[COUNTRYCODE].yourMission;
			});
			loseMsg.tl.delay(60).then(function(){
				loseMsg.text = LANGUAGE[COUNTRYCODE].letsWin;
			});
			tutoThirdScene = new Scene();
			//次のシーン作成
			// ============= BOX構築 =============== //
			for(var x = 0; x < 10; x++){
				for(var y = 0; y < 10; y++){
					var box = new TutoBox(tutoThirdScene);
					box.x = x*BOX_SIZE;
					box.y = y*BOX_SIZE;
					tutoThirdScene.addChild(box); 
				}
			}

			//一回空に
			currentStage = [];
			loseMsg.tl.delay(80).then(function(){
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
					currentStage.push(block);
					tutoThirdScene.addChild(block);
					j++;
				});
				var thirdStartMsg = new Label();
				thirdStartMsg.text = LANGUAGE[COUNTRYCODE].tutoThirdStartMsg;
				thirdStartMsg.x = 180;
				thirdStartMsg.y = 200;

				var pointerArrow = new PointerArrow();
				pointerArrow.x = 428;
				pointerArrow.y = 276;
				pointerArrow._element = document.createElement('div');
				pointerArrow._element.className  = 'pointerArrow';
				pointerArrow.width = 30;
				pointerArrow.rotate(300);
				pointerArrow.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT).loop();
				ARROWARRAY.push(pointerArrow);

				tutoThirdScene.addChild(pointerArrow);
				tutoThirdScene.addChild(thirdStartMsg);
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
		var that = this;
		var arc = new HitArc(this.color);
		arc.x = this.x-128;
		arc.y = this.y-128;
		this.parentNode.addChild(arc);
		if(currentStage.length > 1){
			return;
		}

		this.tl.scaleTo(0.6,0.6,30,CUBIC_EASEIN).scaleTo(0.8,0.8,30,CUBIC_EASEOUT).unloop();

		//終わるときか最初のときかで変わる
		if(this.nextEndFlg){
			var stageScene = new Scene();
			stageScene.star = 0;
			stageScene.stars = [];
			stageScene.canTap = true;
			stageScene.endTimer = null;

			// // ステージの初期化
			// currentStage.forEach(function(gimmick){
			// 	that.removeChild(gimmick);
			// });
			// currentStage = [];


			// タイマーのセット
			var timer = new Timer();
			stageScene.addChild(timer);

			// ステージの読み込み
			STAGES[LEVEL].forEach(function(blockInfo){
				var block = StageBuilder(blockInfo);
				block.x = blockInfo.x*BOX_SIZE;
				block.y = blockInfo.y*BOX_SIZE;
				currentStage.push(block);
				stageScene.addChild(block);
			});

			var endLabel = new ExLabel(LANGUAGE[COUNTRYCODE].title);
			endLabel.y = 150;
			
			GAME.currentScene.addChild(endLabel);
			this.tl.delay(10).then(function(){
				GAME.replaceScene(stageScene);
			})

		}else{
			this.tl.delay(1).then(function(){
				this.x = 120;
				this.y = 220;
				this.width = 500;
				this.height = 400;
				this._element.className = "TutoMessaFirst";
				that._element.innerHTML = LANGUAGE[COUNTRYCODE].tutoClear;
			});

			var tutoSecondScene = null;
			this.tl.delay(100).then(function(){
				that._element.innerHTML = LANGUAGE[COUNTRYCODE].nextLosePattern;
				currentStage.splice(0,1);
				tutoSecondScene = new Scene();
				// /*=== ステージの読み込み ===*/
				//終わりフラグ用の変数
				var i = 0;
				TUTOSTAGES[1].forEach(function(blockInfo){
					var block = StageBuilder(blockInfo);
					block.x = blockInfo.x*BOX_SIZE;
					block.y = blockInfo.y*BOX_SIZE;
					if(i == TUTOSTAGES[1].length - 2){
						block.lastFlg = true;
					}
					currentStage.push(block);

					tutoSecondScene.addChild(block);
					i++;
				});

				var losePatternText = new ExLabel(LANGUAGE[COUNTRYCODE].losePattern);
				losePatternText.x = 180;
				losePatternText.y = 200;
				losePatternText.setClassName("msg");
				tutoSecondScene.addChild(losePatternText);
				tutoSecondScene.loseAotamaFlg = true;

				that.tl.delay(100).then(function(){
					GAME.replaceScene(tutoSecondScene);
					losePatternText.tl.delay(100).then(function(){
						currentStage[0].run()
						currentStage.splice(0,1);
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
		this.backgroundColor = 'white';
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

		this.currentStage = currentStage;
		this.parentBlock = init.parentBlock;

		this.beamLength = BEAM_LENGTH*BOX_SIZE; //- (BOX_SIZE-BEAM_SIZE)/2;

		this.COLORS = COLORS;

	},
	onenterframe: function(){
		// 衝突検知
		// やっぱこうなるの・・・
		var gimmicks = this.currentStage.length;
		thatCurrentStage = this.currentStage;
		for(var i = 0; i < thatCurrentStage.length; i++){
				
			if ( (this.within(this.currentStage[i], this.currentStage[i].width - 13)) && (this.currentStage[i] !== this.parentBlock) ){
				var thatBlock = this.currentStage[i];
				var thatI = i;

				if(!this.makeArrowFlg ){
					if(thatBlock.arrowFlg){
						var that = this;
						this.moveFlg = false;

						var pointerArrow2 = new Sprite();
						pointerArrow2.x = that.x - 30;
						pointerArrow2.y = that.y + 30;
						pointerArrow2._element = document.createElement('div');
						pointerArrow2._element.className  = 'pointerArrow';
						pointerArrow2.width = 30;
						pointerArrow2.rotate(300);
						this.parentNode.addChild(pointerArrow2);

						if(this.parentNode.aotamaEndFlg){
							var prevGoalLabel = new ExLabel(LANGUAGE[COUNTRYCODE].prevGoal);
							prevGoalLabel.setClassName('tuto_siro_msg');
							prevGoalLabel.x = 120;
							prevGoalLabel.y = 170;
							this.parentNode.addChild(prevGoalLabel);
						}else if(this.parentNode.loseAotamaFlg){
							var endChainLabel = new ExLabel(LANGUAGE[COUNTRYCODE].endChain);
							endChainLabel.setClassName('tuto_aotama_msg');
							endChainLabel.x = 110;
							endChainLabel.y = 170;
							this.parentNode.addChild(endChainLabel);
							this.parentNode.endChainEndFlg = true;							
						}
						else{
							var aotamaLabel = new ExLabel(LANGUAGE[COUNTRYCODE].aotama);
							aotamaLabel.setClassName('tuto_aotama_msg');
							aotamaLabel.x = 110;
							aotamaLabel.y = 170;
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
							// return;
							that.parentNode.removeChild(that);
							thatBlock.run();
							this.moveFlg = true;
							that.currentStage.splice(thatI ,1);
						});
						this.makeArrowFlg = true;
					}else{
						this.parentNode.removeChild(that);
						thatBlock.run();
						this.currentStage.splice(i ,1);
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
		currentStage.push(block);
		this.scene.addChild(block);
		if(this.x == 448 && this.y == 256 ){
			currentStage[0].run();
			currentStage.splice(0,1);
			ARROWARRAY[0].erase();
			ARROWARRAY.splice(0,1);
		}
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
		var block = new Block('white');
		block.x = 448;
		block.y = 256;
		currentStage.push(block);
		this.scene.addChild(block);
		currentStage[0].run();
		currentStage.splice(0,1);
		ARROWARRAY[0].erase();
		ARROWARRAY.splice(0,1);
	}
});
