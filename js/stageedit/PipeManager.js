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
  }

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

  //どっかであり得ないパターンがあるかどうか
  this.getPipeAnyError = function getPipeErrorFlg(){
    for (pipeColor in this.pipeStatus){
      if(this.pipeStatus[pipeColor] == "parentPut" || this.pipeStatus[pipeColor] == "noneDirection" ){
        return true;
      }
    }
    return false;
  };
}
