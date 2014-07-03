function playSound(sound){
  sound.volume = VOLUME;
  if(SOUNDFLG){
    sound.play();
  }else{
    return;
  }
}
