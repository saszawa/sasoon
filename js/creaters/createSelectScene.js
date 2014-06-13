function createSelectScene(){

  //==========================================================
  // select
  //==========================================================
  //
  var selectScene = new Scene();
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
			for(var i = 0,x=0,y=1.5 ;i < STAGES.length ;i++){

				var star = 0;
				var isLock = true;
				var className = 'stageBox lock';
				if(userData.length > i){
					star = userData[i];
					className ='stageBox';
					isLock = false;
				}else if(userData.length === i){
					className ='stageBox nextStage';
					isLock = false;
				}

				var stageBox = new StageBox(i,star,isLock);
				stageBox._element.className = className;
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

    var selectLabel = new ExLabel('STAGE SELECT',640,110);
    selectLabel.setClassName('stageSelectText');
    selectScene.addChild(selectLabel);
  });

  //stageScene作成
  var stageScene = createStageScene();
  stageScene.stageSelect = function(){
    var stageBoxesLen = stageBoxes.length;
    for(var i = 0; i < stageBoxesLen;i++){
      stageGroup.removeChild(stageBoxes[i]);
    }
    stageBoxes = [];
    GAME.replaceScene(selectScene);
  }

  selectScene.selectedStage = function(level){
    LEVEL = level;
    GAME.replaceScene(stageScene);
    stageScene.initStage();
  }

  return selectScene;
}
