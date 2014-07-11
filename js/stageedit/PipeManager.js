var PipeManager =  function(){

  /*
   *パイプの状態監視
   */
  //nothing == 親も子も置いてない
  //parentPut == 親置いたけど子供置いてない
  //childPut == 親も子供も置いた
  //それ以外はエラー
  this.pipeStatus = { "blue": "nothing", "red": "nothing", "green": "nothing" };

  //画面に表示されるパイプのインクオブジェクト
  this.pipeInk = null

  //各子供パイプのオブジェクトをマネージャーに持たせて参照させる
  this.childPipe = { "blue": null, "red": null ,"green": null };

  this.getPipeErrorFlg = function getPipeErrorFlg(color){
    for (pipeColor in this.pipeStatus){
      if(pipeColor == color){
        if(this.pipeStatus[pipeColor] == "parentPut" || this.pipeStatus[pipeColor] == "childPut" ){
          //アラートでもならそうか
          return true;
        }
      }
    }

    return false;
  };
}
