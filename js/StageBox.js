var StageBox = Class.create(Sprite,{
	initialize: function(level,star){
		Sprite.call(this,BOX_SIZE*2,BOX_SIZE*2);
		this._element = document.createElement('div');
		this._element.className = 'stageBox';
		this._element.innerHTML = level+1;
		this.backgroundColor = COLORS.white;
		this.image = SCORE_STARS[star];
		this.level = level;
		this.moved = false;
	},
	ontouchstart: function(e){
		this.startEvent = e;
		this.moved = false;
	},
	ontouchmove: function(e){
		if(Math.abs(this.startEvent.x - e.x) > 10 || Math.abs(this.startEvent.y - e.y) > 10){
			this.moved = true;
		}
	},
	ontouchend: function(e){
		if(this.moved){
			return;
		}
		GAME.currentScene.selectedStage(this.level);
	}
});
