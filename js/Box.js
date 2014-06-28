var Box = Class.create(Sprite,{
	initialize: function(){
		Sprite.call(this,BOX_SIZE,BOX_SIZE);
		// DOMモード
		this._element = document.createElement('div');
		this._element.className = 'box';
		this.moved = false;
	},
	ontouchstart: function(e){
		this.startEvent = e;
		this.moved = false;
		this._element.className = 'box touched';
	},
	ontouchmove: function(e){
		if(Math.abs(this.startEvent.x - e.x) > 10 || Math.abs(this.startEvent.y - e.y) > 10){
			this.moved = true;
		}
	},
	ontouchend: function(){
		this._element.className = 'box';
		if(!this.parentNode.canTap){
			return;
		} else if(this.moved){
			return;
		}
		this.parentNode.canTap = false;
		var block = new Block('white');
		block.x = this.x;
		block.y = this.y;
		currentStage.push(block);
		this.parentNode.addChild(block);
	}
});
