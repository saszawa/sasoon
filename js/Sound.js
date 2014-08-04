function playSound(soundName){
  if(enchant.ENV.BROWSER == "safari" || enchant.ENV.BROWSER == "mobilesafari"){
    GAME.assets['sound/'+ soundName + '.mp3'].volume = VOLUME;
    GAME.assets['sound/'+ soundName + '.mp3'].clone().play();
  }
  else{
    AUDIO_LIST[soundName].volume = VOLUME;
    // サウンド再生
    AUDIO_LIST[soundName].play();
    //一回からにする
    var src = AUDIO_LIST[soundName].src;
    AUDIO_LIST[soundName] = void 0;
    // // 次呼ばれた時用に新たに生成
    AUDIO_LIST[soundName] = new Audio( src );
  }
}
