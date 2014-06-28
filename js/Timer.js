var Timer = Class.create(Label,{
	initialize: function(){
		Label.call(this);
		this.timer = 20;
		this.text = this.timer;
		this.font = '400px Bitter';
		this.color = COLORS.blue;
		this.width = 640;
		this.height = 640;
		this.originX = 320;
		this.originY = 320;
		this.opacity = 0.4;
		this.textAlign = 'center';
	},
	onaddedtoscene: function(){
		this.tl.scaleTo(0.1,0.1,600);
	},
	onenterframe: function(){
		if(this.age % 30 === 0){
			this.text = --this.timer;
			if(this.timer === 5){
				this.color = COLORS.yellow;
			} else if(this.timer === 3){
				this.color = COLORS.red;
			}
			if(this.timer > 0 && !this.parentNode.canTap){
				this.parentNode.addChild(this.parentNode.retryLabel);

				currentStage[0].run();
				this.parentNode.removeChild(this);
				currentStage.splice(0,1);
			} else if(this.timer <= 0){
				this.parentNode.addChild(this.parentNode.retryLabel);

				this.parentNode.canTap = false;
				currentStage[0].run();
				this.parentNode.removeChild(this);
				currentStage.splice(0,1);
			}
		}
	}
});
