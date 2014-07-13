module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // ファイル結合の設定
    concat: {
      dist: {
        src: [
          'js/define.js',
          'js/i18n.js',
          'js/main.js',
          'js/TitleBackAnim.js',
          'js/creaters/ObjectsCreaters.js',
          'js/creaters/createTutorialScene.js',
          'js/creaters/createStageScene.js',
          'js/creaters/createTitleScene.js',
          'js/creaters/createSelectScene.js',
          'js/creaters/createStageEditScene.js',
          'js/StageGroup.js',
          'js/StageBox.js',
          'js/Box.js',
          'js/HitArc.js',
          'js/Timer.js',
          'js/Result.js',
          'js/GameOver.js',
          'js/ExLabel.js',
          'js/gimmicks/Beam.js',
          'js/gimmicks/Block.js',
          'js/gimmicks/CountBlock.js',
          'js/gimmicks/Start.js',
          'js/gimmicks/Goal.js',
          'js/gimmicks/Star.js',
          'js/gimmicks/Diffusioner.js',
          'js/gimmicks/Slanter.js',
          'js/gimmicks/Linker.js',
          'js/gimmicks/Pipe.js',
          'js/tutorial.js',
          'js/VolumeSlider.js',
          'js/Sound.js',
          'js/stageedit/EditBox.js',
          'js/stageedit/BlockInk.js',
          'js/stageedit/Creater.js',
          'js/stageedit/makeJSON.js',
          'js/stageedit/Post.js',
          'js/stageedit/TestPlayButton.js',
          'js/stageedit/EditStart.js',
          'js/stageedit/EditBeam.js',
          'js/stageedit/EditBlock.js',
          'js/stageedit/EditSlanter.js',
          'js/stageedit/SlanterInk.js',
          'js/stageedit/DiffusionerInk.js',
          'js/stageedit/EditDiffusioner.js',
          'js/stageedit/PipeInk.js',
          'js/stageedit/EditPipe.js',
          'js/stageedit/EditChildPipe.js',
          'js/stageedit/PipeColorButton.js',
          'js/stageedit/PipeManager.js',
          'js/stageedit/PipeDirectionArrow.js',
          'js/stageedit/ChildPipeInk.js',
          'js/stageedit/EditGoal.js',
          'js/stageedit/GoalInk.js',
          'js/stageedit/StarInk.js',
          'js/stageedit/EditStar.js',
          'js/stageedit/SendButton.js'
        ],
        dest: 'js/game.js'
      }
    },

    // ファイル圧縮の設定
    uglify: {
      build: {
        src: 'js/game.js',
        dest: 'js/game.min.js'
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/gameStyle.min.css': ['css/gameStyle.css']
        }
      }
    },

    watch: {
      scripts: {
        files: ['js/*.js','js/game.js','js/gimmicks/*.js','js/creaters/*.js','js/stageedit/*.js','css/gameStyle.css'],
        tasks: ['concat','uglify','cssmin'],
        options: {
          spawn: true,
        }
      }
    },


  });

  // プラグインのロード
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // デフォルトタスクの設定
  grunt.registerTask('build', [ 'concat', 'uglify', 'cssmin']);
};
