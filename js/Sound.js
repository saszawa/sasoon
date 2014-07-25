function playSound(soundName){
  AUDIO_LIST[soundName].volume = VOLUME;
  // サウンド再生
  AUDIO_LIST[soundName].play();
  // // 次呼ばれた時用に新たに生成
  AUDIO_LIST[soundName] = new Audio( AUDIO_LIST[soundName].src );
}
