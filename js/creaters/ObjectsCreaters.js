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
  titleLabel.y = 150;

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
