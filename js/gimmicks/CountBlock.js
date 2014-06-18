var CountBlock = Class.create(Sprite,{
	initialize: function(color,count){
		Sprite.call(this,BOX_SIZE,BOX_SIZE);
		this._element = document.createElement('div');
		this._element.className = color+' count';
		this._element.innerHTML = count;
		this.count = count;
		this.color = color;
		this.currentStage = currentStage;

		// Beam用ステータス
		this.beamStatus = {
			top:{
				moveX: 0,
				moveY: -MOVE_PX,
			},
			right:{
				moveX: MOVE_PX,
				moveY: 0
			},
			down:{
				moveX: 0,
				moveY: MOVE_PX
			},
			left:{
				moveX: -MOVE_PX,
				moveY: 0
			}
		}
	},
	/**
	* Block.run()
	* 	4方向にBeamを出します
	*/
	run: function(){
		clearTimeout(this.parentNode.endTimer);
		this.parentNode.endTimer = setTimeout(function(){
			GAME.currentScene.gameOver();
		},3500);

		var arc = new HitArc(this.color);
		arc.x = this.x-128;
		arc.y = this.y-128;
		this.parentNode.addChild(arc);

		for(var beam in this.beamStatus){
			var beamInit = {
				x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
				y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
				parentBlock:this
			}
			this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
		}
		//	出したら消滅
		if(this.count > 1){
			this._element.innerHTML = --this.count;
			this.currentStage.push(this);
		} else {
			this.parentNode.removeChild(this);
		}
	}
});
