var Goal = Class.create(Sprite,{
	initialize: function(){
		Sprite.call(this,BOX_SIZE,BOX_SIZE);

		this._element = document.createElement('div');
		this._element.className = 'goal';
		this.scaleX = 0.8;
		this.scaleY = 0.8;
		this.distance = 1;

		this.tl.scaleTo(0.6,0.6,30,CUBIC_EASEIN).scaleTo(0.8,0.8,30,CUBIC_EASEOUT).loop();
	},
	run: function(){
		clearTimeout(this.parentNode.endTimer);
		this.parentNode.cleared = true;

		this.parentNode.removeChild(this.parentNode.retryLabel);

    playSound(GAME.assets['sound/goal.mp3'].clone());

		var that = this;

		// 星の削除
		this.parentNode.stars.forEach(function(star){
			star.run = function(){}
			that.parentNode.removeChild(star);
		});

		this.tl.clear().scaleTo(30,30,30).then(function(){
			// 残ったギミックの削除
			currentStage.forEach(function(gimmick){
				that.parentNode.removeChild(gimmick);
			});
			that.parentNode.removeChild(BACKGROUND_ARC);
		}).delay(30).fadeTo(0,15).then(function(){
			that.parentNode.showResult();
			that.parentNode.removeChild(that);
		});
	}
});
