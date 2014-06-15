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
		{ x:0 ,y:9 ,name: 'start'},
		{ x:0 ,y:6 ,name: 'block',color:'purple'},
		{ x:3 ,y:6 ,name: 'block',color:'orange'},
		{ x:3 ,y:3 ,name: 'block',color:'purple'},
		{ x:2 ,y:8 ,name: 'block',color:'blue'},
		{ x:6 ,y:0 ,name: 'block',color:'purple'},
		{ x:5 ,y:5 ,name: 'block',color:'blue'},
		{ x:5 ,y:7 ,name: 'block',color:'orange'},
		{ x:5 ,y:9 ,name: 'block',color:'blue'},
		{ x:4 ,y:9 ,name: 'star'},
		{ x:6 ,y:7 ,name: 'star'},
		{ x:8 ,y:5 ,name: 'star'},
		{ x:6 ,y:3 ,name: 'block',color:'orange'},
		{ x:9 ,y:0 ,name: 'goal'}
	],
	[
		{ x:0 ,y:4 ,name: 'start'},
		{ x:3 ,y:4 ,name: 'block',color:'red'},
		{ x:8 ,y:4 ,name: 'block',color:'green'},
		{ x:3 ,y:2 ,name: 'star'},
		{ x:6 ,y:2 ,name: 'star'},
		{ x:8 ,y:2 ,name: 'star'},
		{ x:8 ,y:7 ,name: 'goal'}
	],
	[
		{ x:1 ,y:4 ,name: 'start'},
		{ x:3 ,y:4 ,name: 'block',color:'orange'},
		{ x:3 ,y:2 ,name: 'block',color:'purple'},
		{ x:3 ,y:6 ,name: 'block',color:'purple'},
		{ x:6 ,y:6 ,name: 'block',color:'purple'},
		{ x:0 ,y:2 ,name: 'star'},
		{ x:0 ,y:6 ,name: 'star'},
		{ x:6 ,y:2 ,name: 'star'},
		{ x:8 ,y:4 ,name: 'goal'}
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
		{ x:0 ,y:4 ,name: 'start'},
		{ x:3 ,y:4 ,name: 'block',color:'red'},
		{ x:6 ,y:4 ,name: 'block',color:'blue'},
		{ x:3 ,y:2 ,name: 'star'},
		{ x:6 ,y:2 ,name: 'star'},
		{ x:8 ,y:2 ,name: 'star'},
		{ x:8 ,y:7 ,name: 'goal'}
	],
	[
		{ x:0 ,y:4 ,name: 'start'},
		{ x:3 ,y:4 ,name: 'block',color:'red'},
		{ x:6 ,y:4 ,name: 'block',color:'blue'},
		{ x:3 ,y:2 ,name: 'star'},
		{ x:6 ,y:2 ,name: 'star'},
		{ x:8 ,y:2 ,name: 'star'},
		{ x:8 ,y:7 ,name: 'goal'}
	]
];

//チュートリアル用のステージ配列
var TUTOSTAGES = [
	[
		{ x:1 ,y:4 ,name: 'tutoBlock',color:'white'},
		{ x:4 ,y:4 ,name: 'tutoBlock',color:'blue'},
		{ x:7 ,y:4 ,name: 'tutoGoal',color:'green'}
	],
	[
		{ x:1 ,y:4 ,name: 'tutoBlock',color:'white'},
		{ x:4 ,y:4 ,name: 'tutoBlock',color:'blue'},
		{ x:7 ,y:7 ,name: 'tutoGoal',color:'green'}
	],
	[
		{ x:1 ,y:4 ,name: 'tutoBlock',color:'white'},
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

var userData;
var stageBoxes = [];
var stageGroup;
// var userData = [
// 	3,2,3,1,1,3,2,0,2,1,0,1,3
// ];
