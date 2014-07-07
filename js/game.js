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

var userData;
var stageBoxes = [];
var stageGroup;
var effectLevel = 1;

var LANGUAGE = {
  ja:{
    title:"Touch<br /><span>Bloomy</span>",
    touchStart: "画面をタッチ",
    optionTitle:"エフェクト",
    optionEffect:["控えめ","普通","ど派手"],
    optionDeleteData: "セーブデータを削除",
    optionDeleteConf: "本当に削除しますか？",
    optionDeleteComp: "セーブデータを削除しました",
    optionAllStage: "全ステージを解放(大会用)",
    optionAllStageUnlock: "全てのステージで遊べるようになりました！",
    gameStart:"ゲーム開始",
    gameOver:"Game Over",
    gameRetry:"リトライ",
    howToPlay:"遊び方",
    startTutorial:"今からこのゲームのチュートリアルを始めます",
    sirotama:"ゲーム開始時このオブジェクトが四散します",
    aotama:"破片が他のオブジェクトに当たると誘爆します",
    prevGoal:"黄色いゴールオブジェクトに当てればクリアです",
    tutoClear:"このようにゴールオブジェクトを<br/>壊せばクリアです",
    nextLosePattern:"それでは、<br/>次は負けパターンを見てみましょう",
    losePattern:"負けパターンを始めます",
    endChain:"このままでは連鎖が途切れてしまいます",
    loseMsg:"これであなたの負けです",
    yourMission:"あなたは一つオブジェクトを置いて<br/>ゴールまで導く事が出来ます",
    letsWin:"さあ次はクリアしましょう",
    tutoThirdStartMsg:"画面をタップしてオブジェクトを置き,<br/>ゴールオブジェクトまで連鎖させましょう",
    tutoClearMsg:"ゲームクリアです!",
    tutoClearMsg2:"本番のステージでは<br/>オブジェクトを置くまでに時間制限があります",
    tutoClearMsg3:"それでは、ゲームをお楽しみ下さい",
    backToTop:"TOPへ戻る",
    volumeOption:"音量",
    stageEdit:"ステージを作る",
    post:"投稿する",
    testplay:"試す"
  },
  en:{
    title:"Touch<br /><span>Bloomy</span>",
    touchStart: "Touch Screen",
    optionTitle:"Effect",
    optionEffect:["Low","Normal","HIGH"],
    optionDeleteData: "Delete Save Data",
    optionDeleteConf: "Are you sure you want to delete?",
    optionDeleteComp: "Save Data was deleted",
    optionAllStage: "All Stage unlock (For html5jcup)",
    optionAllStageUnlock: "Stage of all has been unlocked!",
    gameStart:"Start Game",
    gameOver:"Game Over",
    gameRetry:"Retry",
    howToPlay:"How to play",
    startTutorial:"Let's start tutorial'",
    sirotama:"First, This Object is broken",
    aotama:"When Snipets touch another object,the object is broken",
    prevGoal:"This is Goal Object,and breaking this is Stage Clear",
    tutoClear:"It's Clear",
    nextLosePattern:"OK? <br/>Next Lose pattern!",
    losePattern:"This is lose pattern",
    endChain:"This case,chaining come to an end",
    loseMsg:"You lose",
    yourMission:"Your Mission:All break and Chain to Goal",
    letsWin:"Next Let's Win!",
    tutoThirdStartMsg:"You can put one Circle to Chain to Goal",
    tutoClearMsg:"You did it!",
    tutoClearMsg2:"If this is real game,It have a time limit",
    tutoClearMsg3:"Enjoy your game!",
    backToTop:"Back to Top",
    volumeOption:"SoundVolume",
    stageEdit:"Edit Stage",
    post:"Post your Stage!",
    testplay:"Test play"
  }
}

//チュートリアルを連続でyareruyouni
var tutorialScene = null;

enchant();
window.onload = function () {
  GAME = new Game(640, 800);
  GAME.preload('sound/white.mp3','sound/goal.mp3','sound/start.mp3','sound/orange.mp3','sound/purple.mp3','sound/green.mp3','sound/red.mp3','sound/slanter.mp3','sound/pipe.mp3','sound/blue.mp3','sound/star.mp3','sound/diffusioner.mp3');
  GAME.fps = 30;
  GAME.onload = function () {

    GAME.rootScene.backgroundColor = 'white';
    //==========================================================
    // setting
    //==========================================================
    // ゲームの設定はここで
    createSurfaces();

    //==========================================================
    // title
    //==========================================================
    var titleScene = createTitleScene();

    initTutorialScene();
    GAME.pushScene(titleScene);
  };
  GAME.start();
}

// ステージ構築の補助
function　StageBuilder(gimmick){
  switch(gimmick.name){
    case 'block':
      return new Block(gimmick.color);
    case 'start':
      return new Start();
    case 'goal' :
      return new Goal();
    case 'star':
      return new Star();
    case 'count':
      return new CountBlock(gimmick.color,gimmick.count);
    case 'diffusioner':
      return new Diffusioner();
    case 'slanter':
      return new Slanter();
    case 'pipe':
      return new Pipe(gimmick.color,gimmick.pipeStatus);
    case 'linker':
      return new Linker(gimmick.color);
    case 'tutoGoal':
      return new TutoGoal();
    case 'tutoBlock':
      return new TutoBlock(gimmick.color);
  }
}

function initTutorialScene(){
  tutorialScene = createTutorialScene();
}

var TitleBackAnim = Class.create(Group,{
  initialize: function(){
    Group.call(this);

    this.count = 3;
    this.next = 0;

    this.blocks = [new Block('red') ,new Block('blue') ,new Block('green')];

    this.positions = [{x:1,y:1},{x:8,y:1},{x:8,y:8},{x:1,y:8}];

  },
  onaddedtoscene: function(){

    var that = this;

    for(var i = 0;i<this.blocks.length;i++){
      var block = this.blocks[i];
      block.x = this.positions[i].x * BOX_SIZE;
      block.y = this.positions[i].y * BOX_SIZE;
      this.parentNode.addChild(block);

      block.run = function(){
        if(!this.parentNode){
          return;
        }

        var thatBlock = this;
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
        thatBlock.tl.moveTo(
          that.positions[that.count].x * BOX_SIZE,
          that.positions[that.count].y * BOX_SIZE,
          30);
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
    },2500);
  }
});

//チュートリアル最初の矢印
function createPointerArrow1(){

  var pointerArrow1 = new Sprite();
  pointerArrow1.x = 65;
  pointerArrow1.y = 290;
  pointerArrow1._element = document.createElement('div');
  pointerArrow1._element.className  = 'pointerArrow';
  pointerArrow1.width = 30;
  pointerArrow1.rotate(300);

  return pointerArrow1;

}

//トップに戻るボタン
function createBacktoTopLabel(){

  var backToTop = new ExLabel(LANGUAGE[COUNTRYCODE].backToTop,BOX_SIZE*3,BOX_SIZE);
  backToTop.setClassName('backToTopText');
  backToTop.x = 0.5 * 64;
  backToTop.y = 8.5 * 64;

  return backToTop;
}

//チュートリアル最初の説明文
function createStartTutorialLabel(){

  var startTutorialLabel = new ExLabel(LANGUAGE[COUNTRYCODE].startTutorial);
  startTutorialLabel.setClassName('tuto_white_msg');
  startTutorialLabel.x = 90;
  startTutorialLabel.y = 170;

  return startTutorialLabel;
}

//チュートリアル最初の白玉が爆発する前の説明文
function createSirotamaLabel(){

  var sirotamaLabel = new ExLabel(LANGUAGE[COUNTRYCODE].sirotama);
  sirotamaLabel.setClassName('tuto_white_msg');
  sirotamaLabel.x = 90;
  sirotamaLabel.y = 170;

  return sirotamaLabel;
}

//チュートリアル負けたのときの説明文
function createLoseMsg(){

  var loseMsg = new ExLabel(LANGUAGE[COUNTRYCODE].loseMsg);
  loseMsg.x = 200;
  loseMsg.y = 200;
  loseMsg.setClassName('tuto_black_msg');

  return loseMsg;
}

//タイトルのラベル
function createTitleLabel(){

  var titleLabel = new ExLabel(LANGUAGE[COUNTRYCODE].title);
  titleLabel.setClassName('titleText');
  titleLabel.y = 140;

  return titleLabel;
}
//タイトル画面のタッチスタートのラベル
function createTouchStartLabel(){
  var touchStartLabel = new ExLabel(LANGUAGE[COUNTRYCODE].touchStart,640,60);
  touchStartLabel.setClassName('touchStart');
  touchStartLabel.x = 0;
  touchStartLabel.y = 400;
  return touchStartLabel;
}

//タイトル画面のゲーム開始のラベル
function createGameStartLabel(){

  var gameStartLabel = new ExLabel(LANGUAGE[COUNTRYCODE].gameStart,320,60);
  gameStartLabel.setClassName('gameStart');
  gameStartLabel.x = 160;
  gameStartLabel.y = 360;

  return gameStartLabel;
}

//タイトル画面の遊び方のラベル
function createTutorialLabel(){

  var tutorialLabel  = new ExLabel(LANGUAGE[COUNTRYCODE].howToPlay,320,60);
  tutorialLabel.setClassName('tutorial');
  tutorialLabel.x = 160;
  tutorialLabel.y = 440;

  return tutorialLabel;
}
// オプションメニューボタン
function createOptionMenuButton(){
  var optionMenuButton = new Sprite(BOX_SIZE,BOX_SIZE);
  optionMenuButton._element = document.createElement('div');
  optionMenuButton._element.className = 'optionMenuButton';
  optionMenuButton.x = 8.5*BOX_SIZE;
  optionMenuButton.y = 8.5*BOX_SIZE;
  optionMenuButton.menuOpen = false;
  return optionMenuButton;
}
function createOptionMenu(){
  // メニュー全体のグループ
  var menuGroup = new Group();
  menuGroup._element = document.createElement('div');
  menuGroup._element.className = 'optionMenu';

  // 背景の色
  var background = new Sprite(640,640);
  background._element = document.createElement('div');
  background._element.className = 'optionBackground optionLayer';
  menuGroup.addChild(background);

  // メニュータイトル
  var optionLabel = new ExLabel('Option');
  optionLabel.setClassName('optionLayer');
  optionLabel.y = 20;
  menuGroup.addChild(optionLabel);

  // エフェクト
  var switchLabel = new ExLabel(LANGUAGE[COUNTRYCODE].optionTitle);
  switchLabel.setClassName('optionLayer effectLabel');
  switchLabel.y = 120;
  menuGroup.addChild(switchLabel);

  var lowSwitch = new ExLabel('<button id="low">'+LANGUAGE[COUNTRYCODE].optionEffect[0]+'</button>',160);
  lowSwitch.setClassName('effectSwitch optionLayer');
  lowSwitch.quality = 'low';
  lowSwitch.x = 80;
  lowSwitch.y = 172;
  lowSwitch.on('touchend',function(){
    qualityCheck(this.quality);
    effectLevel = 0;
  });
  menuGroup.addChild(lowSwitch);

  var medSwitch = new ExLabel('<button id="med">'+LANGUAGE[COUNTRYCODE].optionEffect[1]+'</button>',160);
  medSwitch.setClassName('effectSwitch optionLayer active');
  medSwitch.quality = 'med';
  medSwitch.x = 240;
  medSwitch.y = 172;
  medSwitch.on('touchend',function(){
    qualityCheck(this.quality);
    effectLevel = 1;
  });
  menuGroup.addChild(medSwitch);

  var highSwitch = new ExLabel('<button id="high">'+LANGUAGE[COUNTRYCODE].optionEffect[2]+'</button>',160);
  highSwitch.setClassName('effectSwitch optionLayer');
  highSwitch.quality = 'high';
  highSwitch.x = 400;
  highSwitch.y = 172;
  highSwitch.on('touchend',function(){
    qualityCheck(this.quality);
    effectLevel = 2;
  });
  menuGroup.addChild(highSwitch);

  var switches = [lowSwitch,medSwitch,highSwitch];

  function qualityCheck(quality){

    for(var i = 0; i<3;i++){
      if(switches[i].quality === quality){
        switches[i].setClassName('effectSwitch optionLayer active');
      } else {
        switches[i].setClassName('effectSwitch optionLayer');
      }
    }
  }

  // 音量
  var volumeLabel = new ExLabel(LANGUAGE[COUNTRYCODE].volumeOption);
  volumeLabel.setClassName('optionLayer effectLabel');
  volumeLabel.y = 264;
  menuGroup.addChild(volumeLabel);

  //音量調節スライダー
  var volumeSlider = new VolumeSlider();
  menuGroup.addChild(volumeSlider);

  // すべてを削除ボタン
  var deleteDataLabel = new ExLabel('<button id="deleteButton" class="btn-long">'+LANGUAGE[COUNTRYCODE].optionDeleteData+'</button>');
  deleteDataLabel.setClassName('deleteData optionLayer');
  deleteDataLabel.y = 365;
  deleteDataLabel.on('touchend',function(){
  	if(window.confirm(LANGUAGE[COUNTRYCODE].optionDeleteConf)){
      localStorage.clear();
      alert(LANGUAGE[COUNTRYCODE].optionDeleteComp);
  	}
  });
  menuGroup.addChild(deleteDataLabel);

  // 全ステージを出現ボタン
  var openAllStage = new ExLabel('<button id="allStage" class="btn-long">'+LANGUAGE[COUNTRYCODE].optionAllStage+'</button>');
  openAllStage.setClassName('openAllStage optionLayer');
  openAllStage.on('touchend',function(){
    var allData = [];
    for(var i = 0; i < STAGES.length;i++){
      allData.push(0);
    }
    localStorage.setItem("hal", JSON.stringify(allData));
    alert(LANGUAGE[COUNTRYCODE].optionAllStageUnlock);
  });
  openAllStage.y = 460;
  menuGroup.addChild(openAllStage);

  return menuGroup;
}
// 現在の星の数を表すグループ
function createPlayerStatus(data){
  var starCount = 0;
  for(var i = 0;i < data.length;i++){
    starCount += data[i];
  }

  var playerStatusGroup = new Group();
  playerStatusGroup._element = document.createElement('div');
  playerStatusGroup.x = 7.5 * 64;
  playerStatusGroup.y = 8.5 * 64;

  var starsLabel = new ExLabel(' × '+starCount,BOX_SIZE*2,BOX_SIZE);
  starsLabel.setClassName('playerStars');
  playerStatusGroup.addChild(starsLabel);

  var starSprite = new Sprite(BOX_SIZE,BOX_SIZE);
  starSprite.image = YELLOW_STAR;
  starSprite.scale(0.8,0.8);
  playerStatusGroup.addChild(starSprite);

  return playerStatusGroup;
}

function createRetryLabelOnGame(){
  var retryLabelOnGame = new ExLabel(LANGUAGE[COUNTRYCODE].gameRetry,BOX_SIZE*3,BOX_SIZE);
  retryLabelOnGame.setClassName('retryLabelOnGame');
  retryLabelOnGame.x = 6.5 * 64;
  retryLabelOnGame.y = 8.5 * 64;
  return retryLabelOnGame;
}

//チュートリアルの勝ちパターンのときの最初の矢印
function createPointerArrow(){

  var pointerArrow = new PointerArrow();
  pointerArrow.x = 428;
  pointerArrow.y = 276;
  pointerArrow._element = document.createElement('div');
  pointerArrow._element.className  = 'pointerArrow';
  pointerArrow.width = 30;
  pointerArrow.rotate(300);
  pointerArrow.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT).loop();

  return pointerArrow;
}

//チュートリアル終了時のラベル
function createEndLabel(){

  var endLabel = new ExLabel(LANGUAGE[COUNTRYCODE].tutoClearMsg);
  endLabel.x = 100;
  endLabel.y = 150;
  endLabel.setClassName('tuto_clear_msg');

  return endLabel;
}

//チュートリアルの負けパターンですっていうラベル
function createLosePatternText(){

  var losePatternText = new ExLabel(LANGUAGE[COUNTRYCODE].losePattern);
  losePatternText.x = 180;
  losePatternText.y = 200;
  losePatternText.setClassName("msg");

  return losePatternText;
}

//チュートリアルの衝突時にできる矢印
function createPointerArrow2(thatx,thaty){

  var pointerArrow2 = new Sprite();
  pointerArrow2.x = thatx - 30;
  pointerArrow2.y = thaty + 30;
  pointerArrow2._element = document.createElement('div');
  pointerArrow2._element.className  = 'pointerArrow';
  pointerArrow2.width = 30;
  pointerArrow2.rotate(300);

  return pointerArrow2;
}

//チュートリアルの最初のゴール手前のときの説明文
function createPrevGoalLabel(){
  var prevGoalLabel = new ExLabel(LANGUAGE[COUNTRYCODE].prevGoal);
  prevGoalLabel.setClassName('tuto_white_msg');
  prevGoalLabel.x = 120;
  prevGoalLabel.y = 170;

  return prevGoalLabel;
}

//チュートリアルの連鎖が途切れてしまいますっていうラベル
function createEndChainLabel(){
  var endChainLabel = new ExLabel(LANGUAGE[COUNTRYCODE].endChain);
  endChainLabel.setClassName('tuto_black_msg');
  endChainLabel.x = 110;
  endChainLabel.y = 170;

  return endChainLabel;
}

//チュートリアルの破片がぶつかったら連鎖しますっていうラベル
function createAotamaLabel(){
  var aotamaLabel = new ExLabel(LANGUAGE[COUNTRYCODE].aotama);
  aotamaLabel.setClassName('tuto_black_msg');
  aotamaLabel.x = 110;
  aotamaLabel.y = 170;

  return aotamaLabel;
}
// 各種Surfaceの作成
function createSurfaces(){

  WHITE_STAR = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxW = WHITE_STAR.context;
  ctxW.beginPath();
  ctxW.fillStyle = COLORS.white;
  ctxW.strokeStyle = COLORS.yellow;
  ctxW.lineWidth = 2;
  drawStar(BOX_SIZE/2,BOX_SIZE/2,5,BOX_SIZE/2,BOX_SIZE/3,ctxW);
  ctxW.closePath();
  ctxW.fill();
  ctxW.stroke();

  YELLOW_STAR = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxY = YELLOW_STAR.context;
  ctxY.beginPath();
  ctxY.fillStyle = COLORS.yellow;
  drawStar(BOX_SIZE/2,BOX_SIZE/2,5,BOX_SIZE/2,BOX_SIZE/3,ctxY);
  ctxY.closePath();
  ctxY.fill();

  // 獲得数の星
  SCORE_STARS[0] = new Surface(BOX_SIZE*2,BOX_SIZE*2);
  // 星1
  SCORE_STARS[1] = new Surface(BOX_SIZE*2,BOX_SIZE*2);
  var ctxS = SCORE_STARS[1].context;
  ctxS.beginPath();
  ctxS.fillStyle = COLORS.yellow;
  ctxS.strokeStyle = COLORS.white;
  ctxS.lineWidth = 3;
  drawStar(BOX_SIZE,BOX_SIZE*1.6,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxS);
  ctxS.closePath();
  ctxS.fill();
  ctxS.stroke();

  // 星2
  SCORE_STARS[2] = new Surface(BOX_SIZE*2,BOX_SIZE*2);
  var ctxD = SCORE_STARS[2].context;
  ctxD.fillStyle = COLORS.yellow;
  ctxD.strokeStyle = COLORS.white;
  ctxD.lineWidth = 3;

  ctxD.beginPath();
  drawStar(BOX_SIZE*0.5,BOX_SIZE*1.5,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxD);
  ctxD.fill();
  ctxD.stroke();
  ctxD.closePath();

  ctxD.beginPath();
  drawStar(BOX_SIZE*1.5,BOX_SIZE*1.5,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxD);
  ctxD.fill();
  ctxD.stroke();
  ctxD.closePath();

  // 星3
  SCORE_STARS[3] = new Surface(BOX_SIZE*2,BOX_SIZE*2);
  var ctxT = SCORE_STARS[3].context;
  ctxT.fillStyle = COLORS.yellow;
  ctxT.strokeStyle = COLORS.white;
  ctxT.lineWidth = 3;

  ctxT.beginPath();
  drawStar(BOX_SIZE*1.5,BOX_SIZE*1.6,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxT);
  ctxT.fill();
  ctxT.stroke();
  ctxT.closePath();

  ctxT.beginPath();
  drawStar(BOX_SIZE*0.5,BOX_SIZE*1.6,5,BOX_SIZE/3,BOX_SIZE/4.5,ctxT);
  ctxT.fill();
  ctxT.stroke();
  ctxT.closePath();

  ctxT.beginPath();
  drawStar(BOX_SIZE,BOX_SIZE*1.5,5,BOX_SIZE/2,BOX_SIZE/3,ctxT);
  ctxT.fill();
  ctxT.stroke();
  ctxT.closePath();

  // オレンジブロック
  ORANGE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxOr = ORANGE.context;
  ctxOr.fillStyle = COLORS.orange;
  ctxOr.strokeStyle = COLORS.yellow;
  ctxOr.lineWidth = 3;
  ctxOr.beginPath();
  ctxOr.moveTo(BOX_HALF,0);
  ctxOr.lineTo(BOX_SIZE,BOX_HALF);
  ctxOr.lineTo(BOX_HALF,BOX_SIZE);
  ctxOr.lineTo(0,BOX_HALF);
  ctxOr.lineTo(BOX_HALF,0);
  ctxOr.fill();
  ctxOr.stroke();
  ctxOr.closePath()

  ctxOr.beginPath();
  ctxOr.fillStyle = COLORS.yellow;
  ctxOr.strokeStyle = COLORS.orange;
  ctxOr.moveTo(BOX_HALF,0);
  ctxOr.lineTo(BOX_HALF*1.5,BOX_HALF*0.5);
  ctxOr.lineTo(BOX_HALF+6,BOX_HALF*0.5);
  ctxOr.lineTo(BOX_HALF+6,BOX_HALF*1.5);
  ctxOr.lineTo(BOX_HALF*1.5,BOX_HALF*1.5);
  ctxOr.lineTo(BOX_HALF,BOX_SIZE);
  ctxOr.lineTo(BOX_HALF*0.5,BOX_HALF*1.5);
  ctxOr.lineTo(BOX_HALF-6,BOX_HALF*1.5);
  ctxOr.lineTo(BOX_HALF-6,BOX_HALF*0.5);
  ctxOr.lineTo(BOX_HALF*0.5,BOX_HALF*0.5);
  ctxOr.lineTo(BOX_HALF,0);
  ctxOr.fill();
  ctxOr.stroke();
  ctxOr.closePath();


  // 紫ブロック
  PURPLE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPu = PURPLE.context;
  ctxPu.fillStyle = COLORS.purple;
  ctxPu.strokeStyle = COLORS.yellow;
  ctxPu.lineWidth = 3;
  ctxPu.beginPath();
  ctxPu.moveTo(BOX_HALF,0);
  ctxPu.lineTo(BOX_SIZE,BOX_HALF);
  ctxPu.lineTo(BOX_HALF,BOX_SIZE);
  ctxPu.lineTo(0,BOX_HALF);
  ctxPu.lineTo(BOX_HALF,0);
  ctxPu.fill();
  ctxPu.stroke();
  ctxPu.closePath()

  ctxPu.beginPath();
  ctxPu.fillStyle = COLORS.yellow;
  ctxPu.strokeStyle = COLORS.purple;
  ctxPu.moveTo(0,BOX_HALF);
  ctxPu.lineTo(BOX_HALF*0.5,BOX_HALF*1.5);
  ctxPu.lineTo(BOX_HALF*0.5,BOX_HALF+6);
  ctxPu.lineTo(BOX_HALF*1.5,BOX_HALF+6);
  ctxPu.lineTo(BOX_HALF*1.5,BOX_HALF*1.5);
  ctxPu.lineTo(BOX_SIZE,BOX_HALF);
  ctxPu.lineTo(BOX_HALF*1.5,BOX_HALF*0.5);
  ctxPu.lineTo(BOX_HALF*1.5,BOX_HALF-6);
  ctxPu.lineTo(BOX_HALF*0.5,BOX_HALF-6);
  ctxPu.lineTo(BOX_HALF*0.5,BOX_HALF*0.5);
  ctxPu.lineTo(0,BOX_HALF);
  ctxPu.fill();
  ctxPu.stroke();
  ctxPu.closePath();

  // ディフュージョナー
  DIFFUSIONER = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxDf = DIFFUSIONER.context;
  ctxDf.fillStyle = COLORS.red;
  ctxDf.strokeStyle = COLORS.yellow;
  ctxDf.lineWidth = 3;
  ctxDf.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,8,BOX_SIZE/2,BOX_SIZE/3,ctxDf);
  ctxDf.fill();
  ctxDf.stroke();
  ctxDf.closePath();

  // スランター
  SLANTER = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxSl = SLANTER.context;
  ctxSl.fillStyle = COLORS.green;
  ctxSl.strokeStyle = COLORS.yellow;
  ctxSl.lineWidth = 3;
  ctxSl.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,4,BOX_SIZE/2,BOX_SIZE/4,ctxSl);
  ctxSl.fill();
  ctxSl.stroke();
  ctxSl.closePath();

  // 赤パイプ
  PIPE_RED = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPR = PIPE_RED.context;
  ctxPR.fillStyle = COLORS.red;
  ctxPR.strokeStyle = COLORS.yellow;
  ctxPR.lineWidth = 3;
  ctxPR.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPR);
  ctxPR.fill();
  ctxPR.stroke();
  ctxPR.closePath();
  // 発射パイプ
  PIPE_RED_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPRO = PIPE_RED_OUT.context;
  ctxPRO.fillStyle = COLORS.red;
  ctxPRO.strokeStyle = COLORS.yellow;
  ctxPRO.lineWidth = 3;
  ctxPRO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPRO);
  ctxPRO.fill();
  ctxPRO.stroke();
  ctxPRO.closePath();

  // 緑パイプ
  PIPE_GREEN = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPG = PIPE_GREEN.context;
  ctxPG.fillStyle = COLORS.green;
  ctxPG.strokeStyle = COLORS.yellow;
  ctxPG.lineWidth = 3;
  ctxPG.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPG);
  ctxPG.fill();
  ctxPG.stroke();
  ctxPG.closePath();
  // 発射パイプ
  PIPE_GREEN_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPGO = PIPE_GREEN_OUT.context;
  ctxPGO.fillStyle = COLORS.green;
  ctxPGO.strokeStyle = COLORS.yellow;
  ctxPGO.lineWidth = 3;
  ctxPGO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPGO);
  ctxPGO.fill();
  ctxPGO.stroke();
  ctxPGO.closePath();

  // 青パイプ
  PIPE_BLUE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPB = PIPE_BLUE.context;
  ctxPB.fillStyle = COLORS.blue;
  ctxPB.strokeStyle = COLORS.yellow;
  ctxPB.lineWidth = 3;
  ctxPB.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPB);
  ctxPB.fill();
  ctxPB.stroke();
  ctxPB.closePath();
  // 発射パイプ
  PIPE_BLUE_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPBO = PIPE_BLUE_OUT.context;
  ctxPBO.fillStyle = COLORS.blue;
  ctxPBO.strokeStyle = COLORS.yellow;
  ctxPBO.lineWidth = 3;
  ctxPBO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPBO);
  ctxPBO.fill();
  ctxPBO.stroke();
  ctxPBO.closePath();

  // 紫パイプ
  PIPE_PURPLE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPP = PIPE_PURPLE.context;
  ctxPP.fillStyle = COLORS.purple;
  ctxPP.strokeStyle = COLORS.yellow;
  ctxPP.lineWidth = 3;
  ctxPP.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPP);
  ctxPP.fill();
  ctxPP.stroke();
  ctxPP.closePath();
  // 紫発射パイプ
  PIPE_PURPLE_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPPO = PIPE_PURPLE_OUT.context;
  ctxPPO.fillStyle = COLORS.purple;
  ctxPPO.strokeStyle = COLORS.yellow;
  ctxPPO.lineWidth = 3;
  ctxPPO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPPO);
  ctxPPO.fill();
  ctxPPO.stroke();
  ctxPPO.closePath();

  // 紫パイプ
  PIPE_ORANGE = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPO = PIPE_ORANGE.context;
  ctxPO.fillStyle = COLORS.purple;
  ctxPO.strokeStyle = COLORS.yellow;
  ctxPO.lineWidth = 3;
  ctxPO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/2,BOX_SIZE/2,ctxPO);
  ctxPO.fill();
  ctxPO.stroke();
  ctxPO.closePath();
  // 紫発射パイプ
  PIPE_ORANGE_OUT = new Surface(BOX_SIZE,BOX_SIZE);
  var ctxPOO = PIPE_ORANGE_OUT.context;
  ctxPOO.fillStyle = COLORS.purple;
  ctxPOO.strokeStyle = COLORS.yellow;
  ctxPOO.lineWidth = 3;
  ctxPOO.beginPath();
  drawStar(BOX_SIZE/2,BOX_SIZE/2,3,BOX_SIZE/3,BOX_SIZE/3,ctxPOO);
  ctxPOO.fill();
  ctxPOO.stroke();
  ctxPOO.closePath();

  PIPE_COLORS = {
    red:   {pipe:PIPE_RED    ,pipeOut:PIPE_RED_OUT},
    green: {pipe:PIPE_GREEN  ,pipeOut:PIPE_GREEN_OUT},
    blue:  {pipe:PIPE_BLUE   ,pipeOut:PIPE_BLUE_OUT},
    purple:{pipe:PIPE_PURPLE ,pipeOut:PIPE_PURPLE_OUT},
    orange:{pipe:PIPE_ORANGE ,pipeOut:PIPE_ORANGE_OUT}
  };
}
//タイトルのステージ選択ラベル
function createStageEditLabel(){
  var stageEditLabel = new ExLabel(LANGUAGE[COUNTRYCODE].stageEdit);
  stageEditLabel.setClassName('stageEditLabel');
  stageEditLabel.x = 90;
  stageEditLabel.y = 560;

  return stageEditLabel;
}

function createTutorialScene(){

  tutorialScene = new Scene();

  var pointerArrow1 = createPointerArrow1();

  //最初の文
  var startTutorialLabel = createStartTutorialLabel();
  tutorialScene.addChild(startTutorialLabel);

  var sirotamaLabel = createSirotamaLabel();
  startTutorialLabel.tl.delay(80).then(function(){
    tutorialScene.removeChild(startTutorialLabel);
    tutorialScene.addChild(sirotamaLabel);
    tutorialScene.addChild(pointerArrow1);
  });

  //文言変えるようのフラグ(汚いやり方、本来は状態を持たせて上手い事やるべきかな)
  tutorialScene.aotamaEndFlg = false;

  // /*=== ステージの読み込み ===*/
  // var i = 0;
  tutoCurrentStage = [];
  TUTOSTAGES[0].forEach(function(blockInfo){
    var block = StageBuilder(blockInfo);
    block.x = blockInfo.x*BOX_SIZE;
    block.y = blockInfo.y*BOX_SIZE;
    tutoCurrentStage.push(block);
    tutorialScene.addChild(block);
  });

  // とりあえず0番目を撃つ
  pointerArrow1.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT);
  pointerArrow1.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT);
  pointerArrow1.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT).then(function(){
    tutoCurrentStage[0].run(0);
    tutoCurrentStage.splice(0,1);
    tutorialScene.removeChild(sirotamaLabel);
    tutorialScene.removeChild(pointerArrow1);
  });

  var backToTop = createBacktoTopLabel();
  tutorialScene.addChild(backToTop);

  backToTop.on('touchend',function(){

    //==========================================================
    // title
    //==========================================================
    var titleScene = createTitleScene();

    GAME.replaceScene(titleScene);
    initTutorialScene();
  });

  return tutorialScene;

}

function createStageScene(){

  stageScene = new Scene();
  stageScene.initStage = function(){
    var that = this;
    this.star = 0;

    this.canTap = true;
    clearTimeout(this.endTimer);
    this.endTimer = null;
    this.cleared = false;

    this.removeChild(this.retryLabel);

    // ステージの初期化
    for(var i = 0; i < currentStage.length;i++){
      this.removeChild(currentStage[i]);
      delete currentStage[i];
    }
    currentStage = [];
    // 取得済みの星の削除
    if(this.stars){
      for(var i = 0; i < this.stars.length;i++){
        this.removeChild(this.stars[i]);
        delete this.stars[i];
      }
    }
    this.stars = [];

    // タイマーのセット
    var timer = new Timer();
    stageScene.addChild(timer);

    // ステージの読み込み
    STAGES[LEVEL].forEach(function(blockInfo){
      var block = StageBuilder(blockInfo);
      block.x = blockInfo.x*BOX_SIZE;
      block.y = blockInfo.y*BOX_SIZE;
      currentStage.push(block);
      that.addChild(block);
    });

  }
  stageScene.showResult = function(){
    var ResultGroup = new Result();
    this.addChild(ResultGroup);
    clearTimeout(this.endTimer);


    if(typeof userData[LEVEL] === 'undefined' || userData[LEVEL] < this.star){
      userData[LEVEL] = this.star;
    }
    localStorage.setItem("hal", JSON.stringify(userData));

  }
  stageScene.gameOver = function(){
    var GameOverGroup = new GameOver();
    this.addChild(GameOverGroup);
  }

  // BOX構築
  for(var x = 0; x < 10; x++){
    for(var y = 0; y < 10; y++){
      var box = new Box();
      box.x = x*BOX_SIZE;
      box.y = y*BOX_SIZE;
      stageScene.addChild(box);
    }
  }

  return stageScene;

}

function createTitleScene(){

  var titleScene = new Scene();
  var titleLabel = createTitleLabel();
  titleScene.addChild(titleLabel);

  titleScene.on('enter',function(){
    titleBackAnim.startAnim();
  });
  titleScene.on('exit',function(){
    clearInterval(titleScene.loopTimer);
  });
  titleScene.on('touchend',function(){
    titleScene.removeChild(touchStartLabel);
    titleScene.addChild(gameStartLabel);
    titleScene.addChild(tutorialLabel);
    titleScene.addChild(optionMenuButton);
  });

  var titleBackAnim = new TitleBackAnim();
  titleScene.addChild(titleBackAnim);
  // タイマーの制御を行います
  // hidden プロパティおよび可視性の変更イベントの名前を設定
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") { // Opera 12.10 や Firefox 18 以降でサポート
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  if (!(typeof document.addEventListener === "undefined" || typeof hidden === "undefined")){
    document.addEventListener(visibilityChange ,handleVisibilityChange,false);
  }

  function handleVisibilityChange() {
    if (document[hidden]) {
      clearInterval(titleScene.loopTimer);
    } else if(GAME.currentScene === titleScene){
      titleBackAnim.startAnim();
    }
  }

  var touchStartLabel = createTouchStartLabel();
  touchStartLabel.on('addedtoscene',function(){
    this.tl.fadeTo(0,30).fadeTo(1,30).loop();
  });
  titleScene.addChild(touchStartLabel);

  var gameStartLabel = createGameStartLabel();
  gameStartLabel.on('touchend',function(){
    GAME.replaceScene(selectScene);
  });

  var tutorialLabel = createTutorialLabel();
  tutorialLabel.on('touchend',function(){
    GAME.replaceScene(tutorialScene);
  });

  //stageエディット画面
  var stageEditScene = createStageEditScene();
  var stageEditLabel = createStageEditLabel();
  stageEditLabel.on('touchend',function(){
    GAME.replaceScene(stageEditScene);
  });
  titleScene.addChild(stageEditLabel);

  var optionMenuButton = createOptionMenuButton();
  var optionMenu = createOptionMenu();
  optionMenuButton.on('touchend',function(){
    if(this.menuOpen){
      try{
        titleScene.removeChild(optionMenu);
      } catch(e){
        // しゃあないもみ消す
      }
      this.menuOpen = false;
    } else {
      titleScene.addChild(optionMenu);
      this.menuOpen = true;
    }
  });

  //selectscene
  var selectScene = createSelectScene();
  // backbutton branch 追加分 (0609)
  selectScene.backToTop = function(){
    selectScene.initSelect();
    GAME.replaceScene(titleScene);
  }
  return titleScene;
}

function createSelectScene(){

  //==========================================================
  // select
  //==========================================================
  //
  var selectScene = new Scene();
  selectScene.on('touchstart',function(e){
    selectScene.startY = e.y;
  });
  selectScene.on('touchmove',function(e){
    stageGroup.moveBy(0,e.y - selectScene.startY);
    selectScene.startY = e.y;
  });
  selectScene.on('touchend',function(e){
    var bottomMax = Math.floor(stageGroup.childNodes.length/4) * -160 + 320;
    if(stageGroup.y > 0){
      stageGroup.tl.moveTo(0,0,10,SIN_EASEOUT);
    }else if(bottomMax > stageGroup.y){
      stageGroup.tl.moveTo(0,bottomMax,10,SIN_EASEOUT);
    }
  });

  selectScene.on('enter',function(e){
    // ローカルストレージからデータを取得
    userData = JSON.parse(localStorage.getItem("hal"));
    if(userData === null){
      userData = [];
    }

    stageGroup = new StageGroup();
    selectScene.addChild(stageGroup);

    var row = 1.5;
    var column = 0
			for(var i = 0,x=0,y=1.5 ;i < STAGES.length ;i++){

				var star = 0;
				var isLock = true;
				var className = 'stageBox lock';
				if(userData.length > i){
					star = userData[i];
					className ='stageBox';
					isLock = false;
				}else if(userData.length === i){
					className ='stageBox nextStage';
					isLock = false;
				}

				var stageBox = new StageBox(i,star,isLock);
				stageBox._element.className = className;
				stageBox.x = BOX_SIZE/4+x*BOX_SIZE*2.5;
				stageBox.y = y*BOX_SIZE*1.25;
				stageGroup.addChild(stageBox);
				stageBoxes.push(stageBox);

				x++;
				if(x===4){x = 0;}
				if(i%4 === 3){y += 2;}

				column = x;
				row = y;

			}

    var selectLabel = new ExLabel('STAGE SELECT',640,110);
    selectLabel.setClassName('stageSelectText');
    selectScene.addChild(selectLabel);
  });

  selectScene.selectedStage = function(level){
    LEVEL = level;
    GAME.replaceScene(stageScene);
    stageScene.initStage();
  }

  selectScene.initSelect = function(){
    var stageBoxesLen = stageBoxes.length;
    for(var i = 0; i < stageBoxesLen;i++){
      stageGroup.removeChild(stageBoxes[i]);
    }
    stageBoxes = [];
  }

  //stageScene作成
  var stageScene = createStageScene();
  stageScene.stageSelect = function(){
    var stageBoxesLen = stageBoxes.length;
    for(var i = 0; i < stageBoxesLen;i++){
      stageGroup.removeChild(stageBoxes[i]);
    }
    stageBoxes = [];
    GAME.replaceScene(selectScene);
  }

  stageScene.retryLabel = createRetryLabelOnGame();
  stageScene.retryLabel.on('touchend',function(){
    selectScene.selectedStage(LEVEL);
  });
  return selectScene;
}

function createStageEditScene(){
  var stageEditScene = new Scene();

  // ステージの初期化
  for(var i = 0; i < currentStage.length;i++){
    this.removeChild(currentStage[i]);
    delete currentStage[i];
  }

  // BOX構築
  for(var x = 0; x < 10; x++){
    for(var y = 0; y < 10; y++){
      var box = new EditBox(x,y);
      box.x = x*BOX_SIZE;
      box.y = y*BOX_SIZE;
      stageEditScene.addChild(box);
    }
  }

  //クリエイターを生成
  //必須　シーンきりかえ時にメモリ解放する
  creater = new Creater('blue');

  //パレット開閉スイッチ
//  var optionMenuButton = new Sprite(BOX_SIZE,BOX_SIZE);
//  optionMenuButton._element = document.createElement('div');
//  optionMenuButton._element.className = 'optionMenuButton';
//  optionMenuButton.x = 500;
//  optionMenuButton.y = 600; 
//  optionMenuButton.menuOpen = false;

  //パレットの作成  //
  //この辺グループかクラスにしたい
//  var pallet = new ExLabel();
  //選択用Blockを置いていく
  var blueInk = new BlockInk('blue');
  blueInk.x = 100;
  blueInk.y = 700;
  stageEditScene.addChild(blueInk);

  var redInk = new BlockInk('red');
  redInk.x = 200;
  redInk.y = 700;
  stageEditScene.addChild(redInk);

  var startInk = new BlockInk('start');
  startInk.x = 300;
  startInk.y = 700;
  stageEditScene.addChild(startInk);

  var slanterInk = new SlanterInk('green');
  slanterInk.x = 400;
  slanterInk.y = 700;
  stageEditScene.addChild(slanterInk);

  //送信ボタン
  var sendButton = new ExLabel(LANGUAGE[COUNTRYCODE].post);
  sendButton.on('touchend',function(){
    makeJSON(creater.stages);
  });
  sendButton.x = 500;
  sendButton.y = 700;
  stageEditScene.addChild(sendButton);

  //動きを確かめるボタン
  var testPlayButton = new TestPlayButton(LANGUAGE[COUNTRYCODE].testplay);
  testPlayButton.x = 600;
  testPlayButton.y = 700;
  stageEditScene.addChild(testPlayButton);

//  stageEditScene.addChild(optionMenuButton);

  return stageEditScene;
}

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

var StageBox = Class.create(Sprite,{
	initialize: function(level,star,isLock){
		Sprite.call(this,BOX_SIZE*2,BOX_SIZE*2);
		this._element = document.createElement('div');
		this._element.innerHTML = level+1;
		this.image = SCORE_STARS[star];
		this.level = level;
		this.moved = false;
		this.isLock = isLock;
	},
	ontouchstart: function(e){
		this.startEvent = e;
		this.moved = false;
	},
	ontouchmove: function(e){
		if(Math.abs(this.startEvent.x - e.x) > 10 || Math.abs(this.startEvent.y - e.y) > 10){
			this.moved = true;
		}
	},
	ontouchend: function(e){
		if(this.moved || this.isLock){
			return;
		}
		GAME.currentScene.selectedStage(this.level);
	}
});

var Box = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);
    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'box';
    this.moved = false;
  },
  ontouchstart: function(e){
    this.startEvent = e;
    this.moved = false;
    this._element.className = 'box touched';
  },
  ontouchmove: function(e){
    if(Math.abs(this.startEvent.x - e.x) > 10 || Math.abs(this.startEvent.y - e.y) > 10){
      this.moved = true;
    }
  },
  ontouchend: function(){
    this._element.className = 'box';
    if(!this.parentNode.canTap){
      return;
    } else if(this.moved){
      return;
    }
    this.parentNode.canTap = false;
    var block = new Block('white');
    block.x = this.x;
    block.y = this.y;
    currentStage.push(block);
    this.parentNode.addChild(block);
  }
});

var HitArc = Class.create(Sprite,{
	initialize: function(color){
		Sprite.call(this,320,320);
		this.scaleX = 0.1;
		this.scaleY = 0.1;

		var arc = new Surface(320,320);
		arc.context.beginPath();
		arc.context.fillStyle = COLORS[color];
		arc.context.arc(160, 160, 160, 0, Math.PI*2, true);
		arc.context.fill();
		this.image = arc;
		
	},
	onaddedtoscene: function(){
		var that = this;
		this.tl.scaleTo(1.5*effectLevel*effectLevel,1.5*effectLevel*effectLevel,20)
		.delay((effectLevel-1)*20).fadeTo(0,10*effectLevel).then(function(){
			GAME.currentScene.removeChild(that);
		});
	}
});

var Timer = Class.create(Label,{
	initialize: function(){
		Label.call(this);
		this.timer = 20;
		this.text = this.timer;
		this.font = '400px Bitter';
		this.color = COLORS.blue;
		this.width = 640;
		this.height = 640;
		this.originX = 320;
		this.originY = 320;
		this.opacity = 0.4;
		this.textAlign = 'center';
	},
	onaddedtoscene: function(){
		this.tl.scaleTo(0.1,0.1,600);
	},
	onenterframe: function(){
		if(this.age % 30 === 0){
			this.text = --this.timer;
			if(this.timer === 5){
				this.color = COLORS.yellow;
			} else if(this.timer === 3){
				this.color = COLORS.red;
			}
			if(this.timer > 0 && !this.parentNode.canTap){
				this.parentNode.addChild(this.parentNode.retryLabel);

				currentStage[0].run();
				this.parentNode.removeChild(this);
				currentStage.splice(0,1);
			} else if(this.timer <= 0){
				this.parentNode.addChild(this.parentNode.retryLabel);

				this.parentNode.canTap = false;
				currentStage[0].run();
				this.parentNode.removeChild(this);
				currentStage.splice(0,1);
			}
		}
	}
});

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

var GameOver = Class.create(Group,{
	initialize: function(){
		Group.call(this);
		var that = this;

		this._element = document.createElement('div');

		this.gameOverLabel = new ExLabel(LANGUAGE[COUNTRYCODE].gameOver,640,100);
		this.gameOverLabel.setClassName('gameOverText');
		this.gameOverLabel.x = 0;
		this.gameOverLabel.y = -80;
		this.addChild(this.gameOverLabel);

		this.again = new Block('black');
		this.again._element.className = 'black';
		this.again._element.innerHTML = '<i class="icon-repeat">';
		this.again.x = 5*64+32;
		this.again.y = 480;

		this.addChild(this.again);
		this.again.addEventListener('touchend',function(){

			var arc = new HitArc('black');
			arc.x = that.again.x-128;
			arc.y = that.again.y-128;
			that.parentNode.addChild(arc);

			that.parentNode.stars.forEach(function(star){
				star.run = function(){}
				that.parentNode.removeChild(star);
			});

			that.parentNode.initStage();
			that.removeChild(that.gameOverLabel);
			that.removeChild(that.again);
			that.removeChild(that.stageSelect);
			that.parentNode.removeChild(that);
		});

		this.stageSelect = new Block('black');
		this.stageSelect._element.className = 'black';
		this.stageSelect._element.innerHTML = '<i class="icon-th">';
		this.stageSelect.x = 3*64+32;
		this.stageSelect.y = 480;

		this.addChild(this.stageSelect);
		this.stageSelect.addEventListener('touchend',function(){

			that.parentNode.removeChild(BACKGROUND_ARC);
			that.parentNode.stars.forEach(function(star){
				star.run = function(){}
				that.parentNode.removeChild(star);
			});

			that.removeChild(that.gameOverLabel);
			that.removeChild(that.again);
			that.removeChild(that.stageSelect);
			that.parentNode.removeChild(that);

			GAME.currentScene.stageSelect();

			delete that;
		});
	},
	onaddedtoscene: function(){
		this.parentNode.removeChild(this.parentNode.retryLabel);
		this.gameOverLabel.tl.moveTo(0,230,30,BOUNCE_EASEOUT);
	}
});

var ExLabel = Class.create(Sprite,{
  initialize: function(text,w,h){
    var width = w || 640;
    var height = h || 64;
    Sprite.call(this,width,height);

    this._element = document.createElement('div');
    this._element.innerHTML = text;
  },
  setClassName: function(className){
    this._element.className = className;
  }
});

var Beam = Class.create(Sprite,{
  initialize: function(direction ,init){
    Sprite.call(this,BEAM_SIZE,BEAM_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'beam';

    // 初期状態
    this.direction = direction;
    this.initX = init.x;
    this.initY = init.y;
    this.x = init.x;
    this.y = init.y;

    this.currentStage = currentStage;
    this.parentBlock = init.parentBlock;
    this.beamLength = init.beamLength*BOX_SIZE;

    this.COLORS = COLORS;

  },
  onenterframe: function(){
    // 衝突検知
    // やっぱこうなるの・・・
    var gimmicks = this.currentStage.length;
    var distance = BOX_HALF+12;
    for(var i = 0; i < gimmicks; i++){
      if(!this.currentStage[i]){
        GAME.currentScene.removeChild(this);
      } else if(this.within(this.currentStage[i],this.currentStage[i].distance || distance) && this.currentStage[i] !== this.parentBlock && !this.parentNode.cleared){
        // 発射！
        this.currentStage[i].run();

        // 当たったら消える
        delete this.currentStage[i];
        this.currentStage.splice(i,1);
        GAME.currentScene.removeChild(this);
        return;
      }
    }

    // Beamの移動と生存期間
    if(Math.abs(this.initX-this.x) < this.beamLength
       &&  Math.abs(this.initY-this.y) < this.beamLength){
         this.x += this.direction.moveX;
         this.y += this.direction.moveY;
       } else {
         // 生存期間を過ぎると消えていく
         this.opacity -= 0.1;
         if(this.opacity < 0){
           GAME.currentScene.removeChild(this);
         }
       }
  }
});

var Block = Class.create(Sprite,{
  initialize: function(color){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;

    if(this.color === 'orange'){
      this.image = ORANGE;
    } else if(this.color === 'purple'){
      this.image = PURPLE;
    }

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
  /**
   * Block.run()
   * 	4方向にBeamを出します
   */
  run: function(){
    clearTimeout(this.parentNode.endTimer);
    this.parentNode.endTimer = setTimeout(function(){
      GAME.currentScene.gameOver();
    },3500);


    if( 0 < effectLevel){
      var arc = new HitArc(this.color);
      arc.x = this.x-128;
      arc.y = this.y-128;
      this.parentNode.addChild(arc);
    }

    var i = 0;
    for(var beam in this.beamStatus){
      if(DIRECTIONS[this.color][i]){
        // 初期設定的な
        var beamInit = {
          x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
          y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
          parentBlock:this,
          beamLength:BEAM_LENGTH
        }
        this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
      }
      i++;
    }

    switch (this.color){
      case "blue":
        playSound(GAME.assets['sound/blue.mp3'].clone());
        break;
      case "green":
        playSound(GAME.assets['sound/green.mp3'].clone());
        break;
      case "red":
        playSound(GAME.assets['sound/red.mp3'].clone());
        break;
      case "purple":
        playSound(GAME.assets['sound/purple.mp3'].clone());
        break;
      case "orange":
        playSound(GAME.assets['sound/orange.mp3'].clone());
        break;
      case "white":
        playSound(GAME.assets['sound/white.mp3'].clone());
        break;
    }
    //	出したら消滅
    this.parentNode.removeChild(this);
  }
});

var CountBlock = Class.create(Sprite,{
	initialize: function(color,count){
		Sprite.call(this,BOX_SIZE,BOX_SIZE);
		this._element = document.createElement('div');
		this._element.className = color+' count';
		this._element.innerHTML = count;
		this.count = count;
		this.color = color;
		this.currentStage = currentStage;

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
		}
	},
	/**
	* Block.run()
	* 	4方向にBeamを出します
	*/
	run: function(){
		clearTimeout(this.parentNode.endTimer);
		this.parentNode.endTimer = setTimeout(function(){
			GAME.currentScene.gameOver();
		},3500);

		var arc = new HitArc(this.color);
		arc.x = this.x-128;
		arc.y = this.y-128;
		this.parentNode.addChild(arc);

		for(var beam in this.beamStatus){
			var beamInit = {
				x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
				y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
				parentBlock:this
			}
			this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
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
    playSound(GAME.assets['sound/start.mp3'].clone());
		//	出したら消滅
		this.parentNode.removeChild(this);
	}
});

var Goal = Class.create(Sprite,{
	initialize: function(){
		Sprite.call(this,BOX_SIZE,BOX_SIZE);

		this._element = document.createElement('div');
		this._element.className = 'goal';
		this.scaleX = 0.8;
		this.scaleY = 0.8;
		this.distance = 1;

		this.tl.scaleTo(0.6,0.6,30,CUBIC_EASEIN).scaleTo(0.8,0.8,30,CUBIC_EASEOUT).loop();
	},
	run: function(){
		clearTimeout(this.parentNode.endTimer);
		this.parentNode.cleared = true;

		this.parentNode.removeChild(this.parentNode.retryLabel);

    playSound(GAME.assets['sound/goal.mp3'].clone());

		var that = this;

		// 星の削除
		this.parentNode.stars.forEach(function(star){
			star.run = function(){}
			that.parentNode.removeChild(star);
		});

		this.tl.clear().scaleTo(30,30,30).then(function(){
			// 残ったギミックの削除
			currentStage.forEach(function(gimmick){
				that.parentNode.removeChild(gimmick);
			});
			that.parentNode.removeChild(BACKGROUND_ARC);
		}).delay(30).fadeTo(0,15).then(function(){
			that.parentNode.showResult();
			that.parentNode.removeChild(that);
		});
	}
});

var Star = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    //星を描く
    this._element = document.createElement('div');
    this.image = WHITE_STAR;
    this.hited = false;
  },
  onaddedtoscene: function(){
    this.parentNode.stars.push(this);
  },
  run: function(){
    var that = this;
    this.hited = true;
    this.tl.scaleTo(0.5,0.5,7).scaleTo(1,1,2).then(function(){
      that.tl.clear();
      that.tl.delay(5).rotateBy(72 ,40 ,EXPO_EASEOUT);
    });
    this.image = YELLOW_STAR;
    playSound(GAME.assets['sound/star.mp3'].clone());
    this.parentNode.star++;
  }
});

var Diffusioner = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);
    this._element = document.createElement('div');
    this._element.className = 'diffusioner';
    this.image = DIFFUSIONER;

    // 倍の早さ
    var movePx = MOVE_PX*2;

    this.beamStatus = {
      top:      {moveX: 0        ,moveY: -movePx},
      topRight: {moveX: movePx   ,moveY: -movePx},
      right:    {moveX: movePx   ,moveY: 0       },
      rightDown:{moveX: movePx   ,moveY: movePx },
      down:     {moveX: 0        ,moveY: movePx },
      downLeft: {moveX: -movePx  ,moveY: movePx },
      left:     {moveX: -movePx  ,moveY: 0       },
      leftTop:  {moveX: -movePx  ,moveY: -movePx}
    };

    this.color = "red";

  },
  run: function(){
    clearTimeout(this.parentNode.endTimer);
    this.parentNode.endTimer = setTimeout(function(){
      GAME.currentScene.gameOver();
    },3500);

    var arc = new HitArc(this.color);
    arc.x = this.x-128;
    arc.y = this.y-128;
    this.parentNode.addChild(arc);

    var i = 0;
    for(var beam in this.beamStatus){
      // 初期設定的な
      var beamInit = {
        x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
        y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
        parentBlock:this,
        beamLength: 1
      }
      this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
      i++;
    }

    playSound(GAME.assets['sound/diffusioner.mp3'].clone());
    //	出したら消滅
    this.parentNode.removeChild(this);
  }
});

var Slanter = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);
    this._element = document.createElement('div');
    this._element.className = 'slanter';
    this.image = SLANTER;
    this.rotation = 45;

    this.beamStatus = {
      topRight: {moveX: MOVE_PX  ,moveY: -MOVE_PX},
      rightDown:{moveX: MOVE_PX  ,moveY: MOVE_PX },
      downLeft: {moveX: -MOVE_PX ,moveY: MOVE_PX },
      leftTop:  {moveX: -MOVE_PX ,moveY: -MOVE_PX}
    };

    this.color = "green";

  },
  run: function(){
    clearTimeout(this.parentNode.endTimer);
    this.parentNode.endTimer = setTimeout(function(){
      GAME.currentScene.gameOver();
    },3500);

    var arc = new HitArc(this.color);
    arc.x = this.x-128;
    arc.y = this.y-128;
    this.parentNode.addChild(arc);

    var i = 0;
    for(var beam in this.beamStatus){
      // 初期設定的な
      var beamInit = {
        x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
        y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
        parentBlock:this,
        beamLength: 2
      }
      this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
      i++;
    }

    playSound(GAME.assets['sound/slanter.mp3'].clone());
    //	出したら消滅
    this.parentNode.removeChild(this);
  }
});

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

var Pipe = Class.create(Sprite,{
  initialize: function(color,pipeStatus){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'pipe';
    this.image = PIPE_COLORS[color].pipe;
    this.pipeStatus = pipeStatus;
    this.color = color;

    // Beam用ステータス
    this.beamStatus = {
      up:{
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
  onaddedtoscene: function(){
    this.pipeOut = new Sprite(BOX_SIZE,BOX_SIZE);
    this.pipeOut._element = document.createElement('div');
    this.pipeOut._element.className = 'pipeOut '+this.pipeStatus.direction;
    this.pipeOut.image = PIPE_COLORS[this.color].pipeOut;
    this.pipeOut.x = this.pipeStatus.x * BOX_SIZE;
    this.pipeOut.y = this.pipeStatus.y * BOX_SIZE;
    this.parentNode.addChild(this.pipeOut);
  },
  onremovedfromscene: function(){
    GAME.currentScene.removeChild(this.pipeOut);
  },
  /**
  * Block.run()
  * 	4方向にBeamを出します
  */
  run: function(){
    clearTimeout(this.parentNode.endTimer);
    this.parentNode.endTimer = setTimeout(function(){
      GAME.currentScene.gameOver();
    },3500);

    var arc = new HitArc(this.color);
    arc.x = this.pipeOut.x-128;
    arc.y = this.pipeOut.y-128;
    this.parentNode.addChild(arc);

    var beamInit = {
      x: this.pipeOut.x+BOX_SIZE/2-BEAM_SIZE/2,
      y: this.pipeOut.y+BOX_SIZE/2-BEAM_SIZE/2,
      color: 'white',
      parentBlock:this.pipeOut,
      beamLength:BEAM_LENGTH
    }
    this.parentNode.addChild(new Beam(this.beamStatus[this.pipeStatus.direction],beamInit));
    playSound(GAME.assets['sound/pipe.mp3'].clone());
    //	出したら消滅
    GAME.currentScene.removeChild(this.pipeOut);
    GAME.currentScene.removeChild(this);
  }
});

var TUTORIALBEAM = [];
//矢印管理用配列
var ARROWARRAY = [];

var tutoSecondScene = null;
var gameOverLabel = new ExLabel(LANGUAGE[COUNTRYCODE].gameOver,640,100);
gameOverLabel.setClassName('gameOverText');
gameOverLabel.x = 0;
gameOverLabel.y = -80;
gameOverLabel.tl.moveTo(0,230,30,BOUNCE_EASEOUT);

var thirdStartMsg = new ExLabel(LANGUAGE[COUNTRYCODE].tutoThirdStartMsg);
thirdStartMsg.x = 100;
thirdStartMsg.y = 160;
thirdStartMsg.setClassName('tuto_black_msg');

//チュートリアル用のBlockクラス
var TutoBlock = Class.create(Sprite,{
  initialize: function(color){
    Sprite.call(this,BOX_SIZE,BOX_SIZE); 

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;
    if(this.color == "start"){
      this.arccolor = "white";
    }else{
      this.arccolor = this.color;
    }
    //矢印出すかどうかフラグ
    this.arrowFlg = true;

    var specFix = (BEAM_SIZE - HIGH_SPECTRUM)/2;
    this.lastFlg = false;
    this.thirdLastFlg = false;

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

  /**
   * 	4方向にBeamを出します
   */
  run: function(){
    var tutoThirdScene = null;
    var arc = new HitArc(this.arccolor);
    arc.x = this.x-128;
    arc.y = this.y-128;
    this.parentNode.addChild(arc);
    var that = this;
    var i = 0;

    this.parentNode.removeChild(thirdStartMsg);

    for(var beam in this.beamStatus){
      if(TUTODIRECTIONS[this.color][i]){
        // 初期設定的な
        var beamInit = {
          x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
          y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
          color: this.color,
          parentBlock:this
        }
        var beam = new TutoBeam(this.beamStatus[beam],beamInit);
        this.parentNode.addChild(beam);
        TUTORIALBEAM.push(beam);
      }
      i++;
    }

    if(this.color == "start"){
      playSound(GAME.assets['sound/start.mp3'].clone());
    }else if(this.color == "blue"){
      playSound(GAME.assets['sound/blue.mp3'].clone());
    }else if (this.color == "white"){
      playSound(GAME.assets['sound/white.mp3'].clone());
    }

    //最後の場合
    if(this.lastFlg){
      var thatNode = this.parentNode;
      this.parentNode.tl.delay(70).then(function(){
        thatNode.addChild(gameOverLabel);
      });

      //メッセージラベル作成
      var loseMsg = createLoseMsg();

      //ゲームオーバの文字の後にメッセージ
      gameOverLabel.tl.delay(100).then(function(){
        //おくらせたい
        thatNode.removeChild(gameOverLabel);
        thatNode.addChild(loseMsg);
      });
      //文言をだしていく
      loseMsg.tl.delay(40).then(function(){
        loseMsg.x = 160;
        loseMsg._element.innerHTML = LANGUAGE[COUNTRYCODE].yourMission;
      });
      loseMsg.tl.delay(100).then(function(){
        loseMsg._element.innerHTML = LANGUAGE[COUNTRYCODE].letsWin;
      });

      tutoThirdScene = new Scene();
      var titleScene = createTitleScene();

      tutoThirdScene.backToTop = function(){
        GAME.replaceScene(titleScene);
      }

      var backToTop = createBacktoTopLabel();
      backToTop.on('touchend',function(){
        this.parentNode.backToTop();
        initTutorialScene();
      });
      tutoThirdScene.addChild(backToTop);

      //一回空に
      tutoCurrentStage = [];
      loseMsg.tl.delay(120).then(function(){
        var j = 0;
        TUTOSTAGES[1].forEach(function(blockInfo){
          var block = StageBuilder(blockInfo);
          block.x = blockInfo.x*BOX_SIZE;
          block.y = blockInfo.y*BOX_SIZE;
          if(j == 1){
            block.arrowFlg = false;
          }
          //ゴールオブジェクトだったとき
          if(blockInfo.name == "tutoGoal"){
            block.nextEndFlg = true;
          }
          tutoCurrentStage.push(block);
          tutoThirdScene.addChild(block);
          j++;
        });

        var pointerArrow = createPointerArrow();
        ARROWARRAY.push(pointerArrow);

        tutoThirdScene.addChild(pointerArrow);
        tutoThirdScene.addChild(thirdStartMsg);

        this.parentNode.removeChild(this);
        GAME.replaceScene(tutoThirdScene);
      });
    }
    //	出したら消滅
    this.parentNode.removeChild(this);
  }
});

var TutoGoal = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    this._element = document.createElement('div');
    this._element.className = 'goal';
    this.backgroundColor = '#F4D03F';
    this.color = "yellow";
    this.scaleX = 0.8;
    this.scaleY = 0.8;
    this.arrowFlg = true;
    //これがないとチュートリアルが無限ループしちゃう
    this.nextEndFlg = false;

    this.tl.scaleTo(0.6,0.6,30,CUBIC_EASEIN).scaleTo(0.8,0.8,30,CUBIC_EASEOUT).loop();
  },
  run: function(){
    this.tl.scaleTo(0.6,0.6,30,CUBIC_EASEIN).scaleTo(0.8,0.8,30,CUBIC_EASEOUT).unloop();
    var that = this;
    // this.parentNode.addChild(arc);
    if(tutoCurrentStage.length > 1){
      return;
    }
    //this.tl.scaleTo(30,30,0,30);
    clearTimeout(this.parentNode.endTimer);
    this.parentNode.cleared = true;

    playSound(GAME.assets['sound/goal.mp3'].clone());

    //どのシーンのゴールかで挙動変わる
    if(this.nextEndFlg){

      var endLabel = createEndLabel();
      GAME.currentScene.addChild(endLabel);

      //文字表示切り替え
      this.tl.clear().scaleTo(30,30,30).then(function(){

      }).delay(30).then(function(){
        endLabel.setClassName('tuto_black_msg');
        endLabel._element.innerHTML = LANGUAGE[COUNTRYCODE].tutoClearMsg2;
      }).delay(100).then(function(){
        endLabel._element.innerHTML = LANGUAGE[COUNTRYCODE].tutoClearMsg3;
      }).delay(40).then(function(){
      }).delay(100).then(function(){
        var titleScene = createTitleScene();
        that.parentNode.removeChild(this);
        GAME.replaceScene(titleScene);
        initTutorialScene();
      })

    }else{
      tutoSecondScene = null;
      var tutoClearMessage = null;
      var nextLosePatternLabel = null;
      //クリアメッセージを出す
      this.tl.clear().scaleTo(30,30,30).delay(30).then(function(){

        tutoClearMessage = new ExLabel(LANGUAGE[COUNTRYCODE].tutoClear);
        tutoClearMessage.x = 120;
        tutoClearMessage.y = 220;
        tutoClearMessage.width = 500;
        tutoClearMessage.height = 200;
        tutoClearMessage.setClassName('TutoMessaFirst');
        tutorialScene.addChild(tutoClearMessage);

        nextLosePatternLabel = new ExLabel(LANGUAGE[COUNTRYCODE].nextLosePattern);
        nextLosePatternLabel .x = 120;
        nextLosePatternLabel.y = 220;
        nextLosePatternLabel.width = 500;
        nextLosePatternLabel.height = 200;
        nextLosePatternLabel.setClassName('TutoMessaFirst');

        that.tl.delay(60).then(function(){
          tutorialScene.removeChild(tutoClearMessage);
          tutorialScene.addChild(nextLosePatternLabel);
        })

        //        tutoSecondScene = createTutorialSecondScene();
        // kokokaraセカンドシーン作成
        tutoSecondScene = new Scene();

        var titleScene = createTitleScene();

        //戻るボタン
        var backToTop = createBacktoTopLabel();

        tutoSecondScene.backToTop = function(){
          GAME.replaceScene(titleScene);
        }
        tutoSecondScene.addChild(backToTop);

        // /*=== ステージの読み込み ===*/
        //終わりフラグ用の変数
        var i = 0;
        tutoCurrentStage = [];
        TUTOSTAGES[1].forEach(function(blockInfo){
          var block = StageBuilder(blockInfo);
          block.x = blockInfo.x*BOX_SIZE;
          block.y = blockInfo.y*BOX_SIZE;
          if(i == TUTOSTAGES[1].length - 2){
            block.lastFlg = true;
          }
          tutoSecondScene.addChild(block);
          tutoCurrentStage.push(block);

          i++;
        });

        var losePatternText = createLosePatternText();
        tutoSecondScene.addChild(losePatternText);
        tutoSecondScene.loseAotamaFlg = true;

        backToTop.on('touchend',function(){
          tutoSecondScene.backToTop();
          initTutorialScene();
        });

        that.tl.delay(100).then(function(){

          tutorialScene.removeChild(that);
          GAME.replaceScene(tutoSecondScene);
          losePatternText.tl.delay(100).then(function(){
            tutoCurrentStage[0].run();
            tutoCurrentStage.splice(0,1);
            tutoSecondScene.removeChild(losePatternText);
          });
        });
      });
    }
  }
});

//チュートリアル専用の拡張クラス
var TutoBeam = Class.create(Sprite,{
  initialize: function(direction ,init){
    Sprite.call(this,BEAM_SIZE,BEAM_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'beam';

    // 初期状態
    this.backgroundColor = '#F4D03F';
    this.direction = direction;
    this.initX = init.x;
    this.initY = init.y;
    this.x = init.x;
    this.y = init.y;
    this.color = init.color;
    //動くフラグ
    this.moveFlg = true;
    //矢印作ったフラグ
    this.makeArrowFlg = false;
    this.aotamaFlg = true;

    this.tutoCurrentStage = tutoCurrentStage;
    this.parentBlock = init.parentBlock;

    this.beamLength = BEAM_LENGTH*BOX_SIZE; //- (BOX_SIZE-BEAM_SIZE)/2;

    this.COLORS = COLORS;

  },
  onenterframe: function(){
    // 衝突検知
    // やっぱこうなるの・・・
    var gimmicks = this.tutoCurrentStage.length;
    thatCurrentStage = this.tutoCurrentStage;
    for(var i = 0; i < thatCurrentStage.length; i++){

      if ( (this.within(this.tutoCurrentStage[i], this.tutoCurrentStage[i].width - 13)) && (this.tutoCurrentStage[i] !== this.parentBlock) ){
        var thatBlock = this.tutoCurrentStage[i];
        var thatI = i;

        if(!this.makeArrowFlg ){
          if(thatBlock.arrowFlg){
            var that = this;
            this.moveFlg = false;

            var pointerArrow2 = createPointerArrow2(that.x,that.y);
            this.parentNode.addChild(pointerArrow2);

            //ゴール当たる手前のとき
            if(this.parentNode.aotamaEndFlg){
              var prevGoalLabel = createPrevGoalLabel();
              this.parentNode.addChild(prevGoalLabel);
              //負けパターンのとき
            }else if(this.parentNode.loseAotamaFlg){
              var endChainLabel = createEndChainLabel();
              this.parentNode.addChild(endChainLabel);
              this.parentNode.endChainEndFlg = true;
            }
            //最初のとき
            else{
              var aotamaLabel = createAotamaLabel();
              this.parentNode.addChild(aotamaLabel);
              this.parentNode.aotamaEndFlg = true;
            }

            pointerArrow2.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT);
            pointerArrow2.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT);
            //ピョンピョン　＋　ストップ
            pointerArrow2.tl.scaleTo(0.9,0.9,20,CUBIC_EASEIN).scaleTo(1.0,1.0,10,CUBIC_EASEOUT).then(function(){
              this.parentNode.removeChild(endChainLabel);
              this.parentNode.removeChild(prevGoalLabel);
              this.parentNode.removeChild(aotamaLabel);
              this.parentNode.removeChild(pointerArrow2);
              that.parentNode.removeChild(that);
              thatBlock.run();
              this.moveFlg = true;
              that.tutoCurrentStage.splice(thatI ,1);
            });
            this.makeArrowFlg = true;
          }else{
            this.parentNode.removeChild(that);
            thatBlock.run();
            this.tutoCurrentStage.splice(i ,1);
          }
        }
      }
    }

    if(this.moveFlg){
      // Beamの移動と生存期間
      if(Math.abs(this.initX-this.x) < this.beamLength 
         &&  Math.abs(this.initY-this.y) < this.beamLength){
           this.x += this.direction.moveX;
           this.y += this.direction.moveY;
         } else {
           // 生存期間を過ぎると消えていく
           this.opacity -= 0.1;
           if(this.opacity < 0){
             this.parentNode.removeChild(this);
           }
         }
    }
  }
});

var TutoBox = Class.create(Sprite,{
  initialize: function(scene){
    Sprite.call(this,BOX_SIZE,BOX_SIZE); 
    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'box';
    this.scene = scene;
  },
  ontouchend: function(){
    var block = new Block('white');
    block.x = this.x;
    block.y = this.y;
    tutoCurrentStage.push(block);
    this.scene.addChild(block);
  }
});

var PointerArrow = Class.create(Sprite,{
  initialize: function(scene){
    Sprite.call(this); 
  },
  erase: function(){
    this.parentNode.removeChild(this);
  },
  ontouchend: function(){
    var block = new TutoBlock('white');
    block.x = 448;
    block.y = 256;
    tutoCurrentStage.push(block);
    this.scene.addChild(block);

    //ゴール時に説明文でないように
    tutoCurrentStage[2].arrowFlg = false;
    //しろたまに当たって説明文でないように
    tutoCurrentStage[3].arrowFlg = false;
    tutoCurrentStage[0].run();
    tutoCurrentStage.splice(0,1);
    ARROWARRAY[0].erase();
    ARROWARRAY.splice(0,1);
  }
});

var VolumeSlider = Class.create(Sprite,{
  initialize: function(w,h){
    var width = w || 640;
    var height = h || 64;
    Sprite.call(this,width,height);
    this.x = 118;
    this.y = 330;

    this._element = document.createElement('div');
    this._element.innerHTML = '<input type="range" max="1.0" step="0.1"/>';
    this._element.className = 'volumeSlider';
  },
  ontouchend: function(){
    //childNodes[0]がinput rangeであると仮定
    VOLUME = this._element.childNodes[0].value;
  }
});

function playSound(sound){
  sound.volume = VOLUME;
  sound._element.style.zIndex = 1;
  sound.play();
}

var EditBox = Class.create(Box,{
  initialize: function(xNumber,yNumber){
  //生成時にBoxの場所を引き数に持つ
    Box.call(this,BOX_SIZE,BOX_SIZE);
    // DOMモード
    this._element = document.createElement('div');
    //下線対応
    console.log(yNumber);
    if(yNumber == 9){
      this._element.className = 'box edit_underline';
    }else{
      this._element.className = 'box';
    }
    this.moved = false;
    //idを降ってステージ作成に活かす
    this.xId = xNumber || -1;
    this.yId = yNumber || -1;
  },
  ontouchstart: function(e){
    this.startEvent = e;
    this.moved = false;
    this._element.className = 'box touched';

    var penColor = creater.penColor;
    var obj = null;

    if(penColor == "start"){
      obj = new EditStart();
      //クリエイターがみんなから見えるので色々持たす
      creater.putStartFlg = true;
      creater.startObj = obj;
    }else if(penColor == "slanter" ){
      obj = new EditSlanter(this.xId,this.yId);
      creater.currentStage.push(obj);
    } else{
      obj = new EditBlock(penColor);
      creater.currentStage.push(obj);
    }
    obj.x = this.x;
    obj.y = this.y;
    this.parentNode.addChild(obj);

    //TODO 上書き機能
    creater.stages[this.xId][this.yId] = obj.color;

  },
  ontouchmove: function(e){
    if(Math.abs(this.startEvent.x - e.x) > 10 || Math.abs(this.startEvent.y - e.y) > 10){
      this.moved = true;
    }
  },
  ontouchend: function(){
    this._element.className = 'box';
    if(!this.parentNode.canTap){
      return;
    } else if(this.moved){
      return;
    }
    this.parentNode.canTap = false;
    var block = new Block('white');
    block.x = this.x;
    block.y = this.y;
    currentStage.push(block);
    this.parentNode.addChild(block);
  }
});

var BlockInk = Class.create(Block,{
  initialize: function(color){
    Block.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;

  },
  ontouchstart: function(){
    creater.penColor = this.color;
  }
});

var Creater =  function(color){
  this.penColor = color || 'white';
  this.stages = new Array(10);
  //スタートが置かれるまでは-1のまま
  this.startPin = -1;
  var that = this;
  //ステージ生成の元
  for(var x = 0; x < 10; x++){
    that.stages[x] = new Array(10);
  }
  //スタート地点を置いたフラグこれがないと実行出来ないようにする
  this.putStartFlg = false;
  this.startObj = null;

  //これで実行のcurrentStage管理
  this.currentStage = new Array(10);

}

function makeJSON(stages){
  console.log(stages);
  var json = JSON.stringify(stages);
  console.log(json);
}

function doPost(action){
  var submitType = document.createElement("input");
  submitType.setAttribute("type","hidden");
}

var TestPlayButton = Class.create(ExLabel,{
  initialize: function(text,w,h){
    ExLabel.call(this,BOX_SIZE,BOX_SIZE);
    var width = w || 640;
    var height = h || 64;

    // DOMモード
    this._element = document.createElement('div');
    this._element.innerHTML = text;
  },
  ontouchstart: function(){
    //実行
    creater.startObj.run(); 
  },
  setClassName: function(className){
    this._element.className = className;
  }
});

var EditStart = Class.create(Start,{
  initialize: function(){
    Start.call(this,BOX_SIZE,BOX_SIZE);

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
    //爆発した場所のxId,yIdを引き数に持つ
    var arc = new HitArc('white');
    arc.x = this.x-128;
    arc.y = this.y-128;
    GAME.currentScene.addChild(arc);

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
        GAME.currentScene.addChild(new EditBeam(this.beamStatus[beam],beamInit));
      }
      i++;
    }

    playSound(GAME.assets['sound/start.mp3'].clone());

    //出したら消滅
    GAME.currentScene.removeChild(this);
    creater.startObj = null;
  }
});

var EditBeam = Class.create(Beam,{
  initialize: function(direction ,init){
    Beam.call(this,BEAM_SIZE,BEAM_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'beam';

    // 初期状態
    this.direction = direction;
    this.initX = init.x;
    this.initY = init.y;
    this.x = init.x;
    this.y = init.y;

    this.currentStage = currentStage;
    this.parentBlock = init.parentBlock;
    this.beamLength = init.beamLength*BOX_SIZE;

    this.COLORS = COLORS;

  },
  onenterframe: function(){
    // 衝突検知
    // やっぱこうなるの・・・
    var gimmicks = creater.currentStage.length;
    var distance = BOX_HALF+12;
    for(var i = 0; i < gimmicks; i++){
      if(!creater.currentStage[i]){
      } else
      if(this.within(creater.currentStage[i], distance) && creater.currentStage[i] !== this.parentBlock){
        // 発射！
        creater.currentStage[i].run();

        // 当たったら消える
        delete creater.currentStage[i];
        creater.currentStage.splice(i,1);
        GAME.currentScene.removeChild(this);
        return;
      }
    }

    // Beamの移動と生存期間
    if(Math.abs(this.initX-this.x) < this.beamLength
       &&  Math.abs(this.initY-this.y) < this.beamLength){
         this.x += this.direction.moveX;
         this.y += this.direction.moveY;
       } else {
         // 生存期間を過ぎると消えていく
         this.opacity -= 0.1;
         if(this.opacity < 0){
           GAME.currentScene.removeChild(this);
         }
       }
  }
});

var EditBlock = Class.create(Block,{
  initialize: function(color){
    Block.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;

    if(this.color === 'orange'){
      this.image = ORANGE;
    } else if(this.color === 'purple'){
      this.image = PURPLE;
    }

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
  /**
   * Block.run()
   * 	4方向にBeamを出します
   */
  run: function(){
    if( 0 < effectLevel){
      var arc = new HitArc(this.color);
      arc.x = this.x-128;
      arc.y = this.y-128;
      GAME.currentScene.addChild(arc);
    }

    var i = 0;
    for(var beam in this.beamStatus){
      if(DIRECTIONS[this.color][i]){
        // 初期設定的な
        var beamInit = {
          x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
          y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
          parentBlock:this,
          beamLength:BEAM_LENGTH
        }
        GAME.currentScene.addChild(new EditBeam(this.beamStatus[beam],beamInit));
      }
      i++;
    }

    switch (this.color){
      case "blue":
        playSound(GAME.assets['sound/blue.mp3'].clone());
        break;
      case "green":
        playSound(GAME.assets['sound/green.mp3'].clone());
        break;
      case "red":
        playSound(GAME.assets['sound/red.mp3'].clone());
        break;
      case "purple":
        playSound(GAME.assets['sound/purple.mp3'].clone());
        break;
      case "orange":
        playSound(GAME.assets['sound/orange.mp3'].clone());
        break;
      case "white":
        playSound(GAME.assets['sound/white.mp3'].clone());
        break;
    }
    //	出したら消滅
    GAME.currentScene.removeChild(this);1
  }
});

var EditSlanter = Class.create(Slanter,{
  initialize: function(){
    Slanter.call(this,BOX_SIZE,BOX_SIZE);
    this._element = document.createElement('div');
    this._element.className = 'slanter';
    this.image = SLANTER;
    this.rotation = 45;

    this.beamStatus = {
      topRight: {moveX: MOVE_PX  ,moveY: -MOVE_PX},
      rightDown:{moveX: MOVE_PX  ,moveY: MOVE_PX },
      downLeft: {moveX: -MOVE_PX ,moveY: MOVE_PX },
      leftTop:  {moveX: -MOVE_PX ,moveY: -MOVE_PX}
    };

    this.color = "green";

  },
  run: function(){

    var arc = new HitArc(this.color);
    arc.x = this.x-128;
    arc.y = this.y-128;
    GAME.currentScene.addChild(arc);

    var i = 0;
    for(var beam in this.beamStatus){
      // 初期設定的な
      var beamInit = {
        x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
        y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
        parentBlock:this,
        beamLength: 2
      }
      GAME.currentScene.addChild(new EditBeam(this.beamStatus[beam],beamInit));
      i++;
    }

    playSound(GAME.assets['sound/slanter.mp3'].clone());
    //	出したら消滅
    GAME.currentScene.removeChild(this);
  }
});

var SlanterInk = Class.create(Slanter,{
  initialize: function(color){
    Slanter.call(this,BOX_SIZE,BOX_SIZE);

    this._element = document.createElement('div');
    this._element.className = 'slanter';
    this.image = SLANTER;
    this.rotation = 45;

    this.color = "green";

  },
  ontouchstart: function(){
    creater.penColor = 'slanter';
  }
});
