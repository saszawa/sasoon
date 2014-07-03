var VolumeSlider = Class.create(Sprite,{
  initialize: function(w,h){
    var width = w || 640;
    var height = h || 64;
    Sprite.call(this,width,height);
    this.x = 118;
    this.y = 330;

    this._element = document.createElement('div');
    this._element.innerHTML = '<input type="range" max="1.0" step="0.1"/>';
    this._element.className = 'volumeSlider';
  },
  ontouchend: function(){
    //childNodes[0]がinput rangeであると仮定
    VOLUME = this._element.childNodes[0].value;
  }
});
