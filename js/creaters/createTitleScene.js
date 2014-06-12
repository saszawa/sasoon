function createTitleScene(){

  //==========================================================
  //	stage
  //==========================================================
  var stageScene = createStageScene();
  stageScene.stageSelect = function(){
    var stageBoxesLen = stageBoxes.length;
    for(var i = 0; i < stageBoxesLen;i++){
      stageGroup.removeChild(stageBoxes[i]);
    }
    stageBoxes = [];
    GAME.replaceScene(selectScene);
  }

  var titleScene = new Scene();
  var titleLabel = createTitleLabel();
  titleScene.addChild(titleLabel);

  // title-looks branch 変更文(0611)
  var titleBackAnim = new TitleBackAnim();
  titleScene.addChild(titleBackAnim);
  // title-looks branch 変更文(0611)
  titleScene.on('enter',function(){
    titleBackAnim.startAnim();
  });
  titleScene.on('exit',function(){
    clearInterval(titleScene.loopTimer);
  });

  //selectscene
  var selectScene = createSelectScene();
  // backbutton branch 追加分 (0609)
  selectScene.backToTop = function(){
    GAME.replaceScene(titleScene);
  }

  var gameStartLabel = createGameStartLabel();
  gameStartLabel.on('touchend',function(){
    GAME.replaceScene(selectScene);
  });
  var tutorialLabel = createTutorialLabel();
  tutorialLabel.on('touchend',function(){
    GAME.replaceScene(tutorialScene);
  });
  titleScene.on('touchend',function(){
    titleScene.addChild(gameStartLabel);
    titleScene.addChild(tutorialLabel);
  });
  // var deleteLabel = new ExLabel('セーブデータの削除',480,60);
  // deleteLabel.setClassName('delete');
  // deleteLabel.x = 80;
  // deleteLabel.y = 480;
  // titleScene.addChild(deleteLabel);
  //


  return titleScene;
}
