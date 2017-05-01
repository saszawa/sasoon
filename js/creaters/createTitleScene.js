function createTitleScene(){

  var titleScene = new Scene();
  var titleLabel = createTitleLabel();
  titleScene.addChild(titleLabel);

  // ローカルストレージからデータを取得
  userData = JSON.parse(localStorage.getItem("normal"));
  if(userData === null){
    userData = [];
  }
  var dataLength = userData.length;

  titleScene.on('enter',function(){
    titleBackAnim.startAnim();
  });
  titleScene.on('exit',function(){
    clearInterval(titleScene.loopTimer);
  });
  titleScene.on('touchend',function(){
    titleScene.removeChild(touchStartLabel);
    titleScene.addChild(gameStartLabel);
    titleScene.addChild(tutorialLabel);
    titleScene.addChild(optionMenuButton);
    if(dataLength > 10 ){
      titleScene.addChild(stageEditLabel);
    }
  });

  var titleBackAnim = new TitleBackAnim();
  titleScene.addChild(titleBackAnim);
  // タイマーの制御を行います
  // hidden プロパティおよび可視性の変更イベントの名前を設定
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") { // Opera 12.10 や Firefox 18 以降でサポート
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  if (!(typeof document.addEventListener === "undefined" || typeof hidden === "undefined")){
    document.addEventListener(visibilityChange ,handleVisibilityChange,false);
  }

  function handleVisibilityChange() {
    if (document[hidden]) {
      clearInterval(titleScene.loopTimer);
    } else if(GAME.currentScene === titleScene){
      titleBackAnim.startAnim();
    }
  }

  var touchStartLabel = createTouchStartLabel();
  touchStartLabel.on('addedtoscene',function(){
    this.tl.fadeTo(0,30).fadeTo(1,30).loop();
  });
  titleScene.addChild(touchStartLabel);

  var gameStartLabel = createGameStartLabel();
  gameStartLabel.on('touchend',function(){
    GAME.replaceScene(selectScene);
  });

  var tutorialLabel = createTutorialLabel();
  tutorialLabel.on('touchend',function(){
    GAME.replaceScene(tutorialScene);
  });


  //10以上越してたらエディター解放
  if(dataLength > 10 ){
    //stageエディット画面
    var stageEditScene = createStageEditScene();
    var stageEditLabel = createStageEditLabel();
    stageEditLabel.on('touchend',function(){
      GAME.replaceScene(stageEditScene);
    });
  }


  var optionMenuButton = createOptionMenuButton();
  var optionMenu = createOptionMenu();
  optionMenuButton.on('touchend',function(){
    if(this.menuOpen){
      try{
        titleScene.removeChild(optionMenu);
      } catch(e){
        // しゃあないもみ消す
      }
      this.menuOpen = false;
    } else {
      titleScene.addChild(optionMenu);
      this.menuOpen = true;
    }
  });

  //selectscene
  var selectScene = createSelectScene();
  // backbutton branch 追加分 (0609)
  selectScene.backToTop = function(){
    selectScene.initSelect();
    GAME.replaceScene(titleScene);
  }
  return titleScene;
}
