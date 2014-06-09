enchant();
window.onload = function () {
	GAME = new Game(640, 640);
	GAME.fps = 30;
	GAME.onload = function () {

		GAME.rootScene.backgroundColor = 'white';
		//==========================================================
		// setting
		//==========================================================

		// 星のサーフェス作成
		// STAR自体はグローバル変数にしておく

		WHITE_STAR = new Surface(BOX_SIZE,BOX_SIZE);
		var ctxW = WHITE_STAR.context;
		ctxW.beginPath();
		ctxW.fillStyle = COLORS.white;
		ctxW.strokeStyle = COLORS.yellow;
		ctxW.lineWidth = 2;
		drawStar(BOX_SIZE/2,BOX_SIZE/2,5,BOX_SIZE/2,BOX_SIZE/3,ctxW);
		ctxW.closePath();
		ctxW.fill();
		ctxW.stroke();

		YELLOW_STAR = new Surface(BOX_SIZE,BOX_SIZE);
		var ctxY = YELLOW_STAR.context;
		ctxY.beginPath();
		ctxY.fillStyle = COLORS.yellow;
		drawStar(BOX_SIZE/2,BOX_SIZE/2,5,BOX_SIZE/2,BOX_SIZE/3,ctxY);
		ctxY.closePath();
		ctxY.fill();

		// 獲得数の星
		SCORE_STARS[0] = new Surface(BOX_SIZE*2,BOX_SIZE*2);

		SCORE_STARS[1] = new Surface(BOX_SIZE*2,BOX_SIZE*2);
		var ctxS = SCORE_STARS[1].context;
		ctxS.beginPath();
		ctxS.fillStyle = COLORS.yellow;
		ctxS.strokeStyle = COLORS.white;
		ctxS.lineWidth = 3;
		drawStar(BOX_SIZE,BOX_SIZE*1.6,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxS);
		ctxS.closePath();
		ctxS.fill();
		ctxS.stroke();


		SCORE_STARS[2] = new Surface(BOX_SIZE*2,BOX_SIZE*2);
		var ctxD = SCORE_STARS[2].context;
		ctxD.fillStyle = COLORS.yellow;
		ctxD.strokeStyle = COLORS.white;
		ctxD.lineWidth = 3;

		ctxD.beginPath();
		drawStar(BOX_SIZE*0.5,BOX_SIZE*1.5,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxD);
		ctxD.fill();
		ctxD.stroke();
		ctxD.closePath();

		ctxD.beginPath();
		drawStar(BOX_SIZE*1.5,BOX_SIZE*1.5,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxD);
		ctxD.fill();
		ctxD.stroke();
		ctxD.closePath();


		SCORE_STARS[3] = new Surface(BOX_SIZE*2,BOX_SIZE*2);
		var ctxT = SCORE_STARS[3].context;
		ctxT.fillStyle = COLORS.yellow;
		ctxT.strokeStyle = COLORS.white;
		ctxT.lineWidth = 3;

		ctxT.beginPath();
		drawStar(BOX_SIZE*1.5,BOX_SIZE*1.6,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxT);
		ctxT.fill();
		ctxT.stroke();
		ctxT.closePath();

		ctxT.beginPath();
		drawStar(BOX_SIZE*0.5,BOX_SIZE*1.6,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxT);
		ctxT.fill();
		ctxT.stroke();
		ctxT.closePath();

		ctxT.beginPath();
		drawStar(BOX_SIZE,BOX_SIZE*1.5,5,BOX_SIZE/2,BOX_SIZE/3,ctxT);
		ctxT.fill();
		ctxT.stroke();
		ctxT.closePath();


		// ディフュージョナー
		DIFFUSIONER = new Surface(BOX_SIZE,BOX_SIZE);
		var ctxDf = DIFFUSIONER.context;
		ctxDf.fillStyle = COLORS.red;
		ctxDf.strokeStyle = COLORS.yellow;
		ctxDf.lineWidth = 3;
		ctxDf.beginPath();
		drawStar(BOX_SIZE/2,BOX_SIZE/2,8,BOX_SIZE/2,BOX_SIZE/3,ctxDf);
		ctxDf.fill();
		ctxDf.stroke();
		ctxDf.closePath();

		// スランター
		SLANTER = new Surface(BOX_SIZE,BOX_SIZE);
		var ctxSl = SLANTER.context;
		ctxSl.fillStyle = COLORS.green;
		ctxSl.strokeStyle = COLORS.yellow;
		ctxSl.lineWidth = 3;
		ctxSl.beginPath();
		drawStar(BOX_SIZE/2,BOX_SIZE/2,4,BOX_SIZE/2,BOX_SIZE/4,ctxSl);
		ctxSl.fill();
		ctxSl.stroke();
		ctxSl.closePath();


		//==========================================================
		// title
		//==========================================================
		var titleScene = new Scene();
		titleScene.on('touchend',function(){
			titleScene.addChild(gameStartLabel);
			titleScene.addChild(tutorialLabel);
		});
		var titleLabel = new ExLabel('たいとる');
		titleLabel.setClassName('titleText');
		titleLabel.y = 150;
		titleScene.addChild(titleLabel);

		var gameStartLabel = new ExLabel('ゲーム開始',320,60);
		gameStartLabel.setClassName('gameStart');
		gameStartLabel.x = 160;
		gameStartLabel.y = 360;
		gameStartLabel.on('touchend',function(){
			GAME.replaceScene(selectScene);
		});


		var tutorialLabel  = new ExLabel('遊び方',320,60);
		tutorialLabel.setClassName('tutorial');
		tutorialLabel.x = 160;
		tutorialLabel.y = 440;


		// var deleteLabel = new ExLabel('セーブデータの削除',480,60);
		// deleteLabel.setClassName('delete');
		// deleteLabel.x = 80;
		// deleteLabel.y = 480;
		// titleScene.addChild(deleteLabel);

		//==========================================================
		// select
		//==========================================================
		var selectScene = new Scene();
		var stageGroup;
		var stageBoxes = [];
		var userData;
		selectScene.on('touchstart',function(e){
			selectScene.startY = e.y;
		});
		selectScene.on('touchmove',function(e){
			stageGroup.moveBy(0,e.y - selectScene.startY);
			selectScene.startY = e.y;
		});
		selectScene.on('touchend',function(e){
			if(stageGroup.y > 0){
				stageGroup.tl.moveTo(0,0,10,SIN_EASEOUT);
			}
		});

		selectScene.on('enter',function(e){
			stageGroup = new StageGroup();
			selectScene.addChild(stageGroup);

			// ローカルストレージからデータを取得
			userData = JSON.parse(localStorage.getItem("hal"));
			if(userData === null){
				userData = [];
			}

			var row = 1.5;
			var column = 0
			for(var i = 0,x=0,y=1.5 ;i < userData.length ;i++){

				var stageBox = new StageBox(i,userData[i]);
				stageBox.x = BOX_SIZE/4+x*BOX_SIZE*2.5;
				stageBox.y = y*BOX_SIZE*1.25;
				stageGroup.addChild(stageBox);
				stageBoxes.push(stageBox);

				x++;
				if(x===4){x = 0;}
				if(i%4 === 3){y += 2;}

				column = x;
				row = y;

			}

			//次のステージを表示する
			var nextBox = new StageBox(userData.length,0);
			nextBox._element.className = 'stageBox last';
			nextBox.x = BOX_SIZE/4+column*BOX_SIZE*2.5;
			nextBox.y = row*BOX_SIZE*1.25;
			stageGroup.addChild(nextBox);
			stageBoxes.push(nextBox);

			var selectLabel = new ExLabel('STAGE SELECT',640,110);
			selectLabel.setClassName('stageSelectText');
			selectScene.addChild(selectLabel);
		});

		selectScene.selectedStage = function(level){
			LEVEL = level;
			GAME.replaceScene(stageScene);
			stageScene.initStage();
		}

		//==========================================================
		//	stage
		//==========================================================
		var stageScene = new Scene();
		stageScene.initStage = function(){
			var that = this;
			this.star = 0;
			this.stars = [];
			this.canTap = true;
			this.endTimer = null;

			// ステージの初期化
			currentStage.forEach(function(gimmick){
				that.removeChild(gimmick);
			});
			currentStage = [];


			// タイマーのセット
			var timer = new Timer();
			stageScene.addChild(timer);

			// ステージの読み込み
			STAGES[LEVEL].forEach(function(blockInfo){
				var block = StageBuilder(blockInfo);
				block.x = blockInfo.x*BOX_SIZE;
				block.y = blockInfo.y*BOX_SIZE;
				currentStage.push(block);
				that.addChild(block);
			});

		}
		stageScene.showResult = function(){
			var ResultGroup = new Result();
			this.addChild(ResultGroup);
			clearTimeout(this.endTimer);

			//データの保存
			userData[LEVEL] = this.star;
			localStorage.setItem("hal", JSON.stringify(userData));

		}
		stageScene.gameOver = function(){
			var GameOverGroup = new GameOver();
			this.addChild(GameOverGroup);
		}
		stageScene.stageSelect = function(){
			var stageBoxesLen = stageBoxes.length;
			for(var i = 0; i < stageBoxesLen;i++){
				stageGroup.removeChild(stageBoxes[i]);
			}
			stageBoxes = [];
			GAME.replaceScene(selectScene);

		}

		// BOX構築
		for(var x = 0; x < 10; x++){
			for(var y = 0; y < 10; y++){
				var box = new Box(stageScene);
				box.x = x*BOX_SIZE;
				box.y = y*BOX_SIZE;
				stageScene.addChild(box);
			}
		}

		// ステージ構築の補助
		function　StageBuilder(gimmick){

			switch(gimmick.name){
				case 'block':
					return new Block(gimmick.color);
				case 'start':
					return new Start();
				case 'goal' :
					stageScene.goal = new Goal();
					return stageScene.goal;
				case 'star':
					return new Star();
				case 'count':
					return new CountBlock(gimmick.color,gimmick.count);
				case 'diffusioner':
					return new Diffusioner();
				case 'slanter':
					return new Slanter();
				case 'linker':
					return new Linker(gimmick.color);
			}

		};

		GAME.pushScene(titleScene);
	};
	GAME.start();
}
