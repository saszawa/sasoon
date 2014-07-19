var PipeManager =  function(){

  /*
   *パイプの状態監視
   */
  //nothing == 親も子も置いてない
  //parentPut == 親置いたけど子供置いてない
  //noneDirection == 子供置いたけど方向設定されていない
  //childPut == 親も子供も置いた
  //それ以外はエラー
  this.pipeStatus = { "blue": "nothing", "red": "nothing", "green": "nothing" };

  //画面に表示されるパイプのインクオブジェクト
  this.pipeInk = null;

  //各色の親と子供xId,yIdを登録して関連づけJSON整形に役立てる
  this.pipeEntity = {
    blue:{
      parent:{
        x:null,y:null
      },
      child:{
        x:null,y:null,direction:null
      }
    },
    red:{
      parent:{
        x:null,y:null
      },
      child:{
        x:null,y:null,direction:null
      }
    },
    green:{
      parent:{
        x:null,y:null
      },
      child:{
        x:null,y:null,direction:null
      }
    }
  };

  //指定したpipeEntityの中身を親と子供ともに全部nullにする
  this.initPipeEntityColor = function initPipeEntityColor(color){
    this.pipeEntity[color].parent.x = null;
    this.pipeEntity[color].parent.y = null;
    this.pipeEntity[color].child.y = null;
    this.pipeEntity[color].child.x = null;
    this.pipeEntity[color].child.direction = null;
    return;
  };

  //pipeStatusを見て、今使っていない色を返してくれる関数
  this.getUnusedColor = function getUnusedColor(){
    //pipeStatusまわす
    var colorArrayLength = PIPE_COLOR_ARRAY.length;
    for(var i = 0; i < colorArrayLength; i++ ){
      if(this.pipeStatus[PIPE_COLOR_ARRAY[i]] == "nothing" ){
        return PIPE_COLOR_ARRAY[i];
      }
    }
    return false;
  };

  //各子供パイプのオブジェクトをマネージャーに持たせて参照させる
  this.childPipe = { "blue": null, "red": null ,"green": null };

  //指定した色がエラー起きてるかどうか
  this.getPipeErrorFlg = function getPipeErrorFlg(color){
    for (pipeColor in this.pipeStatus){
      if(pipeColor == color){
        if(this.pipeStatus[pipeColor] == "parentPut" || this.pipeStatus[pipeColor] == "noneDirection" ){
          return true;
        }
      }
    }
    return false;
  };

  //指定した色の親が置かれているかどうか
  this.getPipeParentPutedFlg = function getPipeParentPutedFlg(color){
    for (pipeColor in this.pipeStatus){
      if(pipeColor == color){
        if(this.pipeStatus[pipeColor] == "parentPut" || this.pipeStatus[pipeColor] == "noneDirection" || this.pipeStatus[pipeColor] == "childPut" ){
          return true;
        }
      }
    }
    return false;
  };

  //どっかであり得ないパターンがあるかどうか
  this.getPipeAnyError = function getPipeErrorFlg(){
    for (pipeColor in this.pipeStatus){
      if(this.pipeStatus[pipeColor] == "parentPut" || this.pipeStatus[pipeColor] == "noneDirection" ){
        return true;
      }
    }
    return false;
  };

  //pipeStatusを
  //pipeEntityの状況に順応させる
  this.adaptPipeStatus = function adaptPipeStatus()
  {
    var colorArrayLength = PIPE_COLOR_ARRAY.length;
    for(var i = 0; i < colorArrayLength; i++){
      //親があるとき
      if(this.pipeEntity[PIPE_COLOR_ARRAY[i]].parent.x != null){
        //子供の方向設定終わっている
        if(this.pipeEntity[PIPE_COLOR_ARRAY[i]].child.direction != null ){
          this.pipeStatus[PIPE_COLOR_ARRAY[i]] = "childPut";
        //子供はあるが方向設定してない
        }else if( this.pipeEntity[PIPE_COLOR_ARRAY[i]].child.x != null && this.pipeEntity[PIPE_COLOR_ARRAY[i]].child.direction == null ){
          this.pipeStatus[PIPE_COLOR_ARRAY[i]] = "noneDirection";
        }
      //親がない
      }else{
        this.pipeStatus[PIPE_COLOR_ARRAY[i]] = "nothing";
      }
    }
    this.pipeEntity.blue.parent.x != null;
  }

  //pipeStatusに合わせてpipeInkを調節
  this.adaptPipeInk = function adaptPipeInk(){
    console.log(pipeManager.pipeStatus);
    var colorArrayLength = PIPE_COLOR_ARRAY.length;
    //アル語
    //使うかもしれない配列
    var mayUseColorArray = [];
    //絶対使わない配列
    //
    for(var i = 0; i < colorArrayLength; i++){
      //まずは絶対使わないものを除去
      if(pipeManager.pipeStatus[PIPE_COLOR_ARRAY[i]] != "childPut"){
        mayUseColorArray.push( PIPE_COLOR_ARRAY[i] );
      }
    }
    var mayUseColorLength = mayUseColorArray.length;
  
    //使える色が一個もなかったら
    if(mayUseColorLength == 0){
      return;
    }
    console.log(mayUseColorArray);
    for(var j = 0; j < mayUseColorLength; j++)
    {
      //その中でparentPutを優先させる
      if(pipeManager.pipeStatus[mayUseColorArray[j]] == "parentPut")
      {
        GAME.currentScene.removeChild(this.pipeInk);
        this.pipeInk = void 0;
        var childPipeInk = new  ChildPipeInk(mayUseColorArray[j]);
        this.pipeInk = childPipeInk;
        GAME.currentScene.addChild(childPipeInk);
        break;
      //なければnothing色にして次の色のステータスを見る
      }else if(pipeManager.pipeStatus[mayUseColorArray[j]] == "nothing"){
        GAME.currentScene.removeChild(this.pipeInk);
        this.pipeInk = void 0;
        var parentPipeInk = new PipeInk(mayUseColorArray[j]);
        GAME.currentScene.addChild(parentPipeInk);
        this.pipeInk = parentPipeInk;
      }
    }
  }
}
