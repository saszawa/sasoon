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
  //必須　シーンきりかえ時にメモリ解放する
  creater = new Creater('blue');

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
  blueInk.x = 100;
  blueInk.y = 700;
  stageEditScene.addChild(blueInk);

  var redInk = new BlockInk('red');
  redInk.x = 200;
  redInk.y = 700;
  stageEditScene.addChild(redInk);

  var startInk = new BlockInk('start');
  startInk.x = 300;
  startInk.y = 700;
  stageEditScene.addChild(startInk);

  //送信ボタン
  var sendButton = new ExLabel(LANGUAGE[COUNTRYCODE].post);
  sendButton.on('touchend',function(){
    makeJSON(creater.stages);
  });
  sendButton.x = 500;
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
