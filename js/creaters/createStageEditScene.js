function createStageEditScene(){
  var stageEditScene = new Scene();

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
//  var optionMenuButton = new Sprite(BOX_SIZE,BOX_SIZE);
//  optionMenuButton._element = document.createElement('div');
//  optionMenuButton._element.className = 'optionMenuButton';
//  optionMenuButton.x = 500;
//  optionMenuButton.y = 600; 
//  optionMenuButton.menuOpen = false;

  //パレットの作成  //
  //この辺グループかクラスにしたい
//  var pallet = new ExLabel();
  //選択用Blockを置いていく
  var blueInk = new BlockInk('blue');
  blueInk.x = 10;
  blueInk.y = 670;
  stageEditScene.addChild(blueInk);

  var redInk = new BlockInk('red');
  redInk.x = 90;
  redInk.y = 670;
  stageEditScene.addChild(redInk);

  var startInk = new BlockInk('start');
  startInk.x = 170;
  startInk.y = 670;
  stageEditScene.addChild(startInk);

  var slanterInk = new SlanterInk('green');
  slanterInk.x = 250;
  slanterInk.y = 670;
  stageEditScene.addChild(slanterInk);

  var diffusionerInk = new DiffusionerInk();
  diffusionerInk.x = 330;
  diffusionerInk.y = 670;
  stageEditScene.addChild(diffusionerInk);

  var pipeInk = new PipeInk('blue');
  pipeInk.x = 410;
  pipeInk.y = 670;
  //パイプは親置いたら子供置けるようにインク変えるのでその対応
  pipeManager.pipeInk = pipeInk;
  stageEditScene.addChild(pipeInk);

  var pipeColorButton = new PipeColorButton(LANGUAGE[COUNTRYCODE].pipeColorButton);
  pipeColorButton.x = 410;
  pipeColorButton.y = 750;
  stageEditScene.addChild(pipeColorButton);

  //送信ボタン
  var sendButton = new ExLabel(LANGUAGE[COUNTRYCODE].post);
  sendButton.on('touchend',function(){
    makeJSON(creater.stages);
  });
  sendButton.x = 510;
  sendButton.y = 700;
  stageEditScene.addChild(sendButton);

  //動きを確かめるボタン
  var testPlayButton = new TestPlayButton(LANGUAGE[COUNTRYCODE].testplay);
  testPlayButton.x = 600;
  testPlayButton.y = 700;
  stageEditScene.addChild(testPlayButton);

//  stageEditScene.addChild(optionMenuButton);

  return stageEditScene;
}
