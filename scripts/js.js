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
    var classelements = document.getElementsByClassName("navigation");
    var navlist = document.getElementsByTagName("nav");
    var timeout;
    
    function resetTimer(){
        clearTimeout(timeout);
        changeclasses(1, 1);
        div.classList.remove("hidden");
        timeout = setTimeout(hideDiv, 4000);
    }

    function hideDiv(){
        changeclasses(0.5, 3);
        div.classList.add("hidden");
    }

    function changeclasses(mult, navmult) {
        for (i=classelements.length -1 , x=-1; i > x; i--){
            navlist[0].style.marginLeft = (10 * navmult) +"vw";
            classelements[i].style.height = (10 * mult) + "vh";
            classelements[i].style.width = (10 * mult) + "vw";
            classelements[i].style.lineHeight = (10 * mult) + "vh";
            classelements[i].style.fontSize = (2 * mult) + "vh";
            if (i == classelements.length - 1){
                classelements[i].style.marginRight = "0";
            }
            else{
                classelements[i].style.marginRight = (7.5 * mult) + "vw";
            }   
        }
    }

    document.addEventListener("mousemove", resetTimer);

    resetTimer()
})

function scrolldown(){
    players[currentplayer].pauseVideo();
    //window.scrollBy(0, window.innerHeight);
    target = window.scrollY + window.innerHeight;
    console.log("Scroll Position: " + this.window.scrollY);
    console.log("Scrollweite: " + window.innerHeight);
    console.log("Target: " + target)
    window.scrollTo({top: target, behavior: 'smooth'})
    currentplayer = currentplayer + 1;

    if (currentplayer > players.length - 1){
        currentplayer = players.length - 1;
    }

    players[currentplayer].playVideo();

    currentytlink = "https://www.youtube.com/watch?v=" + ytvideolist[currentplayer];
    document.getElementById("ytlink").href = currentytlink;

    if (mutestatus == 0){
        players[currentplayer].unMute();
    }else{
        players[currentplayer].mute();
    }

    lastScroll = target;
}

function scrollup() {
    players[currentplayer].pauseVideo();
    target = window.scrollY - window.innerHeight;
    console.log("Scroll Position: " + window.scrollY);
    console.log("Scrollweite: " + window.innerHeight);
    console.log("Target: " + target)
    window.scrollTo({top: target, behavior: 'smooth'})
    currentplayer = currentplayer - 1;
    if (currentplayer < 0){
        currentplayer = 0;
    }
    players[currentplayer].playVideo();

    currentytlink = "https://www.youtube.com/watch?v=" + ytvideolist[currentplayer];
    document.getElementById("ytlink").href = currentytlink;


    if (mutestatus == 0){
        players[currentplayer].unMute();
    }else{
        players[currentplayer].mute();
    }

    lastScroll = target;
}

document.addEventListener("scroll", (event) => {

    if (ticking) {
        window.scrollTo({top: lastScroll, behavior: 'smooth'})
    }

    if (!ticking & lastScroll < window.scrollY) {
        ticking = true;
        scrolldown();
        setTimeout(function(){ticking = false}, 1000);
      }
  
    else if (!ticking & lastScroll > window.scrollY) {
            ticking = true;
            scrollup();
            setTimeout(function(){ticking = false}, 1000);
        };
    }  );