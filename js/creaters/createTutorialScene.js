function createTutorialScene(){

  tutorialScene = new Scene();

  var pointerArrow1 = createPointerArrow1();

  //最初の文
  var startTutorialLabel = createStartTutorialLabel();
  tutorialScene.addChild(startTutorialLabel);

  var sirotamaLabel = createSirotamaLabel();
  startTutorialLabel.tl.delay(80).then(function(){
    tutorialScene.removeChild(startTutorialLabel);
    tutorialScene.addChild(sirotamaLabel);
    tutorialScene.addChild(pointerArrow1);
  });

  //文言変えるようのフラグ(汚いやり方、本来は状態を持たせて上手い事やるべきかな)
  tutorialScene.aotamaEndFlg = false;
  //背景を黒にする
  tutorialScene.backgroundColor = "#555555";

  // /*=== ステージの読み込み ===*/
  // var i = 0;
  tutoCurrentStage = [];
  TUTOSTAGES[0].forEach(function(blockInfo){
    var block = StageBuilder(blockInfo);
    block.x = blockInfo.x*BOX_SIZE;
    block.y = blockInfo.y*BOX_SIZE;
    tutoCurrentStage.push(block);
    tutorialScene.addChild(block);
  });

  // とりあえず0番目を撃つ
  pointerArrow1.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT);
  pointerArrow1.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT);
  pointerArrow1.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT).then(function(){
    tutoCurrentStage[0].run(0);
    tutoCurrentStage.splice(0,1);
    tutorialScene.removeChild(sirotamaLabel);
    tutorialScene.removeChild(pointerArrow1);
  });

  var backToTop = createBacktoTopLabel();
  tutorialScene.addChild(backToTop);
  
  backToTop.on('touchend',function(){

    //==========================================================
    // title
    //==========================================================
    var titleScene = createTitleScene();

    GAME.replaceScene(titleScene);
    initTutorialScene();
  });

  return tutorialScene;

}
