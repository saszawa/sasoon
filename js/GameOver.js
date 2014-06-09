var GameOver = Class.create(Group,{
	initialize: function(){
		Group.call(this);
		var that = this;

		this._element = document.createElement('div');

		this.gameOverLabel = new ExLabel('Game Over',640,100);
		this.gameOverLabel.setClassName('gameOverText');
		this.gameOverLabel.x = 0;
		this.gameOverLabel.y = -80;
		this.addChild(this.gameOverLabel);

		this.again = new Block('black');
		this.again._element.className = 'black';
		this.again._element.innerHTML = '<i class="icon-repeat">';
		this.again.x = 5*64+32;
		this.again.y = 480;

		this.addChild(this.again);
		this.again.addEventListener('touchend',function(){

			var arc = new HitArc('black');
			arc.x = that.again.x-128;
			arc.y = that.again.y-128;
			that.parentNode.addChild(arc);

			that.parentNode.stars.forEach(function(star){
				star.run = function(){}
				that.parentNode.removeChild(star);
			});

			that.parentNode.initStage();
			that.removeChild(that.gameOverLabel);
			that.removeChild(that.again);
			that.removeChild(that.stageSelect);
			that.parentNode.removeChild(that);
		});

		this.stageSelect = new Block('black');
		this.stageSelect._element.className = 'black';
		this.stageSelect._element.innerHTML = '<i class="icon-th">';
		this.stageSelect.x = 3*64+32;
		this.stageSelect.y = 480;

		this.addChild(this.stageSelect);
		this.stageSelect.addEventListener('touchend',function(){

			that.parentNode.removeChild(BACKGROUND_ARC);
			that.parentNode.stars.forEach(function(star){
				star.run = function(){}
				that.parentNode.removeChild(star);
			});

			that.removeChild(that.gameOverLabel);
			that.removeChild(that.again);
			that.removeChild(that.stageSelect);
			that.parentNode.removeChild(that);

			GAME.currentScene.stageSelect();
		});
	},
	onaddedtoscene: function(){
		this.gameOverLabel.tl.moveTo(0,230,30,BOUNCE_EASEOUT);
	}
});
