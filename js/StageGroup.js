var StageGroup = Class.create(Group,{
	initialize: function(){
		Group.call(this);
		this._element = document.createElement('div');
	},
	onaddedtoscene: function(){
		var that = this;

    var backToTop = createBacktoTopLabel();
		backToTop.on('touchend',function(){
			that.parentNode.backToTop();
		});

		this.parentNode.addChild(backToTop);
	}
});
