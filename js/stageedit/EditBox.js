var EditBox = Class.create(Box,{
  initialize: function(xNumber,yNumber){
    //生成時にBoxの場所を引き数に持つ
    Box.call(this,BOX_SIZE,BOX_SIZE);
    // DOMモード
    this._element = document.createElement('div');
    //下線対応
    if(yNumber == 9){
      this._element.className = 'box edit_underline';
    }else{
      this._element.className = 'box';
    }
    this.moved = false;
    //idを降ってステージ作成に活かす
    this.xId = xNumber;
    this.yId = yNumber;
    this.startObjFlg = false;
    //自分の上にオブジェクトが置かれているかどうか
    this.putedObjFlg = false;
    this.pipeNextAlreadyFlg = false;
  },
  putStart: function putStart(){
      //スタートは一個しか置けない用にする
      if(creater.putStartFlg){
        return;
      }
      var start = new EditStart();
      //クリエイターがみんなから見えるので色々持たす
      creater.putStartFlg = true;
      //nonecollisionstagesに追加しないように判定用
      this.startObjFlg = true;

      creater.startObj = void 0;
      creater.startObj = start;
      creater.stages[this.xId][this.yId] = "start";
      creater.startPos = {x: this.xId, y:this.yId};
      return start;
  },
  putSlanter: function putSlanter(){
      var slanter = new EditSlanter(this.xId,this.yId);
      creater.currentStage.push(slanter);
      creater.stages[this.xId][this.yId] = "slanter";
      return slanter;
  },
  putDiffusioner: function putDiffusioner(){
      var diffusioner  = new EditDiffusioner();
      creater.currentStage.push(diffusioner);
      creater.stages[this.xId][this.yId] = "diffusioner";
      return diffusioner;
  },
  putParentPipe: function putParentPipe(){
    //親パイプのとき
    //既に同色が置いてある場合
    var color = creater.pipeColor;
    var parentPipe = new EditPipe(color);

    creater.currentStage.push(parentPipe);
    creater.stages[this.xId][this.yId] = {name:"pipe",color:"blue"};
    pipeManager.pipeEntity[color].parent.x = this.xId;
    pipeManager.pipeEntity[color].parent.y = this.yId;
    pipeManager.pipeStatus[color] = "parentPut";
    creater.penColor = "childPipe";

    GAME.currentScene.removeChild(pipeManager.pipeInk);
    pipeManager.pipeInk = void 0;
    pipeManager.pipeInk = new ChildPipeInk(color);
    GAME.currentScene.addChild(pipeManager.pipeInk);
    return parentPipe;
  },
  //現状だと既にchildput場合にしか使わないかも
  itaratePipeInk: function itaratePipeInk(color){
      var chengeColor = null;
      switch(color)
      {
        //青以外
        case "blue":
          chengeColor = "red";
          break;
        case "red":
          chengeColor = "green";
          break;
        case "green":
          chengeColor = "blue";
          break;
      }
      GAME.currentScene.removeChild(pipeManager.pipeInk);
      creater.pipeColor = chengeColor;
      pipeManager.pipeInk = void 0;
      pipeManager.pipeInk = new PipeInk(chengeColor);
      GAME.currentScene.addChild(pipeManager.pipeInk);
  },
  //pipe用、速度の為にpipeManagerに書かなかった
  getNextColor: function getNextColor(color){
    var nextColor = null;
    var colorArray = ["blue","red","green"];
    var colorArrayLength = colorArray.length;
    for(var i = 0; i < colorArrayLength; i++){
      if( color == colorArray[i]){
         //要素超えないように
         if(i + 1 > colorArrayLength){
           return; 
         }
         return colorArray[i + 1];
      }
    }
    alert("pipe Color Error. color is not exist");
  },
  putChildPipe: function putChildPipe(){
      //子パイプの時
      var color = creater.pipeColor;
      var childPipe = new EditChildPipe(color);

      var nextColor = this.getNextColor(color);
      //消しゴムの実装により次の色が既にある可能性がある
      if( pipeManager.pipeStatus[nextColor] == "childPut" ){
        //インクを次の色にする
        this.pipeNextAlreadyFlg = true;
      }

      //createrに登録 正直pipeマネージャーで管理しているのでクリエイターに登録しなくてよい
//      creater.stages[this.xId][this.yId] = "pipeOut";
      //自分にもxId yId登録
      childPipe.xId = this.xId;
      childPipe.yId = this.yId;

      //pipemanagerに登録
      pipeManager.pipeStatus[color] = "noneDirection";
      pipeManager.pipeEntity[color].child.x = this.xId;
      pipeManager.pipeEntity[color].child.y = this.yId;
      pipeManager.childPipe[color] = void 0;
      //なんでこここれでアクセスできんのやろ
      //console.log(pipeManager.childPipe[color]);

      //色をまわす為の配列を使ってやったほうがスマートかもしれんが読みにくい
//      var colorArray = ["blue","red","green"];
      //色を変える
      switch(color)
      {
        case "blue":
          pipeManager.childPipe.blue = childPipe;
          color = "red";
          creater.pipeColor = "red";
          break;
        case "red":
          pipeManager.childPipe.red = childPipe;
          color = "green";
          creater.pipeColor = "green";
          break;
        case "green":
          pipeManager.childPipe.green = childPipe;
          color = "blue";
          creater.pipeColor = "blue";
          break;
      }

      creater.penColor = "parentPipe";

      //消しゴムの存在により、確定で子供のつぎに次の色の親がくる訳じゃなくなった。
      //なので、pipeEntityを確認してインクを変える
      //条件　
      //　次色の親が残ってる場合
      //　次色が二つともない場合　＝＞　今まで通り
      //　次色が二つともある場合　＝＞　さらにつぎの色へ
      //二つともある場合
      if(pipeManager.pipeEntity[color].child.x != null){
        switch(color)
        {
          //青以外
          case "blue":
            color = "green";
            creater.pipeColor = "green";
          break;
          case "red":
            color = "blue";
            creater.pipeColor = "blue";
          break;
          case "green":
            color = "red";
            creater.pipeColor = "red";
          break;
        }
      }
      //TODO 次色の親だけが残っている場合
 //     if(pipeManager.pipeEntity[color].child.x == null && pipeManager.pipeEntity[color].parent.x != null){

 //     }
      if(this.pipeNextAlreadyFlg){
        this.itaratePipeInk(nextColor);
      }else{
        GAME.currentScene.removeChild(pipeManager.pipeInk);
        pipeManager.pipeInk = void 0;
        pipeManager.pipeInk = new PipeInk(color);
        GAME.currentScene.addChild(pipeManager.pipeInk);
      }
      //使ってない色のインクにかえるこれ合ったら上のいらん可能性たかい
      var unUsedColor = pipeManager.getUnusedColor();
      if(unUsedColor){
        GAME.currentScene.removeChild(pipeManager.pipeInk);
        pipeManager.pipeInk = void 0 
        pipeManager.pipeInk = new PipeInk(unUsedColor);
        GAME.currentScene.addChild(pipeManager.pipeInk);
      } 

      return childPipe;
  },
  putGoal: function putGoal(){
    //goalは一個しか置けない用にするA
    if(creater.goalFlg){
      return;
    }
    var goal = new EditGoal();
    creater.currentStage.push(goal);
    //TODO 上書き機能
    creater.stages[this.xId][this.yId] = "goal";
    creater.goalFlg = true;
    return goal;
  },
  putStar: function putStar(){
    //星を置く
    var star = new EditStar();
    creater.currentStage.push(star);
    creater.stages[this.xId][this.yId] = "star";
    creater.starMany++;
    return star;
  },
  ontouchstart: function(e){
    //消しゴムインクだった場合何もしない
    if(this.putedObjFlg){
      //上書き防止
      return;
    }
    this.startEvent = e;
    this.moved = false;
    this._element.className = 'box touched';

    var penColor = creater.penColor;
    var obj = null;

    //TODO ここもメソッドかしたい
    if(penColor == "eraser"){
      return; 
    }
    else if(penColor == "start"){
      if(creater.putStartFlg){
        return;
      }
      obj = this.putStart();
      creater.putStartFlg = true;
    }else if(penColor == "slanter" ){
      obj = this.putSlanter();
    }else if(penColor == "diffusioner"){
      obj = this.putDiffusioner();
    }else if(penColor == "parentPipe"){
      //既に同色の親が置いてあったら置けない
      var parentPutedFlg = pipeManager.getPipeParentPutedFlg(creater.pipeColor);
      if(parentPutedFlg){
        alert(LANGUAGE[COUNTRYCODE].sameColorParentError);
        creater.pipeColor = null;
        return;
      }
      obj = this.putParentPipe();
    }else if(penColor == "childPipe"){
      obj = this.putChildPipe();
    }else if(penColor == "goal"){
      obj = this.putGoal();
    }else if(penColor == "star"){
    //みっつまでしかおけない
      if(creater.starMany >= 3){
        return;
      }
      obj = this.putStar();
    }
    else{
      //赤、緑、青、紫、オレンジ
      obj = new EditBlock(penColor);
      this.putedObj = obj;
      creater.currentStage.push(this.putedObj);
      //TODO 上書き機能
      creater.stages[this.xId][this.yId] = obj.color;
    }

    obj.x = this.x;
    obj.y = this.y;
    //戻すようにxId,yIdを持たせる
    obj.xId = this.xId;
    obj.yId = this.yId;
    //戻す用
    //startはcreater.startobjにまかす
    if(!this.startObjFlg){
      creater.noneCollisionStages.push(obj);
    }
    this.parentNode.addChild(obj);
    this.putedObjFlg = true;
  },
  ontouchmove: function(e){
    if(Math.abs(this.startEvent.x - e.x) > 10 || Math.abs(this.startEvent.y - e.y) > 10){
      this.moved = true;
    }
  },
  ontouchend: function(){
    this._element.className = 'box';
    if(!this.parentNode.canTap){
      return;
    } else if(this.moved){
      return;
    }
    this.parentNode.canTap = false;
    var block = new Block('white');
    block.x = this.x;
    block.y = this.y;
    currentStage.push(block);
    this.parentNode.addChild(block);
  }
});
