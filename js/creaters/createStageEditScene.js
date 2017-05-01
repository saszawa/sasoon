function createStageEditScene(){

  // ローカルストレージからデータを取得
  userData = JSON.parse(localStorage.getItem("normal"));
  if(userData === null){
    userData = [];
  }
  var dataLength = userData.length;
  if(dataLength < 10){
    return;
  }

  var stageEditScene = new Scene();

  boxManager = new BoxManager();
  // ステージの初期化
  for(var i = 0; i < currentStage.length;i++){
    this.removeChild(currentStage[i]);
    delete currentStage[i];
  }

  // BOX構築
  for(var x = 0; x < 10; x++){
    for(var y = 0; y < 10; y++){
      var box = new EditBox(x,y);
      box.x = x*BOX_SIZE;
      box.y = y*BOX_SIZE;
      stageEditScene.addChild(box);
      boxManager.boxArray[x][y] = box;
    }
  }

  //クリエイターを生成
  // TODO 必須　シーンきりかえ時にメモリ解放する
  creater = new Creater('blue');
  //パイプマネージャー作成
  //TODO これも　シーンきりかえ時にメモリ解放しなければならない
  pipeManager = new PipeManager();

  createSurfaces();

  //パレット開閉スイッチ
  //インクを開閉式メニューに置く場合
//  var optionMenuButton = new Sprite(BOX_SIZE,BOX_SIZE);
//  optionMenuButton._element = document.createElement('div');
//  optionMenuButton._element.className = 'optionMenuButton';
//  optionMenuButton.x = 500;
//  optionMenuButton.y = 600; 
//  optionMenuButton.menuOpen = false;
  //

  //パレットの作成  //
  //この辺グループかクラスにしたい
//  var pallet = new ExLabel();
  //選択用Blockを置いていく
  //星の数を計算
  var starNum = 0;
  for(var i = 0; i < dataLength; i++){
    starNum = starNum + userData[i];
  }

  var blueInk = new BlockInk('blue');
  blueInk.x = 10;
  blueInk.y = 670;
  stageEditScene.addChild(blueInk);

  var redInk = new BlockInk('red');
  redInk.x = 90;
  redInk.y = 670;
  stageEditScene.addChild(redInk);

  var greenInk = new BlockInk('green');
  greenInk.x = 170;
  greenInk.y = 670;
  stageEditScene.addChild(greenInk);

  var orangeInk = new BlockInk('orange');
  orangeInk.x = 250;
  orangeInk.y = 670;
  orangeInk._element.className = "orange edit_lock";
  //ロック用ラベル 上にかぶせる
  var lockLabelOrange = new ExLabel("x30",64,64);
  lockLabelOrange.x = 250;
  lockLabelOrange.y = 670;
  lockLabelOrange.setClassName("edit_lock");
  stageEditScene.addChild(lockLabelOrange)

  var purpleInk = new BlockInk('purple');
  purpleInk.x = 330;
  purpleInk.y = 670;
  purpleInk._element.className = "purple edit_lock";
  
  //70個でオレンジ、紫解放
  if(starNum >= 70 ){
    orangeInk.isRelease = true;
    orangeInk._element.className = "orange";
    stageEditScene.removeChild(lockLabelOrange);
    purpleInk.isRelease = true;
    purpleInk._element.className = "purple";
  }
  stageEditScene.addChild(orangeInk);
  stageEditScene.addChild(purpleInk);

  var startInk = new BlockInk('start');
  startInk.x = 170;
  startInk.y = 750;
  stageEditScene.addChild(startInk);

  //星100個でスランター
  if(starNum >= 100){
    var slanterInk = new SlanterInk('green');
    slanterInk.x = 250;
    slanterInk.y = 750;
    stageEditScene.addChild(slanterInk);
  }

  //星120個で王将
  if(starNum >= 120 ){
    var diffusionerInk = new DiffusionerInk();
    diffusionerInk.x = 330;
    diffusionerInk.y = 750;
    stageEditScene.addChild(diffusionerInk);
  }

  //150でパイプ
  if(starNum >= 150){
    var pipeInk = new PipeInk('blue');
    pipeInk.x = 410;
    pipeInk.y = 670;
    //パイプは親置いたら子供置けるようにインク変えるのでその対応
    pipeManager.pipeInk = pipeInk;
    stageEditScene.addChild(pipeInk);
  }

  var goalInk = new GoalInk();
  goalInk.x = 10;
  goalInk.y = 750;
  stageEditScene.addChild(goalInk);

  var starInk = new StarInk();
  starInk.x = 90;
  starInk.y = 750;
  stageEditScene.addChild(starInk);

  //TODO 後ほど実装
//  var pipeColorButton = new PipeColorButton(LANGUAGE[COUNTRYCODE].pipeColorButton);
//  pipeColorButton.x = 410;
//  pipeColorButton.y = 750;
//  stageEditScene.addChild(pipeColorButton);

  //送信ボタン クラス化
  var sendButton = new SendButton(LANGUAGE[COUNTRYCODE].post,54,64);
  sendButton.x = 495;
  sendButton.y = 670;
  sendButton.setClassName('edit_button');
  stageEditScene.addChild(sendButton);

  //動きを確かめるボタン
  var testPlayButton = new TestPlayButton(LANGUAGE[COUNTRYCODE].testplay);
  testPlayButton.x = 567;
  testPlayButton.y = 670;
  testPlayButton.setClassName('edit_button');
  stageEditScene.addChild(testPlayButton);

  //戻すボタン
  var restoreButton = new RestoreButton(LANGUAGE[COUNTRYCODE].restore);
  restoreButton.x = 410;
  restoreButton.y = 750;
  restoreButton.setClassName('edit_button');
  stageEditScene.addChild(restoreButton);

  //消しゴムインクA
  var eraserInk = new EraserInk(LANGUAGE[COUNTRYCODE].eraser);
  eraserInk.x = 490;
  eraserInk.y = 750;
  eraserInk.width = 80;
  eraserInk.setClassName('edit_button');
  stageEditScene.addChild(eraserInk);

  //TOPに戻るボタン
  var backToTop = createBacktoTopLabel();
  backToTop.y = 820;
  stageEditScene.addChild(backToTop);
  backToTop.on('touchend',function(){
    var titleScene = createTitleScene();
    GAME.replaceScene(titleScene);
  });

  return stageEditScene;
}
