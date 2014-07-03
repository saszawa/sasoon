//チュートリアル最初の矢印
function createPointerArrow1(){

  var pointerArrow1 = new Sprite();
  pointerArrow1.x = 65;
  pointerArrow1.y = 290;
  pointerArrow1._element = document.createElement('div');
  pointerArrow1._element.className  = 'pointerArrow';
  pointerArrow1.width = 30;
  pointerArrow1.rotate(300);

  return pointerArrow1;

}

//トップに戻るボタン
function createBacktoTopLabel(){

  var backToTop = new ExLabel(LANGUAGE[COUNTRYCODE].backToTop,BOX_SIZE*3,BOX_SIZE);
  backToTop.setClassName('backToTopText');
  backToTop.x = 0.5 * 64;
  backToTop.y = 8.5 * 64;

  return backToTop;
}

//チュートリアル最初の説明文
function createStartTutorialLabel(){

  var startTutorialLabel = new ExLabel(LANGUAGE[COUNTRYCODE].startTutorial);
  startTutorialLabel.setClassName('tuto_white_msg');
  startTutorialLabel.x = 90;
  startTutorialLabel.y = 170;

  return startTutorialLabel;
}

//チュートリアル最初の白玉が爆発する前の説明文
function createSirotamaLabel(){

  var sirotamaLabel = new ExLabel(LANGUAGE[COUNTRYCODE].sirotama);
  sirotamaLabel.setClassName('tuto_white_msg');
  sirotamaLabel.x = 90;
  sirotamaLabel.y = 170;

  return sirotamaLabel;
}

//チュートリアル負けたのときの説明文
function createLoseMsg(){

  var loseMsg = new ExLabel(LANGUAGE[COUNTRYCODE].loseMsg);
  loseMsg.x = 200;
  loseMsg.y = 200;
  loseMsg.setClassName('tuto_black_msg');

  return loseMsg;
}

//タイトルのラベル
function createTitleLabel(){

  var titleLabel = new ExLabel(LANGUAGE[COUNTRYCODE].title);
  titleLabel.setClassName('titleText');
  titleLabel.y = 140;

  return titleLabel;
}
//タイトル画面のタッチスタートのラベル
function createTouchStartLabel(){
  var touchStartLabel = new ExLabel(LANGUAGE[COUNTRYCODE].touchStart,640,60);
  touchStartLabel.setClassName('touchStart');
  touchStartLabel.x = 0;
  touchStartLabel.y = 400;
  return touchStartLabel;
}

//タイトル画面のゲーム開始のラベル
function createGameStartLabel(){

  var gameStartLabel = new ExLabel(LANGUAGE[COUNTRYCODE].gameStart,320,60);
  gameStartLabel.setClassName('gameStart');
  gameStartLabel.x = 160;
  gameStartLabel.y = 360;

  return gameStartLabel;
}

//タイトル画面の遊び方のラベル
function createTutorialLabel(){

  var tutorialLabel  = new ExLabel(LANGUAGE[COUNTRYCODE].howToPlay,320,60);
  tutorialLabel.setClassName('tutorial');
  tutorialLabel.x = 160;
  tutorialLabel.y = 440;

  return tutorialLabel;
}
// オプションメニューボタン
function createOptionMenuButton(){
  var optionMenuButton = new Sprite(BOX_SIZE,BOX_SIZE);
  optionMenuButton._element = document.createElement('div');
  optionMenuButton._element.className = 'optionMenuButton';
  optionMenuButton.x = 8.5*BOX_SIZE;
  optionMenuButton.y = 8.5*BOX_SIZE;
  optionMenuButton.menuOpen = false;
  return optionMenuButton;
}
function createOptionMenu(){
  // メニュー全体のグループ
  var menuGroup = new Group();
  menuGroup._element = document.createElement('div');
  menuGroup._element.className = 'optionMenu';

  // 背景の色
  var background = new Sprite(640,640);
  background._element = document.createElement('div');
  background._element.className = 'optionBackground optionLayer';
  menuGroup.addChild(background);

  // メニュータイトル
  var optionLabel = new ExLabel('Option');
  optionLabel.setClassName('optionLayer');
  optionLabel.y = 20;
  menuGroup.addChild(optionLabel);

  // エフェクト
  var switchLabel = new ExLabel(LANGUAGE[COUNTRYCODE].optionTitle);
  switchLabel.setClassName('optionLayer effectLabel');
  switchLabel.y = 120;
  menuGroup.addChild(switchLabel);

  var lowSwitch = new ExLabel('<button id="low">'+LANGUAGE[COUNTRYCODE].optionEffect[0]+'</button>',160);
  lowSwitch.setClassName('effectSwitch optionLayer');
  lowSwitch.quality = 'low';
  lowSwitch.x = 80;
  lowSwitch.y = 172;
  lowSwitch.on('touchend',function(){
    qualityCheck(this.quality);
    effectLevel = 0;
  });
  menuGroup.addChild(lowSwitch);

  var medSwitch = new ExLabel('<button id="med">'+LANGUAGE[COUNTRYCODE].optionEffect[1]+'</button>',160);
  medSwitch.setClassName('effectSwitch optionLayer active');
  medSwitch.quality = 'med';
  medSwitch.x = 240;
  medSwitch.y = 172;
  medSwitch.on('touchend',function(){
    qualityCheck(this.quality);
    effectLevel = 1;
  });
  menuGroup.addChild(medSwitch);

  var highSwitch = new ExLabel('<button id="high">'+LANGUAGE[COUNTRYCODE].optionEffect[2]+'</button>',160);
  highSwitch.setClassName('effectSwitch optionLayer');
  highSwitch.quality = 'high';
  highSwitch.x = 400;
  highSwitch.y = 172;
  highSwitch.on('touchend',function(){
    qualityCheck(this.quality);
    effectLevel = 2;
  });
  menuGroup.addChild(highSwitch);

  var switches = [lowSwitch,medSwitch,highSwitch];

  function qualityCheck(quality){

    for(var i = 0; i<3;i++){
      if(switches[i].quality === quality){
        switches[i].setClassName('effectSwitch optionLayer active');
      } else {
        switches[i].setClassName('effectSwitch optionLayer');
      }
    }
  }

  // 音量
  var volumeLabel = new ExLabel(LANGUAGE[COUNTRYCODE].volumeOption);
  volumeLabel.setClassName('optionLayer effectLabel');
  volumeLabel.y = 264;
  menuGroup.addChild(volumeLabel);

  //音量調節スライダー
  var volumeSlider = new VolumeSlider();
  menuGroup.addChild(volumeSlider);

  // すべてを削除ボタン
  var deleteDataLabel = new ExLabel('<button id="deleteButton" class="btn-long">'+LANGUAGE[COUNTRYCODE].optionDeleteData+'</button>');
  deleteDataLabel.setClassName('deleteData optionLayer');
  deleteDataLabel.y = 365;
  deleteDataLabel.on('touchend',function(){
  	if(window.confirm(LANGUAGE[COUNTRYCODE].optionDeleteConf)){
      localStorage.clear();
      alert(LANGUAGE[COUNTRYCODE].optionDeleteComp);
  	}
  });
  menuGroup.addChild(deleteDataLabel);

  // 全ステージを出現ボタン
  var openAllStage = new ExLabel('<button id="allStage" class="btn-long">'+LANGUAGE[COUNTRYCODE].optionAllStage+'</button>');
  openAllStage.setClassName('openAllStage optionLayer');
  openAllStage.on('touchend',function(){
    var allData = [];
    for(var i = 0; i < STAGES.length;i++){
      allData.push(0);
    }
    localStorage.setItem("hal", JSON.stringify(allData));
    alert(LANGUAGE[COUNTRYCODE].optionAllStageUnlock);
  });
  openAllStage.y = 460;
  menuGroup.addChild(openAllStage);

  return menuGroup;
}
// 現在の星の数を表すグループ
function createPlayerStatus(data){
  var starCount = 0;
  for(var i = 0;i < data.length;i++){
    starCount += data[i];
  }

  var playerStatusGroup = new Group();
  playerStatusGroup._element = document.createElement('div');
  playerStatusGroup.x = 7.5 * 64;
  playerStatusGroup.y = 8.5 * 64;

  var starsLabel = new ExLabel(' × '+starCount,BOX_SIZE*2,BOX_SIZE);
  starsLabel.setClassName('playerStars');
  playerStatusGroup.addChild(starsLabel);

  var starSprite = new Sprite(BOX_SIZE,BOX_SIZE);
  starSprite.image = YELLOW_STAR;
  starSprite.scale(0.8,0.8);
  playerStatusGroup.addChild(starSprite);

  return playerStatusGroup;
}

function createRetryLabelOnGame(){
  var retryLabelOnGame = new ExLabel(LANGUAGE[COUNTRYCODE].gameRetry,BOX_SIZE*3,BOX_SIZE);
  retryLabelOnGame.setClassName('retryLabelOnGame');
  retryLabelOnGame.x = 6.5 * 64;
  retryLabelOnGame.y = 8.5 * 64;
  return retryLabelOnGame;
}

//チュートリアルの勝ちパターンのときの最初の矢印
function createPointerArrow(){

  var pointerArrow = new PointerArrow();
  pointerArrow.x = 428;
  pointerArrow.y = 276;
  pointerArrow._element = document.createElement('div');
  pointerArrow._element.className  = 'pointerArrow';
  pointerArrow.width = 30;
  pointerArrow.rotate(300);
  pointerArrow.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT).loop();

  return pointerArrow;
}

//チュートリアル終了時のラベル
function createEndLabel(){

  var endLabel = new ExLabel(LANGUAGE[COUNTRYCODE].tutoClearMsg);
  endLabel.x = 100;
  endLabel.y = 150;
  endLabel.setClassName('tuto_clear_msg');

  return endLabel;
}

//チュートリアルの負けパターンですっていうラベル
function createLosePatternText(){

  var losePatternText = new ExLabel(LANGUAGE[COUNTRYCODE].losePattern);
  losePatternText.x = 180;
  losePatternText.y = 200;
  losePatternText.setClassName("msg");

  return losePatternText;
}

//チュートリアルの衝突時にできる矢印
function createPointerArrow2(thatx,thaty){

  var pointerArrow2 = new Sprite();
  pointerArrow2.x = thatx - 30;
  pointerArrow2.y = thaty + 30;
  pointerArrow2._element = document.createElement('div');
  pointerArrow2._element.className  = 'pointerArrow';
  pointerArrow2.width = 30;
  pointerArrow2.rotate(300);

  return pointerArrow2;
}

//チュートリアルの最初のゴール手前のときの説明文
function createPrevGoalLabel(){
  var prevGoalLabel = new ExLabel(LANGUAGE[COUNTRYCODE].prevGoal);
  prevGoalLabel.setClassName('tuto_white_msg');
  prevGoalLabel.x = 120;
  prevGoalLabel.y = 170;

  return prevGoalLabel;
}

//チュートリアルの連鎖が途切れてしまいますっていうラベル
function createEndChainLabel(){
  var endChainLabel = new ExLabel(LANGUAGE[COUNTRYCODE].endChain);
  endChainLabel.setClassName('tuto_black_msg');
  endChainLabel.x = 110;
  endChainLabel.y = 170;

  return endChainLabel;
}

//チュートリアルの破片がぶつかったら連鎖しますっていうラベル
function createAotamaLabel(){
  var aotamaLabel = new ExLabel(LANGUAGE[COUNTRYCODE].aotama);
  aotamaLabel.setClassName('tuto_black_msg');
  aotamaLabel.x = 110;
  aotamaLabel.y = 170;

  return aotamaLabel;
}
// 各種Surfaceの作成
function createSurfaces(){

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
  // 星1
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

  // 星2
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

  // 星3
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

  // オレンジブロック
  ORANGE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxOr = ORANGE.context;
  ctxOr.fillStyle = COLORS.orange;
  ctxOr.strokeStyle = COLORS.yellow;
  ctxOr.lineWidth = 3;
  ctxOr.beginPath();
  ctxOr.moveTo(BOX_HALF,0);
  ctxOr.lineTo(BOX_SIZE,BOX_HALF);
  ctxOr.lineTo(BOX_HALF,BOX_SIZE);
  ctxOr.lineTo(0,BOX_HALF);
  ctxOr.lineTo(BOX_HALF,0);
  ctxOr.fill();
  ctxOr.stroke();
  ctxOr.closePath()

  ctxOr.beginPath();
  ctxOr.fillStyle = COLORS.yellow;
  ctxOr.strokeStyle = COLORS.orange;
  ctxOr.moveTo(BOX_HALF,0);
  ctxOr.lineTo(BOX_HALF*1.5,BOX_HALF*0.5);
  ctxOr.lineTo(BOX_HALF+6,BOX_HALF*0.5);
  ctxOr.lineTo(BOX_HALF+6,BOX_HALF*1.5);
  ctxOr.lineTo(BOX_HALF*1.5,BOX_HALF*1.5);
  ctxOr.lineTo(BOX_HALF,BOX_SIZE);
  ctxOr.lineTo(BOX_HALF*0.5,BOX_HALF*1.5);
  ctxOr.lineTo(BOX_HALF-6,BOX_HALF*1.5);
  ctxOr.lineTo(BOX_HALF-6,BOX_HALF*0.5);
  ctxOr.lineTo(BOX_HALF*0.5,BOX_HALF*0.5);
  ctxOr.lineTo(BOX_HALF,0);
  ctxOr.fill();
  ctxOr.stroke();
  ctxOr.closePath();


  // 紫ブロック
  PURPLE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPu = PURPLE.context;
  ctxPu.fillStyle = COLORS.purple;
  ctxPu.strokeStyle = COLORS.yellow;
  ctxPu.lineWidth = 3;
  ctxPu.beginPath();
  ctxPu.moveTo(BOX_HALF,0);
  ctxPu.lineTo(BOX_SIZE,BOX_HALF);
  ctxPu.lineTo(BOX_HALF,BOX_SIZE);
  ctxPu.lineTo(0,BOX_HALF);
  ctxPu.lineTo(BOX_HALF,0);
  ctxPu.fill();
  ctxPu.stroke();
  ctxPu.closePath()

  ctxPu.beginPath();
  ctxPu.fillStyle = COLORS.yellow;
  ctxPu.strokeStyle = COLORS.purple;
  ctxPu.moveTo(0,BOX_HALF);
  ctxPu.lineTo(BOX_HALF*0.5,BOX_HALF*1.5);
  ctxPu.lineTo(BOX_HALF*0.5,BOX_HALF+6);
  ctxPu.lineTo(BOX_HALF*1.5,BOX_HALF+6);
  ctxPu.lineTo(BOX_HALF*1.5,BOX_HALF*1.5);
  ctxPu.lineTo(BOX_SIZE,BOX_HALF);
  ctxPu.lineTo(BOX_HALF*1.5,BOX_HALF*0.5);
  ctxPu.lineTo(BOX_HALF*1.5,BOX_HALF-6);
  ctxPu.lineTo(BOX_HALF*0.5,BOX_HALF-6);
  ctxPu.lineTo(BOX_HALF*0.5,BOX_HALF*0.5);
  ctxPu.lineTo(0,BOX_HALF);
  ctxPu.fill();
  ctxPu.stroke();
  ctxPu.closePath();

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

  // 赤パイプ
  PIPE_RED = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPR = PIPE_RED.context;
  ctxPR.fillStyle = COLORS.red;
  ctxPR.strokeStyle = COLORS.yellow;
  ctxPR.lineWidth = 3;
  ctxPR.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPR);
  ctxPR.fill();
  ctxPR.stroke();
  ctxPR.closePath();
  // 発射パイプ
  PIPE_RED_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPRO = PIPE_RED_OUT.context;
  ctxPRO.fillStyle = COLORS.red;
  ctxPRO.strokeStyle = COLORS.yellow;
  ctxPRO.lineWidth = 3;
  ctxPRO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPRO);
  ctxPRO.fill();
  ctxPRO.stroke();
  ctxPRO.closePath();

  // 緑パイプ
  PIPE_GREEN = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPG = PIPE_GREEN.context;
  ctxPG.fillStyle = COLORS.green;
  ctxPG.strokeStyle = COLORS.yellow;
  ctxPG.lineWidth = 3;
  ctxPG.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPG);
  ctxPG.fill();
  ctxPG.stroke();
  ctxPG.closePath();
  // 発射パイプ
  PIPE_GREEN_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPGO = PIPE_GREEN_OUT.context;
  ctxPGO.fillStyle = COLORS.green;
  ctxPGO.strokeStyle = COLORS.yellow;
  ctxPGO.lineWidth = 3;
  ctxPGO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPGO);
  ctxPGO.fill();
  ctxPGO.stroke();
  ctxPGO.closePath();

  // 青パイプ
  PIPE_BLUE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPB = PIPE_BLUE.context;
  ctxPB.fillStyle = COLORS.blue;
  ctxPB.strokeStyle = COLORS.yellow;
  ctxPB.lineWidth = 3;
  ctxPB.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPB);
  ctxPB.fill();
  ctxPB.stroke();
  ctxPB.closePath();
  // 発射パイプ
  PIPE_BLUE_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPBO = PIPE_BLUE_OUT.context;
  ctxPBO.fillStyle = COLORS.blue;
  ctxPBO.strokeStyle = COLORS.yellow;
  ctxPBO.lineWidth = 3;
  ctxPBO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPBO);
  ctxPBO.fill();
  ctxPBO.stroke();
  ctxPBO.closePath();

  // 紫パイプ
  PIPE_PURPLE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPP = PIPE_PURPLE.context;
  ctxPP.fillStyle = COLORS.purple;
  ctxPP.strokeStyle = COLORS.yellow;
  ctxPP.lineWidth = 3;
  ctxPP.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPP);
  ctxPP.fill();
  ctxPP.stroke();
  ctxPP.closePath();
  // 紫発射パイプ
  PIPE_PURPLE_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPPO = PIPE_PURPLE_OUT.context;
  ctxPPO.fillStyle = COLORS.purple;
  ctxPPO.strokeStyle = COLORS.yellow;
  ctxPPO.lineWidth = 3;
  ctxPPO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPPO);
  ctxPPO.fill();
  ctxPPO.stroke();
  ctxPPO.closePath();

  // 紫パイプ
  PIPE_ORANGE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPO = PIPE_ORANGE.context;
  ctxPO.fillStyle = COLORS.purple;
  ctxPO.strokeStyle = COLORS.yellow;
  ctxPO.lineWidth = 3;
  ctxPO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPO);
  ctxPO.fill();
  ctxPO.stroke();
  ctxPO.closePath();
  // 紫発射パイプ
  PIPE_ORANGE_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPOO = PIPE_ORANGE_OUT.context;
  ctxPOO.fillStyle = COLORS.purple;
  ctxPOO.strokeStyle = COLORS.yellow;
  ctxPOO.lineWidth = 3;
  ctxPOO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPOO);
  ctxPOO.fill();
  ctxPOO.stroke();
  ctxPOO.closePath();

  PIPE_COLORS = {
    red:   {pipe:PIPE_RED    ,pipeOut:PIPE_RED_OUT},
    green: {pipe:PIPE_GREEN  ,pipeOut:PIPE_GREEN_OUT},
    blue:  {pipe:PIPE_BLUE   ,pipeOut:PIPE_BLUE_OUT},
    purple:{pipe:PIPE_PURPLE ,pipeOut:PIPE_PURPLE_OUT},
    orange:{pipe:PIPE_ORANGE ,pipeOut:PIPE_ORANGE_OUT}
  };
}
