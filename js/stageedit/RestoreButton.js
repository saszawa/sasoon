var RestoreButton = Class.create(ExLabel,{
  initialize: function(text,w,h){
    ExLabel.call(this,BOX_SIZE,BOX_SIZE);
    var width = w || 640;
    var height = h || 64;

    // DOMモード
    this._element = document.createElement('div');
    this._element.innerHTML = text;
  },
  ontouchstart: function(){
    //startが置いてあるかどうか
    console.log("asdasd");
  },
  setClassName: function(className){
    this._element.className = className;
  }
});