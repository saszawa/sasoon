var Start = Class.create(Sprite,{
	initialize: function(){
		Sprite.call(this,BOX_SIZE,BOX_SIZE);

		// DOMモード
		this._element = document.createElement('div');
		this._element.className = 'start';
		this.backgroundColor = COLORS.white;

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
		};
	},
	run: function(){
		var arc = new HitArc('white');
		arc.x = this.x-128;
		arc.y = this.y-128;
		this.parentNode.addChild(arc);

    GAME.assets['sound/start.mp3'].clone().play();

		var i = 0;
		for(var beam in this.beamStatus){
			if(DIRECTIONS['white'][i]){
				// 初期設定的な
				var beamInit = {
					x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
					y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
					color: 'white',
					parentBlock:this,
					beamLength:BEAM_LENGTH
				}
				this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
			}
			i++;
		}
		//	出したら消滅
		this.parentNode.removeChild(this);
	}
});
