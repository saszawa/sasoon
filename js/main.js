//チュートリアルを連続でyareruyouni
var tutorialScene = null;

enchant();
window.onload = function () {
  GAME = new Game(640, 640);
  GAME.fps = 30;
  GAME.onload = function () {

    GAME.rootScene.backgroundColor = 'white';
    //==========================================================
    // setting
    //==========================================================

    // 星のサーフェス作成
    // STAR自体はグローバル変数にしておく

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
