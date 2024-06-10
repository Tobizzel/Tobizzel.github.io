function myfunction(){
    var element = document.getElementById('mutelogo');
    var element2 = document.getElementById('demutelogo');
    var element3 = document.getElementById('dubbed');
    element.style.opacity="1";
    element.style.transition='all 2s ease';
    element.style.left = '85vw';
    element2.style.transition='all 2s ease';
    element2.style.left = '85vw';
    element3.style.transition='all 2s ease';
    element3.style.left = '90vw';
    element3.style.opacity = "0";
}

document.addEventListener("DOMContentLoaded", function(){
    var div = document.getElementById('contentwrapper');
    var link = document.getElementById('ytlink');
    var classelements = document.getElementsByClassName("navigation");
    var navlist = document.getElementsByTagName("nav");
    var timeout;
    
    function resetTimer(){
        clearTimeout(timeout);
        changeclasses(1, 1);
        div.classList.remove("hidden");
        link.classList.remove("hidden");
        timeout = setTimeout(hideDiv, 4000);
    }

    function hideDiv(){
        changeclasses(0.5, 3);
        div.classList.add("hidden");
        link.classList.add("hidden");
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

function myScroll(event) {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            console.log("Target befor scroll:" + target);
            console.log("Current Scroll: " + window.scrollY);
            scrollTimeout = null;


            if (!ticking && lastScroll < window.scrollY) {
                ticking = true;
                console.log("Downscroll detected");
                target = lastScroll + window.innerHeight;
                console.log("Target nach Scroll, aber vor Check: " + target);
                console.log("Maximaler Scroll: " + maxScroll);
                if (target > maxScroll) {
                    console.log("No Minus Value"); 
                    target = maxScroll;
                    console.log("Korrigierter Scroll: " + target);
                }
                //console.log("Target: " + target);

                scrolldown();
                //setTimeout(function(){ticking = false}, 4000);
            }
        
            else if (!ticking && lastScroll > window.scrollY) {
                    ticking = true;
                    target = lastScroll - window.innerHeight;
                    scrollup();
                    if (target < 0) {
                        console.log("Whoa that escaleted quickly"); 
                        target = 0;
                    }
                    //setTimeout(function(){ticking = false}, 4000);
                };

            if (window.scrollY != target) {
                    //ticking = true;
                    window.scrollTo({top: target, behavior: 'smooth'});
                    console.log("still Scrolling");
                }

            if (window.scrollY == target) {
                    console.log("Scroll erreicht");
                    ticking = false;
                    lastScroll = target;
                }
    }, 500); //Throttle 500ms
}
};

document.addEventListener("scroll", myScroll);

function scrolldown(){
    players[currentplayer].pauseVideo();
    //target = window.scrollY + window.innerHeight;
    //console.log("Scroll Position: " + this.window.scrollY);
    //console.log("Scrollweite: " + window.innerHeight);
    //console.log("Target: " + target);
    window.scrollTo({top: target, behavior: 'smooth'});
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

    //lastScroll = target;
}

function scrollup() {
    players[currentplayer].pauseVideo();
    //target = window.scrollY - window.innerHeight;
    //console.log("Scroll Position: " + window.scrollY);
    //console.log("Scrollweite: " + window.innerHeight);
    //console.log("Target: " + target);
    window.scrollTo({top: target, behavior: 'smooth'});
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

    //lastScroll = target;
}