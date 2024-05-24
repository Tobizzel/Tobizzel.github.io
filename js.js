function myfunction(){
    var element = document.getElementById('mutelogo');
    var element2 = document.getElementById('demutelogo');
    element.style.opacity="1";
    element.style.transition='all 2s ease';
    element.style.left = '85vw';
    element2.style.transition='all 2s ease';
    element2.style.left = '85vw';
}

document.addEventListener("DOMContentLoaded", function(){
    var div = document.getElementById('contentwrapper');
    var timeout;
    
    function resetTimer(){
        clearTimeout(timeout);
        div.classList.remove("hidden");
        timeout = setTimeout(hideDiv, 4000);
    }

    function hideDiv(){
        // div.style.display="none";
        div.classList.add("hidden");
    }

    document.addEventListener("mousemove", resetTimer);

    resetTimer()
})

/* document.addEventListener("mousemove", function(){
    var div = document.getElementById('contentwrapper');
    div.style.display="block";
}) */

let lastScroll = 0;
let currentplayer = 0;
let players = [];

window.addEventListener('scroll', function() {
  // scroll down
  if (lastScroll < window.scrollY) {
    players[currentplayer].pauseVideo();
    window.scrollBy(0, window.innerHeight);
    currentplayer = currentplayer + 1;
    if (currentplayer > players.length - 1){
        currentplayer = players.length - 1;
    }

    players[currentplayer].playVideo();
    if (mutestatus == 0){
        players[currentplayer].unMute();
    }else{
        players[currentplayer].mute();
    }
  }
  // scroll up
  else if (lastScroll > window.scrollY) {
    players[currentplayer].pauseVideo();
    window.scrollBy(0, window.innerHeight * -1);
    currentplayer = currentplayer - 1;
    if (currentplayer < 0){
        currentplayer = 0;
    }
    players[currentplayer].playVideo();
    if (mutestatus == 0){
        players[currentplayer].unMute();
    }else{
        players[currentplayer].mute();
    }

  }
  lastScroll = window.scrollY;
});
