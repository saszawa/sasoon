var Beam = Class.create(Sprite,{
	initialize: function(direction ,init){
		Sprite.call(this,BEAM_SIZE,BEAM_SIZE);

		// DOMモード
		this._element = document.createElement('div');
		this._element.className = 'beam';

		// 初期状態
		this.backgroundColor = 'white';
		this.direction = direction;
		this.initX = init.x;
		this.initY = init.y;
		this.x = init.x;
		this.y = init.y;
		this.color = init.color;

		this.currentStage = currentStage;
		this.parentBlock = init.parentBlock;
		this.beamLength = init.beamLength*BOX_SIZE;

		this.COLORS = COLORS;

	},
	onenterframe: function(){
		// 衝突検知
		// やっぱこうなるの・・・
		var gimmicks = this.currentStage.length;
		for(var i = 0; i < gimmicks; i++){
			if(this.intersect(this.currentStage[i]) && this.currentStage[i] !== this.parentBlock){
				// 発射！
				this.currentStage[i].run();

				// 当たったら消える
				this.currentStage.splice(i,1);
				this.parentNode.removeChild(this);
				return;
			}
		}

		// Beamの移動と生存期間
		if(Math.abs(this.initX-this.x) < this.beamLength 
			&&  Math.abs(this.initY-this.y) < this.beamLength){
			this.x += this.direction.moveX;
			this.y += this.direction.moveY;
		} else {
			// 生存期間を過ぎると消えていく
			this.opacity -= 0.1;
			if(this.opacity < 0){
				this.parentNode.removeChild(this);
			}
		}
	}
});