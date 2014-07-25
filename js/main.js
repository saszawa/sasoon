//チュートリアルを連続でyareruyouni
var tutorialScene = null;

enchant();
window.onload = function () {
  GAME = new Game(640, 640);
  //  GAME.preload('sound/white.mp3','sound/goal.mp3','sound/start.mp3','sound/orange.mp3','sound/purple.mp3','sound/green.mp3','sound/red.mp3','sound/slanter.mp3','sound/pipe.mp3','sound/blue.mp3','sound/star.mp3','sound/diffusioner.mp3');
  GAME.fps = 30;
  ///boomboxでロード
//  var startSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/start.mp3'
//    }
//    ]
//  };
//  var whiteSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/white.mp3'
//    }
//    ]
//  };
//  var goalSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/goal.mp3'
//    }
//    ]
//  };
//  var orangeSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/orange.mp3'
//    }
//    ]
//  };
//  var purpleSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/purple.mp3'
//    }
//    ]
//  };
//  var greenSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/green.mp3'
//    }
//    ]
//  };
//  var redSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/red.mp3'
//    }
//    ]
//  };
//  var slanterSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/slanter.mp3'
//    }
//    ]
//  };
//  var pipeSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/slanter.mp3'
//    }
//    ]
//  };
//  var blueSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/blue.mp3'
//    }
//    ]
//  };
//  var starSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/star.mp3'
//    }
//    ]
//  };
//  var diffusionerSound = {
//    src: [
//      {
//      media: 'audio/mp3',
//      path: 'sound/diffusioner.mp3'
//    }
//    ]
//  };
//  boombox.load('start', startSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('white', whiteSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('goal', goalSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('orange', orangeSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('purple', purpleSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('green', greenSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('red', redSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('slanter', slanterSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('pipe', pipeSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('blue', blueSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('star', starSound, function (err, audio) {
//    // サウンドファイルのロード
//  });
//  boombox.load('diffusioner', diffusionerSound, function (err, audio) {
//    // サウンドファイルのロード
//  });


  GAME.onload = function () {

    GAME.rootScene.backgroundColor = 'white';
    //==========================================================
    // setting
    //==========================================================
    // ゲームの設定はここで
    createSurfaces();

    //==========================================================
    // title
    //==========================================================
    var titleScene = createTitleScene();

    initTutorialScene();
    GAME.pushScene(titleScene);
  };
  GAME.start();
}

// ステージ構築の補助
function　StageBuilder(gimmick){
  switch(gimmick.name){
    case 'block':
      return new Block(gimmick.color);
    case 'start':
      return new Start();
    case 'goal' :
      return new Goal();
    case 'star':
      return new Star();
    case 'count':
      return new CountBlock(gimmick.color,gimmick.count);
    case 'diffusioner':
      return new Diffusioner();
    case 'slanter':
      return new Slanter();
    case 'pipe':
      return new Pipe(gimmick.color,gimmick.pipeStatus);
    case 'linker':
      return new Linker(gimmick.color);
    case 'tutoGoal':
      return new TutoGoal();
    case 'tutoBlock':
      return new TutoBlock(gimmick.color);
  }
}

function initTutorialScene(){
  tutorialScene = createTutorialScene();
}
