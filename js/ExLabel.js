var ExLabel = Class.create(Sprite,{
  initialize: function(text,w,h){
    var width = w || 640;
    var height = h || 64;
    Sprite.call(this,width,height);

    this._element = document.createElement('div');
    this._element.innerHTML = text;
  },
  setClassName: function(className){
    this._element.className = className;
  }
});
