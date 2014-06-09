var StageGroup = Class.create(Group,{
	initialize: function(){
		Group.call(this);
		this._element = document.createElement('div');
	},
	onaddedtoscene: function(){
		var that = this;

		var backToTop = new ExLabel('TOPへ戻る',160,50);
		backToTop.setClassName('backToTopText');
		backToTop.x = 0.5 * 64;
		backToTop.y = 8.5 * 64;
		backToTop.on('touchend',function(){
			that.parentNode.backToTop();
		});

		this.parentNode.addChild(backToTop);
	}
});
