function createSelectScene(){

  //==========================================================
  // select
  //==========================================================
  var selectScene = new Scene();
  USER_STAGES = getUserStageList();
  var stageGroup;                      // ステージ一覧のグループ
  var userStageGroup;                  // ユーザー投稿のステージ一覧のグループ
  var visibleStageGroup;               // スクロールさせるステージ
  var isMoving = false;

  // スクロールの処理
  selectScene.on('touchstart',function(e){
    if(isMoving){ return false; }
    selectScene.startY = e.y;
  });
  selectScene.on('touchmove',function(e){
    if(isMoving){ return false; }
    visibleStageGroup.moveBy(visibleStageGroup.x,e.y - selectScene.startY);
    selectScene.startY = e.y;
  });
  selectScene.on('touchend',function(e){
    if(isMoving){ return false; }
    var bottomMax = Math.floor(visibleStageGroup.childNodes.length/4) * -160 + 320;
    if(visibleStageGroup.y !== bottomMax && visibleStageGroup.y > 0){
      visibleStageGroup.tl.moveTo(visibleStageGroup.x,0,10,SIN_EASEOUT);
    }else if(visibleStageGroup.y !== 0 && bottomMax > visibleStageGroup.y){
      visibleStageGroup.tl.moveTo(visibleStageGroup.x,bottomMax,10,SIN_EASEOUT);
    }
  });

  // STAGE SELECT LABEL
  var selectLabel = new ExLabel('STAGE SELECT',640,110);
  selectLabel.setClassName('stageSelectText');
  selectScene.addChild(selectLabel);

  // ステージの切り替え、イベントを拾う
  var stageSwitcher = createStageSwitcherGroup();
  stageSwitcher.y = 110;
  stageSwitcher.addEventListener('normalStageSelected',function(e){
    // ステージのスライド
    isMoving = true;
    stageGroup.tl.moveTo(0,stageGroup.y,10);
    userStageGroup.tl.moveTo(640,userStageGroup.y,10).then(function(){ isMoving = false;});
    visibleStageGroup = stageGroup;
  });

  stageSwitcher.addEventListener('userStageSelected',function(e){
    // ステージのスライド
    isMoving = true;
    stageGroup.tl.moveTo(-640,stageGroup.y,10).then(function(){ isMoving = false;});
    userStageGroup.tl.moveTo(0,userStageGroup.y,10);
    visibleStageGroup = userStageGroup;
  });
  selectScene.addChild(stageSwitcher);


  // ローカルストレージからデータを取得
  userData = JSON.parse(localStorage.getItem("normal"));
  if(userData === null){
    userData = [];
  }

  // 通常ステージ
  stageGroup = new StageGroup();
  selectScene.addChild(stageGroup);

  userStageGroup = new Group();
  userStageGroup._element = document.createElement('div');
  selectScene.addChild(userStageGroup);

  selectScene.on('enter',function(e){
    // ローカルストレージからデータを取得
    userData = JSON.parse(localStorage.getItem("normal"));
    if(userData === null){
      userData = [];
    }

    // ステージ選択肢の作成
    var row = 1.5;
    var column = 0;
    for(var i = 0,x=0,y=2.5 ;i < STAGES.length ;i++){

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
    // ユーザーステージ
    // ローカルストレージからデータを取得
    userDataEdit = JSON.parse(localStorage.getItem("user"));
    if(userDataEdit === null){
      userDataEdit = {};
    }


    var row = 1.5;
    var column = 0;
    var i = 0,x=0,y=2.5
    for(var id in USER_STAGES){
      var star = 0;

      if(typeof userDataEdit[id] === 'undefined'){
        star = 0;
      } else {
        star = userDataEdit[id];
      }

      var userStageBox = new UserStageBox(id,star,USER_STAGES[id][0]);
      userStageBox._element.className = 'userStageBox';
      userStageBox.x = BOX_SIZE/4+x*BOX_SIZE*2.5;
      userStageBox.y = y*BOX_SIZE*1.25;
      userStageGroup.addChild(userStageBox);
      x++;
      if(x===4){x = 0;}
      if(i%4 === 3){y += 2;}

      column = x;
      row = y;
    }

    if(visibleStageGroup === userStageGroup){
      stageGroup.moveTo(-640,0);
    }else{
      // ユーザーステージの移動
      userStageGroup.moveTo(640,userStageGroup.y);
      visibleStageGroup = stageGroup;
    }
  });


  selectScene.selectedStage = function(level,mode){
    LEVEL = level;
    STAGE_ID = level;
    GAME.replaceScene(stageScene);
    stageScene.initStage(mode);
  }


  selectScene.initSelect = function(){
    var stageBoxesLen = stageBoxes.length;
    for(var i = 0; i < stageBoxesLen;i++){
      stageGroup.removeChild(stageBoxes[i]);
    }
    stageBoxes = [];
  }

  //stageScene作成
  var stageScene = createStageScene();
  stageScene.stageSelect = function(){
    selectScene.initSelect();
    GAME.replaceScene(selectScene);
  }

  stageScene.retryLabel = createRetryLabelOnGame();
  stageScene.retryLabel.on('touchstart',function(){
    clearTimeout(stageScene.endTimer);
    selectScene.selectedStage(LEVEL);
  });
  return selectScene;
}
