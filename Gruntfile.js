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
          'js/Sound.js',
          'js/main.js',
          'js/TitleBackAnim.js',
          'js/creaters/ObjectsCreaters.js',
          'js/creaters/createTutorialScene.js',
          'js/creaters/createStageScene.js',
          'js/creaters/createTitleScene.js',
          'js/creaters/createSelectScene.js',
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
          'js/VolumeSlider.js'
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
        files: ['js/*.js','js/game.js','js/gimmicks/*.js','js/creaters/*.js','css/*.css'],
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
