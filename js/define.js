/*
 *global定義
 */
var GAME;

// 定数
var MOVE_PX       = 4;

var BOX_SIZE      = 64
var BOX_HALF      = BOX_SIZE/2;

var BEAM_SIZE     = 32;
var BEAM_LENGTH   = 3;

var LOW_SPECTRUM  = MOVE_PX;
var HIGH_SPECTRUM = 24;

var LEVEL         = 0;


var DIRECTIONS = {
  black:  [true ,true ,true ,true],
  white:  [true ,true ,true ,true],
  red:    [true ,true ,true ,true],
  green:  [true ,true ,true ,true],
  blue:   [true ,true ,true ,true],
  orange: [true ,false ,true ,false],
  purple: [false ,true ,false ,true]
};

var TUTODIRECTIONS = {
  start:  [true ,true ,true ,true],
  black:  [true ,true ,true ,true],
  white:  [true ,true ,true ,true],
  red:    [true ,true ,true ,true],
  green:  [true ,true ,true ,true],
  blue:   [true ,true ,true ,true],
  orange: [true ,false ,true ,false],
  purple: [false ,true ,false ,true]
};
var COLORS = {
  black:     '#555555',
  white:     '#ecf0f1',
  blue:      '#38B5FE',
  green:     '#36D7B7',
  red:       '#ff6666',
  purple:    '#BF77EC',
  yellow:    '#F4D03F',
  orange:    '#FFA533',
  pink:      '#FFCCFF',
  pureWhite: '#fff'
};

var BACKGROUND_ARC = null;


//星
var WHITE_STAR = null;
var YELLOW_STAR = null;
var SCORE_STARS = [];
var DIFFUSIONER = null;
var SLANTER = null;
var LINKER = null;
var ORANGE = null;
var PURPLE = null;

var PIPE_RED = null;
var PIPE_GREEN = null;
var PIPE_BLUE = null;
var PIPE_PURPLE = null;
var PIPE_ORANGE = null;
var PIPE_RED_OUT = null;
var PIPE_GREEN_OUT = null;
var PIPE_BLUE_OUT = null;
var PIPE_PURPLE_OUT = null;
var PIPE_ORANGE_OUT = null;
var PIPE_COLORS = null;

function drawStar(nX, nY, numVertex, longRadius, shortRadius, context2D) {
  var nStart = Math.PI;
  var nTheta = nStart / numVertex;
  var nRadians = 0;
  numVertex *= 2;
  nStart /= 2;
  context2D.moveTo(nX, -longRadius + nY);
  for (var i = 1; i < numVertex; i++) {
    nRadians = i * nTheta - nStart;
    context2D.lineTo(shortRadius * Math.cos(nRadians) + nX, shortRadius * Math.sin(nRadians) + nY);
    nRadians = (++i) * nTheta - nStart;
    context2D.lineTo(longRadius * Math.cos(nRadians) + nX, longRadius * Math.sin(nRadians) + nY);
  }
}

// ブロックが1×1
// ステージを10×10と考える
var currentStage = [];
// ステージの配列
var STAGES = [
  [
  { x:0 ,y:4 ,name: 'start'},
  { x:3 ,y:4 ,name: 'block',color:'red'},
  { x:3 ,y:2 ,name: 'star'},
  { x:3 ,y:6 ,name: 'star'},
  { x:6 ,y:2 ,name: 'star'},
  { x:9 ,y:4 ,name: 'goal'}
],
[
  { x:3 ,y:1 ,name: 'start'},
  { x:3 ,y:4 ,name: 'block',color:'green'},
  { x:0 ,y:4 ,name: 'star'},
  { x:3 ,y:7 ,name: 'star'},
  { x:6 ,y:2 ,name: 'star'},
  { x:9 ,y:4 ,name: 'goal'}
],
[
  { x:0 ,y:4 ,name: 'start'},
  { x:3 ,y:4 ,name: 'block',color:'red'},
  { x:6 ,y:4 ,name: 'block',color:'blue'},
  { x:3 ,y:2 ,name: 'star'},
  { x:6 ,y:2 ,name: 'star'},
  { x:8 ,y:2 ,name: 'star'},
  { x:8 ,y:7 ,name: 'goal'}
],
[
  { x:0 ,y:1 ,name: 'start'},
  { x:0 ,y:4 ,name: 'block',color:'red'},
  { x:3 ,y:4 ,name: 'block',color:'blue'},
  { x:6 ,y:1 ,name: 'star'},
  { x:6 ,y:7 ,name: 'star'},
  { x:9 ,y:2 ,name: 'star'},
  { x:9 ,y:4 ,name: 'block',color:'red'},
  { x:9 ,y:7 ,name: 'goal'}
],
[
  { x:0 ,y:1 ,name: 'start'},
  { x:3 ,y:1 ,name: 'block',color:'red'},
  { x:3 ,y:4 ,name: 'block',color:'blue'},
  { x:6 ,y:4 ,name: 'block',color:'green'},
  { x:9 ,y:7 ,name: 'block',color:'green'},
  { x:4 ,y:1 ,name: 'star'},
  { x:6 ,y:9 ,name: 'star'},
  { x:3 ,y:5 ,name: 'star'},
  { x:9 ,y:9 ,name: 'goal'}
],
[
  { x:0 ,y:4 ,name: 'start'},
  { x:2 ,y:4 ,name: 'block',color:'purple'},
  { x:5 ,y:4 ,name: 'block',color:'purple'},
  { x:6 ,y:7 ,name: 'block',color:'purple'},
  { x:9 ,y:4 ,name: 'star'},
  { x:6 ,y:1 ,name: 'star'},
  { x:3 ,y:7 ,name: 'star'},
  { x:9 ,y:7 ,name: 'goal'}
],
[
  { x:0 ,y:4 ,name: 'start'},
  { x:9 ,y:3 ,name: 'block',color:'purple'},
  { x:6 ,y:3 ,name: 'block',color:'red'},
  { x:6 ,y:2 ,name: 'star'},
  { x:3 ,y:3 ,name: 'star'},
  { x:3 ,y:4 ,name: 'block',color:'purple'},
  { x:6 ,y:4 ,name: 'block',color:'purple'},
  { x:9 ,y:5 ,name: 'block',color:'purple'},
  { x:6 ,y:5 ,name: 'block',color:'blue'},
  { x:6 ,y:6 ,name: 'star'},
  { x:3 ,y:5 ,name: 'goal'}
],
[
  { x:0 ,y:4 ,name: 'start'},
  { x:9 ,y:1 ,name: 'block',color:'blue'},
  { x:6 ,y:1 ,name: 'star'},
  { x:9 ,y:0 ,name: 'star'},
  { x:3 ,y:4 ,name: 'block',color:'purple'},
  { x:6 ,y:4 ,name: 'block',color:'purple'},
  { x:6 ,y:7 ,name: 'block',color:'purple'},
  { x:9 ,y:7 ,name: 'block',color:'red'},
  { x:9 ,y:9 ,name: 'star'},
  { x:3 ,y:7 ,name: 'goal'}
],
[
  { x:0 ,y:1 ,name: 'start'},
  { x:3 ,y:1 ,name: 'block',color:'purple'},
  { x:9 ,y:1 ,name: 'star'},
  { x:9 ,y:7 ,name: 'star'},
  { x:3 ,y:4 ,name: 'block',color:'blue'},
  { x:9 ,y:4 ,name: 'block',color:'red'},
  { x:3 ,y:7 ,name: 'block',color:'green'},
  { x:6 ,y:4 ,name: 'block',color:'purple'},
  { x:6 ,y:7 ,name: 'star'},
  { x:0 ,y:7 ,name: 'goal'}
],
[
  //10
  { x:0 ,y:9 ,name: 'start'},
  { x:3 ,y:9 ,name: 'block',color:'orange'},
  { x:3 ,y:6 ,name: 'block',color:'orange'},
  { x:6 ,y:3 ,name: 'block',color:'orange'},
  { x:3 ,y:0 ,name: 'star'},
  { x:0 ,y:3 ,name: 'star'},
  { x:6 ,y:0 ,name: 'star'},
  { x:6 ,y:6 ,name: 'goal'}
],
[
  { x:0 ,y:9 ,name: 'start'},
  { x:3 ,y:9 ,name: 'block',color:'purple'},
  { x:0 ,y:3 ,name: 'star'},
  { x:9 ,y:6 ,name: 'star'},
  { x:6 ,y:9 ,name: 'block',color:'blue'},
  { x:3 ,y:6 ,name: 'block',color:'red'},
  { x:6 ,y:6 ,name: 'block',color:'purple'},
  { x:6 ,y:3 ,name: 'block',color:'green'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:3 ,y:0 ,name: 'star'},
  { x:9 ,y:0 ,name: 'goal'}
],
[
  { x:2 ,y:4 ,name: 'start'},
  { x:3 ,y:5 ,name: 'block',color:'purple'},
  { x:4 ,y:4 ,name: 'block',color:'purple'},
  { x:6 ,y:2 ,name: 'block',color:'purple'},
  { x:6 ,y:6 ,name: 'block',color:'purple'},
  { x:3 ,y:2 ,name: 'block',color:'orange'},
  { x:5 ,y:5 ,name: 'block',color:'orange'},
  { x:7 ,y:4 ,name: 'block',color:'orange'},
  { x:7 ,y:2 ,name: 'star'},
  { x:4 ,y:6 ,name: 'star'},
  { x:0 ,y:5 ,name: 'star'},
  { x:5 ,y:3 ,name: 'goal'}
],
[
  //11
  { x:0 ,y:3 ,name: 'start'},
  { x:5 ,y:0 ,name: 'star'},
  { x:9 ,y:2 ,name: 'star'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:6 ,y:3 ,name: 'block',color:'purple'},
  { x:9 ,y:3 ,name: 'block',color:'red'},
  { x:5 ,y:6 ,name: 'block',color:'blue'},
  { x:3 ,y:6 ,name: 'block',color:'purple'},
  { x:9 ,y:4 ,name: 'star'},
  { x:1 ,y:6 ,name: 'goal'}
],
[
  //12
  { x:1 ,y:3 ,name: 'start'},
  { x:0 ,y:4 ,name: 'star'},
  { x:5 ,y:1 ,name: 'block',color:'red'},
  { x:7 ,y:1 ,name: 'star'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:6 ,y:3 ,name: 'block',color:'purple'},
  { x:8 ,y:3 ,name: 'block',color:'red'},
  { x:5 ,y:6 ,name: 'block',color:'blue'},
  { x:3 ,y:6 ,name: 'block',color:'purple'},
  { x:0 ,y:6 ,name: 'block',color:'green'},
  { x:8 ,y:9 ,name: 'star'},
  { x:5 ,y:9 ,name: 'block',color:'purple'},
  { x:0 ,y:9 ,name: 'goal'}
],
[
  //16
  { x:0 ,y:9 ,name: 'start'},
  { x:3 ,y:9 ,name: 'block',color:'blue'},
  { x:6 ,y:9 ,name: 'block',color:'orange'},
  { x:6 ,y:6 ,name: 'block',color:'red'},
  { x:9 ,y:6 ,name: 'block',color:'orange'},
  { x:9 ,y:3 ,name: 'block',color:'orange'},
  { x:3 ,y:6 ,name: 'star'},
  { x:3 ,y:3 ,name: 'star'},
  { x:6 ,y:0 ,name: 'star'},
  { x:9 ,y:0 ,name: 'goal'}
],
[
  //13
  { x:0 ,y:0 ,name: 'start'},
  { x:3 ,y:0 ,name: 'block',color:'purple'},
  { x:6 ,y:0 ,name: 'block',color:'purple'},
  { x:9 ,y:0 ,name: 'block',color:'red'},
  { x:4 ,y:3 ,name: 'star'},
  { x:0 ,y:3 ,name: 'block',color:'blue'},
  { x:5 ,y:3 ,name: 'star'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:6 ,y:3 ,name: 'block',color:'purple'},
  { x:9 ,y:6 ,name: 'block',color:'green'},
  { x:0 ,y:6 ,name: 'block',color:'green'},
  { x:3 ,y:6 ,name: 'star'},
  { x:6 ,y:6 ,name: 'goal'}
],
//13
[
  { x:0 ,y:4 ,name: 'start'},
  { x:2 ,y:4 ,name: 'block',color:'green'},
  { x:5 ,y:4 ,name: 'block',color:'green'},
  { x:5 ,y:2 ,name: 'block',color:'red'},
  { x:5 ,y:6 ,name: 'block',color:'blue'},
  { x:2 ,y:1 ,name: 'block',color:'purple'},
  { x:2 ,y:7 ,name: 'block',color:'purple'},
  { x:4 ,y:7 ,name: 'block',color:'red'},
  { x:4 ,y:1 ,name: 'block',color:'blue'},
  { x:8 ,y:3 ,name: 'block',color:'purple'},
  { x:8 ,y:5 ,name: 'block',color:'purple'},
  { x:6 ,y:3 ,name: 'block',color:'blue'},
  { x:6 ,y:5 ,name: 'block',color:'red'},
  { x:3 ,y:2 ,name: 'star'},
  { x:3 ,y:6 ,name: 'star'},
  { x:3 ,y:3 ,name: 'star'},
  { x:3 ,y:5 ,name: 'goal'}
],
[
  //14
  { x:0 ,y:9 ,name: 'start'},
  { x:3 ,y:0 ,name: 'block',color:'purple'},
  { x:6 ,y:0 ,name: 'block',color:'purple'},
  { x:9 ,y:0 ,name: 'block',color:'purple'},
  { x:9 ,y:3 ,name: 'block',color:'blue'},
  { x:4 ,y:0 ,name: 'block',color:'blue'},
  { x:5 ,y:0 ,name: 'star'},
  { x:6 ,y:3 ,name: 'block',color:'purple'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:0 ,y:3 ,name: 'block',color:'purple'},
  { x:0 ,y:6 ,name: 'block',color:'red'},
  { x:3 ,y:6 ,name: 'block',color:'purple'},
  { x:4 ,y:6 ,name: 'star'},
  { x:5 ,y:6 ,name: 'star'},
  { x:6 ,y:6 ,name: 'block',color:'purple'},
  { x:9 ,y:6 ,name: 'block',color:'purple'},
  { x:9 ,y:9 ,name: 'block',color:'green'},
  { x:6 ,y:9 ,name: 'block',color:'purple'},
  { x:3 ,y:9 ,name: 'block',color:'purple'},
  { x:0 ,y:0 ,name: 'goal'}
],
[
  //17
  { x:0 ,y:0 ,name: 'start'},
  { x:0 ,y:3 ,name: 'block',color:'orange'},
  { x:0 ,y:6 ,name: 'block',color:'orange'},
  { x:0 ,y:9 ,name: 'block',color:'purple'},
  { x:3 ,y:9 ,name: 'block',color:'red'},
  { x:9 ,y:6 ,name: 'block',color:'blue'},
  { x:9 ,y:9 ,name: 'block',color:'orange'},
  { x:3 ,y:6 ,name: 'block',color:'orange'},
  { x:3 ,y:3 ,name: 'block',color:'orange'},
  { x:3 ,y:1 ,name: 'block',color:'purple'},
  { x:6 ,y:1 ,name: 'block',color:'orange'},
  { x:6 ,y:3 ,name: 'block',color:'orange'},
  { x:9 ,y:1 ,name: 'block',color:'purple'},
  { x:6 ,y:8 ,name: 'star'},
  { x:6 ,y:0 ,name: 'star'},
  { x:8 ,y:6 ,name: 'star'},
  { x:9 ,y:3 ,name: 'goal'}
],
[
  //18
  { x:0 ,y:4 ,name: 'start'},
  { x:3 ,y:4 ,name: 'block',color:'purple'},
  { x:6 ,y:4 ,name: 'block',color:'orange'},
  { x:6 ,y:1 ,name: 'block',color:'purple'},
  { x:6 ,y:7 ,name: 'block',color:'purple'},
  { x:9 ,y:1 ,name: 'block',color:'purple'},
  { x:3 ,y:7 ,name: 'block',color:'red'},
  { x:9 ,y:7 ,name: 'block',color:'orange'},
  { x:7 ,y:3 ,name: 'block',color:'blue'},
  { x:3 ,y:9 ,name: 'star'},
  { x:3 ,y:1 ,name: 'star'},
  { x:5 ,y:3 ,name: 'star'},
  { x:9 ,y:3 ,name: 'goal'}
],
[
  //19
  { x:0 ,y:9 ,name: 'start'},
  { x:3 ,y:9 ,name: 'block',color:'blue'},
  { x:6 ,y:9 ,name: 'block',color:'orange'},
  { x:6 ,y:6 ,name: 'block',color:'red'},
  { x:9 ,y:6 ,name: 'block',color:'orange'},
  { x:9 ,y:3 ,name: 'block',color:'orange'},
  { x:0 ,y:2 ,name: 'block',color:'orange'},
  { x:9 ,y:0 ,name: 'block',color:'purple'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:3 ,y:4 ,name: 'block',color:'red'},
  { x:0 ,y:3 ,name: 'block',color:'green'},
  { x:6 ,y:0 ,name: 'block',color:'blue'},
  { x:4 ,y:0 ,name: 'block',color:'purple'},
  { x:3 ,y:5 ,name: 'star'},
  { x:9 ,y:9 ,name: 'star'},
  { x:6 ,y:2 ,name: 'star'},
  { x:0 ,y:0 ,name: 'goal'}
],
[
  //20
  { x:0 ,y:9 ,name: 'start'},
  { x:0 ,y:6 ,name: 'block',color:'purple'},
  { x:3 ,y:6 ,name: 'block',color:'orange'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:2 ,y:8 ,name: 'block',color:'blue'},
  { x:6 ,y:0 ,name: 'block',color:'purple'},
  { x:5 ,y:5 ,name: 'block',color:'blue'},
  { x:5 ,y:8 ,name: 'star'},
  { x:6 ,y:7 ,name: 'star'},
  { x:8 ,y:5 ,name: 'star'},
  { x:6 ,y:3 ,name: 'block',color:'orange'},
  { x:9 ,y:0 ,name: 'goal'}
],
[
  //21
  { x:0 ,y:0 ,name: 'start'},
  { x:3 ,y:0 ,name: 'block',color:'purple'},
  { x:6 ,y:0 ,name: 'block',color:'red'},
  { x:6 ,y:3 ,name: 'block',color:'purple'},
  { x:3 ,y:6 ,name: 'slanter'},
  { x:1 ,y:4 ,name: 'star'},
  { x:5 ,y:4 ,name: 'star'},
  { x:1 ,y:8 ,name: 'star'},
  { x:5 ,y:8 ,name: 'goal'}
],
[
  //22
  { x:0 ,y:6 ,name: 'start'},
  { x:3 ,y:1 ,name: 'block',color:'red'},
  { x:3 ,y:4 ,name: 'slanter'},
  { x:3 ,y:6 ,name: 'block',color:'orange'},
  { x:5 ,y:6 ,name: 'block',color:'orange'},
  { x:5 ,y:4 ,name: 'slanter'},
  { x:5 ,y:1 ,name: 'block',color:'blue'},
  { x:0 ,y:2 ,name: 'star'},
  { x:7 ,y:2 ,name: 'star'},
  { x:7 ,y:6 ,name: 'star'},
  { x:8 ,y:1 ,name: 'goal'}
],
[
  { x:1 ,y:4 ,name: 'start'},
  { x:3 ,y:4 ,name: 'block',color:'orange'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:3 ,y:6 ,name: 'block',color:'purple'},
  { x:6 ,y:3 ,name: 'block',color:'orange'},
  { x:5 ,y:6 ,name: 'block',color:'orange'},
  { x:2 ,y:6 ,name: 'slanter'},
  { x:6 ,y:6 ,name: 'slanter'},
  { x:4 ,y:8 ,name: 'block',color:'orange'},
  { x:5 ,y:2 ,name: 'star'},
  { x:6 ,y:0 ,name: 'star'},
  { x:4 ,y:5 ,name: 'star'},
  { x:7 ,y:4 ,name: 'goal'}
],
[
  //23
  { x:1 ,y:9 ,name: 'start'},
  { x:4 ,y:9 ,name: 'block',color:'orange'},
  { x:4 ,y:6 ,name: 'slanter'},
  { x:3 ,y:5 ,name: 'slanter'},
  { x:1 ,y:3 ,name: 'slanter'},
  { x:2 ,y:2 ,name: 'slanter'},
  { x:4 ,y:0 ,name: 'slanter'},
  { x:5 ,y:1 ,name: 'slanter'},
  { x:7 ,y:3 ,name: 'slanter'},
  { x:8 ,y:4 ,name: 'slanter'},
  { x:7 ,y:5 ,name: 'slanter'},
  { x:6 ,y:3 ,name: 'slanter'},
  { x:0 ,y:0 ,name: 'star'},
  { x:9 ,y:1 ,name: 'star'},
  { x:9 ,y:7 ,name: 'star'},
  { x:5 ,y:4 ,name: 'goal'}
],
[
  //24
  { x:0 ,y:4 ,name: 'start'},
  { x:2 ,y:4 ,name: 'block',color:'purple'},
  { x:5 ,y:4 ,name: 'slanter'},
  { x:1 ,y:2 ,name: 'block',color:'purple'},
  { x:3 ,y:0 ,name: 'block',color:'orange'},
  { x:1 ,y:6 ,name: 'block',color:'purple'},
  { x:3 ,y:8 ,name: 'block',color:'orange'},
  { x:9 ,y:2 ,name: 'block',color:'blue'},
  { x:7 ,y:0 ,name: 'block',color:'red'},
  { x:9 ,y:6 ,name: 'block',color:'green'},
  { x:7 ,y:8 ,name: 'block',color:'blue'},
  { x:7 ,y:3 ,name: 'block',color:'red'},
  { x:5 ,y:8 ,name: 'star'},
  { x:9 ,y:3 ,name: 'star'},
  { x:4 ,y:6 ,name: 'star'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:5 ,y:3 ,name: 'goal'}
],
[
  //25
  { x:0 ,y:5 ,name: 'start'},
  { x:3 ,y:3 ,name: 'slanter'},
  { x:0 ,y:3 ,name: 'block',color:'blue'},
  { x:5 ,y:8 ,name: 'block',color:'green'},
  { x:8 ,y:8 ,name: 'block',color:'blue'},
  { x:8 ,y:6 ,name: 'block',color:'red'},
  { x:5 ,y:6 ,name: 'block',color:'orange'},
  { x:6 ,y:4 ,name: 'block',color:'orange'},
  { x:1 ,y:4 ,name: 'star'},
  { x:5 ,y:3 ,name: 'star'},
  { x:5 ,y:1 ,name: 'star'},
  { x:3 ,y:6 ,name: 'slanter'},
  { x:6 ,y:6 ,name: 'slanter'},
  { x:6 ,y:3 ,name: 'slanter'},
  { x:8 ,y:4 ,name: 'goal'}
],
[
  //26
  { x:0 ,y:9 ,name: 'start'},
  { x:3 ,y:9 ,name: 'block',color:'orange'},
  { x:9 ,y:6 ,name: 'block',color:'purple'},
  { x:9 ,y:1 ,name: 'block',color:'purple'},
  { x:3 ,y:6 ,name: 'slanter'},
  { x:5 ,y:4 ,name: 'slanter'},
  { x:3 ,y:2 ,name: 'slanter'},
  { x:5 ,y:0 ,name: 'slanter'},
  { x:7 ,y:2 ,name: 'slanter'},
  { x:6 ,y:3 ,name: 'star'},
  { x:6 ,y:6 ,name: 'star'},
  { x:6 ,y:4 ,name: 'star'},
  { x:7 ,y:1 ,name: 'goal'}
],
[
  //27
  { x:0 ,y:9 ,name: 'start'},
  { x:3 ,y:9 ,name: 'block',color:'orange'},
  { x:3 ,y:6 ,name: 'slanter'},
  { x:2 ,y:5 ,name: 'slanter'},
  { x:0 ,y:3 ,name: 'slanter'},
  { x:1 ,y:2 ,name: 'slanter'},
  { x:3 ,y:0 ,name: 'slanter'},
  { x:4 ,y:1 ,name: 'slanter'},
  { x:6 ,y:3 ,name: 'slanter'},
  { x:7 ,y:4 ,name: 'slanter'},
  { x:5 ,y:6 ,name: 'slanter'},
  { x:3 ,y:5 ,name: 'slanter'},
  { x:7 ,y:5 ,name: 'block',color:'purple'},
  { x:5 ,y:3 ,name: 'block',color:'purple'},
  { x:5 ,y:5 ,name: 'block',color:'orange'},
  { x:3 ,y:3 ,name: 'block',color:'blue'},
  { x:1 ,y:3 ,name: 'star'},
  { x:3 ,y:1 ,name: 'star'},
  { x:7 ,y:3 ,name: 'star'},
  { x:4 ,y:4 ,name: 'goal'}
],
[
  //28
  { x:0 ,y:5 ,name: 'start'},
  { x:3 ,y:5 ,name: 'block',color:'red'},
  { x:3 ,y:2 ,name: 'block',color:'purple'},
  { x:3 ,y:8 ,name: 'block',color:'purple'},
  { x:6 ,y:2 ,name: 'block',color:'red'},
  { x:9 ,y:1 ,name: 'block',color:'red'},
  { x:8 ,y:0 ,name: 'block',color:'blue'},
  { x:9 ,y:4 ,name: 'block',color:'green'},
  { x:9 ,y:6 ,name: 'star'},
  { x:5 ,y:8 ,name: 'block',color:'purple'},
  { x:5 ,y:0 ,name: 'block',color:'purple'},
  { x:8 ,y:3 ,name: 'block',color:'purple'},
  { x:9 ,y:0 ,name: 'star'},
  { x:7 ,y:8 ,name: 'block',color:'blue'},
  { x:7 ,y:1 ,name: 'block',color:'red'},
  { x:7 ,y:6 ,name: 'block',color:'green'},
  { x:6 ,y:5 ,name: 'star'},
  { x:9 ,y:5 ,name: 'goal'}
],
[
  //29
  { x:1 ,y:1 ,name: 'start'},
  { x:6 ,y:3 ,name: 'block',color:'purple'},
  { x:4 ,y:0 ,name: 'block',color:'red'},
  { x:7 ,y:0 ,name: 'block',color:'blue'},
  { x:4 ,y:3 ,name: 'block',color:'green'},
  { x:9 ,y:3 ,name: 'block',color:'red'},
  { x:6 ,y:5 ,name: 'block',color:'red'},
  { x:5 ,y:5 ,name: 'block',color:'blue'},
  { x:3 ,y:1 ,name: 'block',color:'purple'},
  { x:6 ,y:1 ,name: 'block',color:'purple'},
  { x:9 ,y:4 ,name: 'block',color:'blue'},
  { x:3 ,y:5 ,name: 'block',color:'purple'},
  { x:7 ,y:4 ,name: 'star'},
  { x:9 ,y:7 ,name: 'block',color:'red'},
  { x:7 ,y:7 ,name: 'star'},
  { x:5 ,y:7 ,name: 'block',color:'blue'},
  { x:3 ,y:4 ,name: 'block',color:'green'},
  { x:9 ,y:9 ,name: 'block',color:'green'},
  { x:6 ,y:9 ,name: 'block',color:'blue'},
  { x:2 ,y:9 ,name: 'block',color:'red'},
  { x:2 ,y:7 ,name: 'block',color:'green'},
  { x:9 ,y:2 ,name: 'star'},
  { x:0 ,y:9 ,name: 'goal'}
],
[
  //30
  { x:1 ,y:8 ,name: 'start'},
  { x:3 ,y:8 ,name: 'block',color:'purple'},
  { x:5 ,y:8 ,name: 'block',color:'purple'},
  { x:8 ,y:8 ,name: 'block',color:'orange'},
  { x:8 ,y:6 ,name: 'block',color:'blue'},
  { x:5 ,y:4 ,name: 'diffusioner'},
  { x:4 ,y:4 ,name: 'block',color:'red'},
  { x:4 ,y:3 ,name: 'slanter'},
  { x:6 ,y:4 ,name: 'block',color:'orange'},
  { x:5 ,y:3 ,name: 'block',color:'orange'},
  { x:6 ,y:3 ,name: 'block',color:'orange'},
  { x:6 ,y:5 ,name: 'block',color:'purple'},
  { x:4 ,y:5 ,name: 'block',color:'purple'},
  { x:6 ,y:1 ,name: 'star'},
  { x:2 ,y:1 ,name: 'star'},
  { x:2 ,y:5 ,name: 'star'},
  { x:5 ,y:0 ,name: 'goal'}
],
[
  //31
  { x:0 ,y:0 ,name: 'start'},
  { x:2 ,y:4 ,name: 'diffusioner'},
  { x:8 ,y:4 ,name: 'diffusioner'},
  { x:0 ,y:3 ,name: 'block',color:'purple'},
  { x:3 ,y:4 ,name: 'block',color:'blue'},
  { x:2 ,y:3 ,name: 'block',color:'green'},
  { x:8 ,y:5 ,name: 'block',color:'orange'},
  { x:5 ,y:1 ,name: 'star'},
  { x:5 ,y:7 ,name: 'star'},
  { x:8 ,y:2 ,name: 'star'},
  { x:8 ,y:8 ,name: 'goal'}
],
[
  //32
  { x:0 ,y:9 ,name: 'start'},
  { x:3 ,y:2 ,name: 'diffusioner'},
  { x:7 ,y:2 ,name: 'diffusioner'},
  { x:7 ,y:6 ,name: 'diffusioner'},
  { x:3 ,y:6 ,name: 'diffusioner'},
  { x:5 ,y:4 ,name: 'slanter'},
  { x:2 ,y:7 ,name: 'slanter'},
  { x:8 ,y:7 ,name: 'slanter'},
  { x:3 ,y:3 ,name: 'slanter'},
  { x:5 ,y:7 ,name: 'block',color:'orange'},
  { x:5 ,y:9 ,name: 'block',color:'orange'},
  { x:2 ,y:9 ,name: 'block',color:'purple'},
  { x:5 ,y:0 ,name: 'block',color:'purple'},
  { x:5 ,y:2 ,name: 'block',color:'red'},
  { x:1 ,y:2 ,name: 'block',color:'orange'},
  { x:1 ,y:8 ,name: 'star'},
  { x:9 ,y:8 ,name: 'star'},
  { x:1 ,y:0 ,name: 'star'},
  { x:7 ,y:0 ,name: 'goal'}
],
[
  //33
  { x:0 ,y:0 ,name: 'start'},
  { x:2 ,y:4 ,name: 'diffusioner'},
  { x:8 ,y:4 ,name: 'diffusioner'},
  { x:0 ,y:3 ,name: 'block',color:'purple'},
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:2 ,y:5 ,name: 'block',color:'purple'},
  { x:3 ,y:4 ,name: 'block',color:'blue'},
  { x:2 ,y:3 ,name: 'block',color:'green'},
  { x:7 ,y:3 ,name: 'slanter'},
  { x:8 ,y:5 ,name: 'block',color:'orange'},
  { x:5 ,y:1 ,name: 'star'},
  { x:6 ,y:7 ,name: 'star'},
  { x:9 ,y:1 ,name: 'star'},
  { x:8 ,y:8 ,name: 'goal'}
],
[
  //34
  { x:0 ,y:8 ,name: 'start'},
  { x:3 ,y:1 ,name: 'diffusioner'},
  { x:7 ,y:1 ,name: 'diffusioner'},
  { x:7 ,y:5 ,name: 'diffusioner'},
  { x:3 ,y:5 ,name: 'diffusioner'},
  { x:5 ,y:3 ,name: 'slanter'},
  { x:2 ,y:5 ,name: 'slanter'},
  { x:5 ,y:6 ,name: 'block',color:'orange'},
  { x:7 ,y:6 ,name: 'block',color:'orange'},
  { x:5 ,y:8 ,name: 'block',color:'orange'},
  { x:4 ,y:1 ,name: 'block',color:'orange'},
  { x:2 ,y:8 ,name: 'block',color:'purple'},
  { x:8 ,y:1 ,name: 'block',color:'purple'},
  { x:3 ,y:2 ,name: 'block',color:'purple'},
  { x:3 ,y:4 ,name: 'block',color:'purple'},
  { x:7 ,y:4 ,name: 'block',color:'purple'},
  { x:2 ,y:2 ,name: 'block',color:'blue'},
  { x:6 ,y:1 ,name: 'block',color:'orange'},
  { x:2 ,y:4 ,name: 'block',color:'red'},
  { x:5 ,y:1 ,name: 'star'},
  { x:3 ,y:3 ,name: 'star'},
  { x:7 ,y:3 ,name: 'star'},
  { x:0 ,y:0 ,name: 'goal'}
],
[
  //35
  { x:0 ,y:8 ,name: 'start'},
  { x:1 ,y:6 ,name: 'diffusioner'},
  { x:3 ,y:8 ,name: 'slanter'},
  { x:2 ,y:5 ,name: 'slanter'},
  { x:4 ,y:3 ,name: 'diffusioner'},
  { x:5 ,y:2 ,name: 'slanter'},
  { x:8 ,y:4 ,name: 'slanter'},
  { x:3 ,y:5 ,name: 'block',color:'purple'},
  { x:5 ,y:5 ,name: 'block',color:'orange'},
  { x:5 ,y:5 ,name: 'block',color:'orange'},
  { x:7 ,y:7 ,name: 'block',color:'orange'},
  { x:5 ,y:7 ,name: 'slanter'},
  { x:3 ,y:9 ,name: 'block',color:'red'},
  { x:4 ,y:6 ,name: 'star'},
  { x:6 ,y:4 ,name: 'star'},
  { x:3 ,y:2 ,name: 'star'},
  { x:3 ,y:7 ,name: 'goal'}
],
[
  //36
  { x:1 ,y:2 ,name: 'start'},
  { x:7 ,y:2 ,name: 'pipe' ,color:'blue',pipeStatus:{x:4 ,y:7 ,direction:'right'} },
  { x:6 ,y:7 ,name: 'block',color:'red'},
  { x:4 ,y:4 ,name: 'star'},
  { x:6 ,y:9 ,name: 'star'},
  { x:9 ,y:7 ,name: 'star'},
  { x:6 ,y:4 ,name: 'goal'}
],
[
  //37
  { x:1 ,y:1 ,name: 'start'},
  { x:7 ,y:1 ,name: 'pipe' ,color:'red'   ,pipeStatus:{x:1 ,y:8 ,direction:'right'} },
  { x:4 ,y:4 ,name: 'pipe' ,color:'green' ,pipeStatus:{x:8 ,y:6 ,direction:'left'} },
  { x:4 ,y:1 ,name: 'block',color:'red'},
  { x:5 ,y:6 ,name: 'block',color:'red'},
  { x:4 ,y:8 ,name: 'block',color:'red'},
  { x:5 ,y:0 ,name: 'star'},
  { x:8 ,y:3 ,name: 'star'},
  { x:2 ,y:6 ,name: 'star'},
  { x:2 ,y:3 ,name: 'goal'}
],
[
  //38
  { x:0 ,y:4 ,name: 'start'},
  { x:2 ,y:3 ,name: 'block',color:'red'},
  { x:2 ,y:5 ,name: 'block',color:'blue'},
  { x:5 ,y:3 ,name: 'block',color:'green'},
  { x:3 ,y:4 ,name: 'diffusioner'},
  { x:4 ,y:3 ,name: 'star'},
  { x:4 ,y:4 ,name: 'star'},
  { x:4 ,y:5 ,name: 'star'},
  { x:8 ,y:0 ,name: 'goal'}
],
[
  //39
  { x:0 ,y:4 ,name: 'start'},
  { x:4 ,y:1 ,name: 'pipe' ,color:'blue',pipeStatus:{x:0 ,y:5 ,direction:'right'} },
  { x:3 ,y:4 ,name: 'block',color:'red'},
  { x:6 ,y:4 ,name: 'block',color:'blue'},
  { x:9 ,y:1 ,name: 'block',color:'green'},
  { x:9 ,y:5 ,name: 'block',color:'green'},
  { x:7 ,y:5 ,name: 'block',color:'purple'},
  { x:7 ,y:1 ,name: 'block',color:'red'},
  { x:6 ,y:5 ,name: 'star'},
  { x:4 ,y:5 ,name: 'star'},
  { x:7 ,y:3 ,name: 'star'},
  { x:1 ,y:5 ,name: 'goal'}
],
[
  //40
  { x:1 ,y:4 ,name: 'start'},
  { x:3 ,y:7 ,name: 'pipe' ,color:'red'   ,pipeStatus:{x:0 ,y:0 ,direction:'down'} },
  { x:3 ,y:3 ,name: 'pipe' ,color:'green' ,pipeStatus:{x:0 ,y:9 ,direction:'right'} },
  { x:6 ,y:3 ,name: 'pipe' ,color:'blue'  ,pipeStatus:{x:9 ,y:0 ,direction:'left'} },
  { x:6 ,y:7 ,name: 'pipe' ,color:'orange',pipeStatus:{x:9 ,y:9 ,direction:'up'} },
  { x:0 ,y:3 ,name: 'block',color:'purple'},
  { x:1 ,y:7 ,name: 'block',color:'purple'},
  { x:9 ,y:6 ,name: 'block',color:'green'},
  { x:6 ,y:9 ,name: 'block',color:'orange'},
  { x:2 ,y:5 ,name: 'block',color:'blue'},
  { x:3 ,y:9 ,name: 'block',color:'red'},
  { x:9 ,y:3 ,name: 'block',color:'purple'},
  { x:5 ,y:5 ,name: 'star'},
  { x:2 ,y:0 ,name: 'star'},
  { x:6 ,y:6 ,name: 'star'},
  { x:6 ,y:0 ,name: 'goal'}
],
[
  //41
  { x:0 ,y:5 ,name: 'start'},
  { x:0 ,y:0 ,name: 'pipe' ,color:'red'   ,pipeStatus:{x:2 ,y:4 ,direction:'right'} },
  { x:3 ,y:2 ,name: 'pipe' ,color:'green' ,pipeStatus:{x:8 ,y:4 ,direction:'left'} },
  { x:0 ,y:6 ,name: 'block',color:'blue'},
  { x:3 ,y:6 ,name: 'block',color:'red'},
  { x:6 ,y:6 ,name: 'block',color:'purple'},
  { x:5 ,y:7 ,name: 'block',color:'orange'},
  { x:9 ,y:3 ,name: 'block',color:'orange'},
  { x:9 ,y:6 ,name: 'block',color:'red'},
  { x:5 ,y:9 ,name: 'block',color:'blue'},
  { x:9 ,y:0 ,name: 'block',color:'green'},
  { x:6 ,y:0 ,name: 'block',color:'purple'},
  { x:5 ,y:4 ,name: 'slanter'},
  { x:4 ,y:4 ,name: 'slanter'},
  { x:6 ,y:4 ,name: 'slanter'},
  { x:5 ,y:3 ,name: 'slanter'},
  { x:5 ,y:5 ,name: 'slanter'},
  { x:4 ,y:3 ,name: 'star'},
  { x:6 ,y:3 ,name: 'star'},
  { x:4 ,y:5 ,name: 'star'},
  { x:6 ,y:5 ,name: 'goal'}
],
//42
[
  { x:0 ,y:4 ,name: 'start'},
  { x:0 ,y:5 ,name: 'block',color:'red'},
  { x:2 ,y:5 ,name: 'block',color:'blue'},
  { x:2 ,y:3 ,name: 'block',color:'orange'},
  { x:2 ,y:1 ,name: 'block',color:'purple'},
  { x:1 ,y:1 ,name: 'slanter'},
  { x:3 ,y:7 ,name: 'slanter'},
  { x:2 ,y:0 ,name: 'pipe' ,color:'red'   ,pipeStatus:{x:3 ,y:8 ,direction:'right'} },
  { x:4 ,y:2 ,name: 'pipe' ,color:'green'   ,pipeStatus:{x:2 ,y:8 ,direction:'right'} },
  { x:6 ,y:2 ,name: 'pipe' ,color:'blue'   ,pipeStatus:{x:3 ,y:9 ,direction:'up'} },
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:6 ,y:3 ,name: 'diffusioner'},
  { x:4 ,y:8 ,name: 'block',color:'orange'},
  { x:5 ,y:8 ,name: 'slanter'},
  { x:7 ,y:6 ,name: 'slanter'},
  { x:6 ,y:8 ,name: 'block',color:'orange'},
  { x:0 ,y:0 ,name: 'star'},
  { x:5 ,y:9 ,name: 'star'},
  { x:4 ,y:6 ,name: 'star'},
  { x:6 ,y:5 ,name: 'goal'}
],
//45
[
  //45
  { x:4 ,y:5 ,name: 'start'},
  { x:6 ,y:5 ,name: 'block',color:'blue'},
  { x:6 ,y:3 ,name: 'pipe' ,color:'green' ,pipeStatus:{x:3 ,y:6 ,direction:'right'} },
  { x:5 ,y:6 ,name: 'block',color:'purple'},
  { x:7 ,y:6 ,name: 'block',color:'red'},
  { x:7 ,y:4 ,name: 'block',color:'orange'},
  { x:7 ,y:2 ,name: 'block',color:'green'},
  { x:5 ,y:1 ,name: 'slanter'},
  { x:5 ,y:2 ,name: 'block',color:'purple'},
  { x:3 ,y:2 ,name: 'pipe' ,color:'red' ,pipeStatus:{x:0 ,y:9 ,direction:'right'} },
  { x:5 ,y:4 ,name: 'pipe' ,color:'blue' ,pipeStatus:{x:0 ,y:2 ,direction:'down'} },
  { x:3 ,y:9 ,name: 'block',color:'blue'},
  { x:6 ,y:9 ,name: 'block',color:'red'},
  { x:9 ,y:9 ,name: 'block',color:'green'},
  { x:9 ,y:7 ,name: 'block',color:'blue'},
  { x:9 ,y:4 ,name: 'block',color:'orange'},
  { x:8 ,y:4 ,name: 'block',color:'red'},
  { x:9 ,y:1 ,name: 'block',color:'green'},
  { x:9 ,y:0 ,name: 'block',color:'blue'},
  { x:6 ,y:0 ,name: 'block',color:'red'},
  { x:3 ,y:0 ,name: 'block',color:'green'},
  { x:0 ,y:0 ,name: 'block',color:'blue'},
  { x:0 ,y:4 ,name: 'block',color:'green'},
  { x:0 ,y:6 ,name: 'block',color:'red'},
  { x:3 ,y:4 ,name: 'star'},
  { x:3 ,y:3 ,name: 'star'},
  { x:3 ,y:5 ,name: 'star'},
  { x:0 ,y:8 ,name: 'goal'}
],
[
  //46
  { x:5 ,y:5 ,name: 'start'},
  { x:5 ,y:7 ,name: 'slanter'},
  { x:7 ,y:5 ,name: 'pipe' ,color:'red' ,pipeStatus:{x:3 ,y:7 ,direction:'left'} },
  { x:3 ,y:5 ,name: 'diffusioner'},
  { x:5 ,y:3 ,name: 'block',color:'blue'},
  { x:3 ,y:3 ,name: 'slanter'},
  { x:7 ,y:6 ,name: 'slanter'},
  { x:5 ,y:1 ,name: 'pipe' ,color:'blue' ,pipeStatus:{x:7 ,y:7 ,direction:'right'} },
  { x:7 ,y:3 ,name: 'diffusioner'},
  { x:9 ,y:6 ,name: 'star'},
  { x:9 ,y:4 ,name: 'block',color:'orange'},
  { x:4 ,y:9 ,name: 'pipe' ,color:'green' ,pipeStatus:{x:7 ,y:9 ,direction:'up'} },
  { x:9 ,y:1 ,name: 'block',color:'purple'},
  { x:1 ,y:4 ,name: 'block',color:'orange'},
  { x:7 ,y:1 ,name: 'block',color:'blue'},
  { x:4 ,y:1 ,name: 'slanter'},
  { x:1 ,y:7 ,name: 'star'},
  { x:5 ,y:8 ,name: 'star'},
  { x:5 ,y:0 ,name: 'goal'}
],
[
  //47
  { x:0 ,y:0 ,name: 'start'},
  { x:0 ,y:3 ,name: 'block',color:'orange'},
  { x:0 ,y:6 ,name: 'block',color:'blue'},
  { x:2 ,y:6 ,name: 'pipe' ,color:'red' ,pipeStatus:{x:3 ,y:1 ,direction:'right'} },
  { x:0 ,y:8 ,name: 'pipe' ,color:'blue' ,pipeStatus:{x:3 ,y:5 ,direction:'up'} },
  { x:3 ,y:3 ,name: 'block',color:'purple'},
  { x:5 ,y:1 ,name: 'block',color:'orange'},
  { x:5 ,y:3 ,name: 'diffusioner'},
  { x:6 ,y:3 ,name: 'block',color:'purple'},
  { x:5 ,y:4 ,name: 'block',color:'orange'},
  { x:5 ,y:5 ,name: 'block',color:'purple'},
  { x:7 ,y:5 ,name: 'star'},
  { x:7 ,y:3 ,name: 'diffusioner'},
  { x:7 ,y:2 ,name: 'diffusioner'},
  { x:7 ,y:1 ,name: 'star'},
  { x:2 ,y:8 ,name: 'star'},
  { x:2 ,y:2 ,name: 'pipe' ,color:'green' ,pipeStatus:{x:3 ,y:7 ,direction:'right'} },
  { x:8 ,y:2 ,name: 'block',color:'orange'},
  { x:8 ,y:5 ,name: 'block',color:'orange'},
  { x:5 ,y:7 ,name: 'block',color:'purple'},
  { x:7 ,y:7 ,name: 'goal'}
],
[
  //48
  { x:0 ,y:9 ,name: 'start'},
  { x:0 ,y:7 ,name: 'block',color:'purple'},
  { x:2 ,y:7 ,name: 'block',color:'orange'},
  { x:2 ,y:5 ,name: 'block',color:'orange'},
  { x:2 ,y:2 ,name: 'diffusioner'},
  { x:1 ,y:1 ,name: 'slanter'},
  { x:3 ,y:1 ,name: 'slanter'},
  { x:1 ,y:3 ,name: 'slanter'},
  { x:3 ,y:3 ,name: 'slanter'},
  { x:5 ,y:5 ,name: 'block',color:'orange'},
  { x:5 ,y:2 ,name: 'diffusioner'},
  { x:4 ,y:1 ,name: 'slanter'},
  { x:6 ,y:1 ,name: 'slanter'},
  { x:4 ,y:3 ,name: 'slanter'},
  { x:6 ,y:3 ,name: 'slanter'},
  { x:8 ,y:5 ,name: 'block',color:'orange'},
  { x:8 ,y:2 ,name: 'diffusioner'},
  { x:7 ,y:1 ,name: 'slanter'},
  { x:9 ,y:1 ,name: 'slanter'},
  { x:7 ,y:3 ,name: 'slanter'},
  { x:9 ,y:3 ,name: 'slanter'},
  { x:8 ,y:0 ,name: 'pipe' ,color:'green' ,pipeStatus:{x:3 ,y:9 ,direction:'right'} },
  { x:2 ,y:0 ,name: 'pipe' ,color:'red' ,pipeStatus:{x:9 ,y:4 ,direction:'down'} },
  { x:9 ,y:6 ,name: 'block',color:'orange'},
  { x:8 ,y:9 ,name: 'star'},
  { x:6 ,y:9 ,name: 'block',color:'purple'},
  { x:9 ,y:8 ,name: 'star'},
  { x:5 ,y:0 ,name: 'star'},
  { x:9 ,y:9 ,name: 'goal'}
],
[
  { x:3 ,y:9 ,name: 'start'},
  { x:3 ,y:8 ,name: 'block' ,color: 'green'},
  { x:3 ,y:7 ,name: 'block' ,color: 'green'},
  { x:2 ,y:7 ,name: 'block' ,color: 'green'},
  { x:2 ,y:6 ,name: 'block' ,color: 'green'},
  { x:2 ,y:5 ,name: 'slanter'},
  { x:2 ,y:4 ,name: 'block' ,color: 'green'},
  { x:2 ,y:4 ,name: 'block' ,color: 'green'},
  { x:3 ,y:4 ,name: 'slanter'},
  { x:4 ,y:4 ,name: 'block' ,color: 'green'},
  { x:2 ,y:3 ,name: 'slanter'},
  { x:2 ,y:2 ,name: 'slanter'},
  { x:3 ,y:1 ,name: 'slanter'},
  { x:4 ,y:1 ,name: 'block' ,color: 'green'},
  { x:2 ,y:0 ,name: 'slanter'},

  { x:6 ,y:8 ,name: 'slanter'},
  { x:6 ,y:7 ,name: 'slanter'},
  { x:7 ,y:7 ,name: 'block' ,color: 'green'},
  { x:7 ,y:6 ,name: 'block' ,color: 'green'},
  { x:7 ,y:5 ,name: 'slanter'},
  { x:7 ,y:4 ,name: 'block' ,color: 'green'},
  { x:7 ,y:4 ,name: 'block' ,color: 'green'},
  { x:6 ,y:4 ,name: 'block' ,color: 'green'},
  { x:5 ,y:4 ,name: 'slanter'},
  { x:7 ,y:2 ,name: 'slanter'},
  { x:6 ,y:1 ,name: 'slanter'},
  { x:5 ,y:1 ,name: 'slanter'},
  { x:7 ,y:0 ,name: 'slanter'},

  { x:4 ,y:7 ,name: 'pipe' ,color:'green' ,pipeStatus:{x:1 ,y:4 ,direction:'down'} },
  { x:5 ,y:7 ,name: 'pipe' ,color:'green' ,pipeStatus:{x:8 ,y:4 ,direction:'down'} },
  { x:1 ,y:5 ,name: 'pipe' ,color:'red' ,pipeStatus:{x:8 ,y:6 ,direction:'down'} },
  { x:8 ,y:5 ,name: 'pipe' ,color:'blue' ,pipeStatus:{x:1 ,y:6 ,direction:'down'} },
  { x:6 ,y:9 ,name: 'star'},
  { x:3 ,y:2 ,name: 'star'},
  { x:6 ,y:2 ,name: 'star'},
  { x:5 ,y:5 ,name: 'goal'}
]



];
// pipeの使い方
// { x:4 ,y:2 ,name: 'pipe' ,pipeStatus:{x:5 ,y:7 ,direction:'right'} },
//チュートリアル用のステージ配列
var TUTOSTAGES = [
  [
  { x:1 ,y:4 ,name: 'tutoBlock',color:'start'},
  { x:4 ,y:4 ,name: 'tutoBlock',color:'blue'},
  { x:7 ,y:4 ,name: 'tutoGoal',color:'green'}
],
[
  { x:1 ,y:4 ,name: 'tutoBlock',color:'start'},
  { x:4 ,y:4 ,name: 'tutoBlock',color:'blue'},
  { x:7 ,y:7 ,name: 'tutoGoal',color:'green'}
],
[
  { x:0 ,y:4 ,name: 'tutoBlock',color:'start'},
  { x:4 ,y:4 ,name: 'tutoBlock',color:'blue'},
  { x:7 ,y:7 ,name: 'tutoGoal',color:'green'}
]
];

var tutoCurrentStage = [];

function browserLanguage() {
  try {
    return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2)
  }
  catch(e) {
    return undefined;
  }
}

var COUNTRYCODE = browserLanguage();

var VOLUME = 1.0;

var creater;
var pipeManager;

var userData;
var stageBoxes = [];
var stageGroup;
var effectLevel = 1;
