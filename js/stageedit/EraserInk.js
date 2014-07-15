var EraserInk = Class.create(ExLabel,{
  initialize: function(text,w,h){
    ExLabel.call(this,BOX_SIZE,BOX_SIZE);
    var width = w || 640;
    var height = h || 64;

    // DOMモード
    this._element = document.createElement('div');
    this._element.innerHTML = text;
  },
  ontouchstart: function(){
    creater.penColor = "eraser";
    //消すときはインク選ぶの前提
    creater.copyStage = void 0;
    creater.copyStage = creater.currentStage.concat();
  }
});
