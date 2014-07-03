function playSound(sound){
  sound.volume = VOLUME;
  sound._element.style.zIndex = 1;
  sound.play();
}
