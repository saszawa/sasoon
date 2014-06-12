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

			// 子ノードを削除して遷移
			var childLength = that.childNodes.length;
			for(var i = 0 ; i < childLength;i++){
				that.removeChild(that.childNodes[childLength-i-1]);
			}

			that.parentNode.backToTop();
			var sceneChild = that.parentNode.childNodes.length;
			for(var i = 0 ; i < sceneChild;i++){
				that.parentNode.removeChild(that.childNodes[sceneChild-i-1]);
			}
		});

		this.parentNode.addChild(backToTop);
	}
});
