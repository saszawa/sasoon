var StageGroup = Class.create(Group,{
  initialize: function(){
    Group.call(this);
    this._element = document.createElement('div');
  },
  onaddedtoscene: function(){
    var that = this;

    var backToTop = createBacktoTopLabel();
    backToTop.on('touchend',function(){

      // 子ノードを削除して遷移
      that.parentNode.backToTop();
      var sceneChild = that.parentNode.childNodes.length;
      for(var i = 0 ; i < sceneChild;i++){
        that.parentNode.removeChild(that.childNodes[sceneChild-i-1]);
      }
    });

    this.parentNode.addChild(backToTop);

    var playerStar = createPlayerStatus(userData);
    this.parentNode.addChild(playerStar);
  }
});
