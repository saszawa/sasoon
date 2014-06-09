var Slanter = Class.create(Sprite,{
	initialize: function(){
		Sprite.call(this,BOX_SIZE,BOX_SIZE);
		this._element = document.createElement('div');
		this._element.className = 'slanter';
		this.image = SLANTER
		this.rotation = 45;

		this.beamStatus = {
			topRight: {moveX: MOVE_PX  ,moveY: -MOVE_PX},
			rightDown:{moveX: MOVE_PX  ,moveY: MOVE_PX },
			downLeft: {moveX: -MOVE_PX ,moveY: MOVE_PX },
			leftTop:  {moveX: -MOVE_PX ,moveY: -MOVE_PX}
		};

		this.color = "green";

	},
	run: function(){
		clearTimeout(this.parentNode.endTimer);
		this.parentNode.endTimer = setTimeout(function(){
			GAME.currentScene.gameOver();
		},3500);

		var arc = new HitArc(this.color);
		arc.x = this.x-128;
		arc.y = this.y-128;
		this.parentNode.addChild(arc);

		var i = 0;
		for(var beam in this.beamStatus){
			// 初期設定的な
			var beamInit = {
				x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
				y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
				color: COLORS[this.color],
				parentBlock:this,
				beamLength: 2
			}
			this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
			i++;
		}
		//	出したら消滅
		this.parentNode.removeChild(this);
	}
});