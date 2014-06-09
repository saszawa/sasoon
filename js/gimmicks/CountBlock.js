var CountBlock = Class.create(Sprite,{
	initialize: function(color,count){
		Sprite.call(this,BOX_SIZE,BOX_SIZE);
		this._element = document.createElement('div');
		this._element.className = color+' count';
		this._element.innerHTML = count;
		this.count = count;
		this.color = color;
		this.currentStage = currentStage;

		var specFix = (BEAM_SIZE - HIGH_SPECTRUM)/2;

		// Beam用ステータス
		this.beamStatus = {
			top:{
				specW: HIGH_SPECTRUM,
				specH: MOVE_PX,
				specX: specFix,
				specY: BEAM_SIZE,
				moveX: 0,
				moveY: -MOVE_PX,
			},
			right:{
				specW: MOVE_PX,
				specH: HIGH_SPECTRUM,
				specX: -MOVE_PX,
				specY: specFix,
				moveX: MOVE_PX,
				moveY: 0
			},
			down:{
				specW: HIGH_SPECTRUM,
				specH: MOVE_PX,
				specX: specFix,
				specY: -MOVE_PX,
				moveX: 0,
				moveY: MOVE_PX
			},
			left:{
				specW: MOVE_PX,
				specH: HIGH_SPECTRUM,
				specX: BEAM_SIZE,
				specY: specFix,
				moveX: -MOVE_PX,
				moveY: 0
			}
		};
	},
	/**
	* Block.run()
	* 	4方向にBeamを出します
	*/
	run: function(i){

		var arc = new HitArc(this.color);
		arc.x = this.x-128;
		arc.y = this.y-128;
		this.parentNode.addChild(arc);

		var i = 0;
		for(var beam in this.beamStatus){
			if(DIRECTIONS[this.color][i]){
				// 初期設定的な
				var beamInit = {
					x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
					y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
					color: this.color,
					parentBlock:this
				}
				this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
			}
			i++;
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