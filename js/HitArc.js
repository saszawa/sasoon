var HitArc = Class.create(Sprite,{
	initialize: function(color){
		Sprite.call(this,320,320);
		this.scaleX = 0.1;
		this.scaleY = 0.1;

		var arc = new Surface(320,320);
		arc.context.beginPath();
		arc.context.fillStyle = COLORS[color];
		arc.context.arc(160, 160, 160, 0, Math.PI*2, true);
		arc.context.fill();
		this.image = arc;

	},
	onaddedtoscene: function(){
		var that = this;
		var removeTarget = BACKGROUND_ARC;
		BACKGROUND_ARC = that;
		this.tl.scaleTo(5,5,20)
			.then(function(){
				GAME.currentScene.removeChild(removeTarget);
			});
	}
});
