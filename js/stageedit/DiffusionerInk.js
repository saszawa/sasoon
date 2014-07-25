var DiffusionerInk = Class.create(Diffusioner,{
  initialize: function(){
    Diffusioner.call(this,BOX_SIZE,BOX_SIZE);
    this._element = document.createElement('div');
    this._element.className = 'diffusioner';
    this.image = DIFFUSIONER;

    // 倍の早さ
    var movePx = MOVE_PX*2;

    this.color = "red";

  },
  ontouchstart: function(){
    creater.penColor = "diffusioner";
  }
});
