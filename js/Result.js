var Result = Class.create(Group,{
  initialize: function(){
    Group.call(this);

    var that = this;

    this._element = document.createElement('div');

    this.clearLabel = new ExLabel('Stage '+(LEVEL+1)+' Clear !',640,80);
    this.clearLabel.setClassName('clearText');
    this.clearLabel.opacity = 0;
    this.clearLabel.x = 0;
    this.clearLabel.y = 100;
    this.addChild(this.clearLabel);


    //===============================//
    // Star
    //===============================//
    this.resultStars = [];

    this.resultStars[0] = new Star();
    this.resultStars[0].x = 160;
    this.resultStars[0].y = 320;

    this.resultStars[1] = new Star();
    this.resultStars[1].x = 288;
    this.resultStars[1].y = 288;

    this.resultStars[2] = new Star();
    this.resultStars[2].x = 416;
    this.resultStars[2].y = 320;

    this.resultStars.forEach(function(star){
      star.onaddedtoscene = null;
      star.scaleX = 0.8;
      star.scaleY = 0.8;
      star.opacity = 0;

      that.addChild(star);
    });

    //===============================//
    //  prev,next,stage,retry
    //===============================//
    this.nextStage = new Block('black');
    this.nextStage._element.className = 'black forResultBlock';
    this.nextStage._element.innerHTML = '<i class="icon-pageforward">';
    this.nextStage.x = 7 * 64;
    this.nextStage.y = 480;
    this.nextStage.addEventListener('touchend',function(){

      var arc = new HitArc('black');
      arc.x = that.nextStage.x-128;
      arc.y = that.nextStage.y-128;
      that.parentNode.addChild(arc);
      LEVEL++;
      that.parentNode.initStage();
      removeResult();
    });

    this.prevStage = new Block('black');
    this.prevStage._element.className = 'black forResultBlock';
    this.prevStage._element.innerHTML = '<i class="icon-pageback">';
    this.prevStage.x = 2 * 64;
    this.prevStage.y = 480;
    this.prevStage.addEventListener('touchend',function(){

      var arc = new HitArc('black');
      arc.x = that.prevStage.x-128;
      arc.y = that.prevStage.y-128;
      that.parentNode.addChild(arc);
      LEVEL--;
      that.parentNode.initStage();
      removeResult();
    });

    this.stageSelect = new Block('black');
    this.stageSelect._element.className = 'black forResultBlock';
    this.stageSelect._element.innerHTML = '<i class="icon-th">';
    this.stageSelect.x = 4*64+32;
    this.stageSelect.y = 432;
    this.stageSelect.addEventListener('touchend',function(){
      that.parentNode.removeChild(BACKGROUND_ARC);
      removeResult();
      GAME.currentScene.stageSelect();
    });

    this.retry = new Block('black');
    this.retry._element.className = 'black forResultBlock';
    this.retry._element.innerHTML = '<i class="icon-repeat">';
    this.retry.x = 4*64+32;
    this.retry.y = 528;
    this.retry.addEventListener('touchend',function(){
      var arc = new HitArc('black');
      arc.x = that.retry.x-128;
      arc.y = that.retry.y-128;
      that.parentNode.addChild(arc);
      that.parentNode.initStage();
      removeResult();
    });


    function removeResult(){
      that.removeChild(that.clearLabel);
      that.removeChild(that.nextStage);
      for(var i = 0 ;i < that.resultStars.length ;i++){
        that.removeChild(that.resultStars[i]);
      }
      that.parentNode.removeChild(that.prevStage);
      that.parentNode.removeChild(that.nextStage);
      that.parentNode.removeChild(that.stageSelect);
      that.parentNode.removeChild(that.retry);
      that.parentNode.removeChild(that);
    }

  },
  onaddedtoscene: function(){
    var that = this;
    var cnt = 0;

    this.clearLabel.tl.delay(10).fadeTo(1,10);
    for(var i = 0; i < this.parentNode.star; i++){
      this.resultStars[i].tl
      .delay(25)
      .fadeTo(1,10)
      .delay(15)
      .delay(15*i)
      .scaleTo(1.3,1.3,10).and().rotateTo(144,10).then(function(){
        that.resultStars[cnt++].image = YELLOW_STAR;
        playSound(GAME.assets['sound/star.mp3'].clone());
      });
    }
    this.tl.delay(50 + i*15).then(function(){
      if(LEVEL){
        that.parentNode.addChild(that.prevStage);
        that.prevStage.tl.scaleTo(0,0,0).then(function(){
          that.prevStage._element.className = 'black changeBu';
        }).scaleTo(1,1,15,BOUNCE_EASEOUT);
      }

      if(LEVEL !== STAGES.length - 1){
        that.parentNode.addChild(that.nextStage);
        that.nextStage.tl.scaleTo(0,0,0).then(function(){
          that.nextStage._element.className = 'black changeBu';
        }).scaleTo(1,1,15,BOUNCE_EASEOUT);
      }

      that.parentNode.addChild(that.stageSelect);
      that.stageSelect.tl.scaleTo(0,0,0).then(function(){
        that.stageSelect._element.className = 'black';
      }).scaleTo(1,1,15,BOUNCE_EASEOUT);

      that.parentNode.addChild(that.retry);
      that.retry.tl.scaleTo(0,0,0).then(function(){
        that.retry._element.className = 'black';
      }).scaleTo(1,1,15,BOUNCE_EASEOUT);
    });
  }
});
