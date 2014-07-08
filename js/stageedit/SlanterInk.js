var SlanterInk = Class.create(Slanter,{
  initialize: function(color){
    Slanter.call(this,BOX_SIZE,BOX_SIZE);

    this._element = document.createElement('div');
    this._element.className = 'slanter';
    this.image = SLANTER;
    this.rotation = 45;

    this.color = "green";

  },
  ontouchstart: function(){
    creater.penColor = 'slanter';
  }
});
