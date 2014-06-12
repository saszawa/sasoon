var TitleBackAnim = Class.create(Group,{
    initialize: function(){
        Group.call(this);

        // this._element = document.createElement('div');
        // this._element.className = 'backgroundAnim';

        this.count = 3;
        this.next = 0;

        this.blocks = [new Block('red') ,new Block('blue') ,new Block('green')];

        this.positions = [{x:2,y:2},{x:7,y:2},{x:7,y:7},{x:2,y:7}];

    },
    onaddedtoscene: function(){

        var that = this;

        for(var i = 0;i<this.blocks.length;i++){
            var block = this.blocks[i];
            block.x = this.positions[i].x * BOX_SIZE;
            block.y = this.positions[i].y * BOX_SIZE;
            this.parentNode.addChild(block);

            block.run = function(){
                console.log('call');
                if(!this.parentNode){
                    return;
                }
                var arc = new HitArc(this.color);
                arc.x = this.x-128;
                arc.y = this.y-128;
                this.parentNode.addChild(arc);

                that.next++;
                if(that.next===3){
                    that.next = 0;
                }

                for(var beam in this.beamStatus){
                    // 初期設定的な
                    var beamInit = {
                        x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
                        y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
                        color: this.color,
                        parentBlock:this,
                        beamLength:BEAM_LENGTH
                    }
                    this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
                }
                //	出したら移動
                this.x = that.positions[that.count].x * BOX_SIZE;
                this.y = that.positions[that.count].y * BOX_SIZE;
                that.count++;

                if(that.count === 4){
                    that.count = 0;
                }
            }
        }
    },
    startAnim: function(){
        var that = this;
        this.parentNode.loopTimer = setInterval(function(){
            that.blocks[that.next].run();
        },2000);
    }
});
