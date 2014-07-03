var Linker = Class.create(Sprite,{
	initialize: function(color){
		Sprite.call(this,BOX_SIZE,BOX_SIZE);
		this._element = document.createElement('div');
		this._element.className = 'linker';

		// リンカー
		LINKER = new Surface(BOX_SIZE,BOX_SIZE);
		var ctxLn = LINKER.context;
		ctxLn.fillStyle = COLORS[color];
		ctxLn.strokeStyle = COLORS.white;
		ctxLn.lineWidth = 3;
		ctxLn.beginPath();
		drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxLn);
		ctxLn.fill();
		ctxLn.stroke();
		ctxLn.closePath();


		this.image = LINKER;
		this.color = color;

		var movePx = MOVE_PX*2;

		this.currentStage = currentStage;
	},
	run: function(){
		var gimmicks = this.currentStage.length;


		var runNum = [];
		for(var i = 0; i < gimmicks; i++){
			if(this.currentStage[i].color === this.color && this !== this.currentStage[i]){
				this.currentStage[i].run();
				runNum.push(i);
			}
		}
		for(var i = 0 ;i < runNum ;i++){
			this.currentStage.splice(runNum[i],1);
		}
		this.parentNode.removeChild(this);
	}
});
