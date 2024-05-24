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

window.addEventListener('scroll', function() {
  // scroll down
  if (lastScroll < window.scrollY) {
    window.scrollBy(0, window.innerHeight);
    console.log(window.scrollY);
  }
  // scroll up
  else if (lastScroll > window.scrollY) {
    window.scrollBy(0, window.innerHeight * -1);
    console.log(window.scrollY);
  }
  lastScroll = window.scrollY;
});
