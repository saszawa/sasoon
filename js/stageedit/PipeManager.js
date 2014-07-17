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
    var colorArray = ["blue","red","green"];
    var colorArrayLength = colorArray.length;
    for(var i = 0; i < colorArrayLength; i++ ){
      if(this.pipeStatus[colorArray[i]] == "nothing" ){
        return colorArray[i];
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
    var colorArray = ["blue","red","green"];
    for(var i = 0; i < 3; i++){
      //親があるとき
      if(this.pipeEntity[colorArray[i]].parent.x != null){
        //子供の方向設定終わっている
        if(this.pipeEntity[colorArray[i]].child.direction != null ){
          this.pipeStatus[colorArray[i]] = "childPut";
        //子供はあるが方向設定してない
        }else if( this.pipeEntity[colorArray[i]].child.x != null && this.pipeEntity[colorArray[i]].child.direction == null ){
          this.pipeStatus[colorArray[i]] = "noneDirection";
        }
      //親がない
      }else{
        this.pipeStatus[colorArray[i]] = "nothing";
      }
    }
    this.pipeEntity.blue.parent.x != null;
  }
}
