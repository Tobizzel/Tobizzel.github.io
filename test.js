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
/*
document.addEventListener("scroll", (event) => {

    console.log(ticking);
    if(ticking) return; */
        

/* Chat GPT
function scrolldown() {
    players[currentplayer].pauseVideo();
    let target = window.scrollY + window.innerHeight;
    console.log("Scroll Position: " + window.scrollY);
    console.log("Scrollweite: " + window.innerHeight);
    console.log("Target: " + target);

    smoothScrollTo(target);

    currentplayer = currentplayer + 1;

    if (currentplayer > players.length - 1) {
        currentplayer = players.length - 1;
    }

    players[currentplayer].playVideo();

    let currentytlink = "https://www.youtube.com/watch?v=" + ytvideolist[currentplayer];
    document.getElementById("ytlink").href = currentytlink;

    if (mutestatus == 0) {
        players[currentplayer].unMute();
    } else {
        players[currentplayer].mute();
    }

    lastScroll = target;
    console.log("scrolldown function executed");
}

function scrollup() {
    players[currentplayer].pauseVideo();
    let target = window.scrollY - window.innerHeight;
    console.log("Scroll Position: " + window.scrollY);
    console.log("Scrollweite: " + window.innerHeight);
    console.log("Target: " + target);

    smoothScrollTo(target);

    currentplayer = currentplayer - 1;
    if (currentplayer < 0) {
        currentplayer = 0;
    }
    players[currentplayer].playVideo();

    let currentytlink = "https://www.youtube.com/watch?v=" + ytvideolist[currentplayer];
    document.getElementById("ytlink").href = currentytlink;

    if (mutestatus == 0) {
        players[currentplayer].unMute();
    } else {
        players[currentplayer].mute();
    }

    lastScroll = target;
    console.log("scrollup function executed");
}

function smoothScrollTo(target) {
    const duration = 500; // Kürzere Dauer für schnellere Reaktion
    const start = window.scrollY;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

function throttleScroll(event) {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;

            console.log("scroll event detected");

            if (ticking) {
                window.scrollTo({ top: lastScroll, behavior: 'smooth' });
                console.log("ticking is true, scrollTo lastScroll");
            }

            if (!ticking && lastScroll < window.scrollY) {
                ticking = true;
                console.log("scrolling down");
                scrolldown();
                setTimeout(function () {
                    ticking = false;
                    console.log("ticking set to false after timeout");
                }, 1000);
            } else if (!ticking && lastScroll > window.scrollY) {
                ticking = true;
                console.log("scrolling up");
                scrollup();
                setTimeout(function () {
                    ticking = false;
                    console.log("ticking set to false after timeout");
                }, 1000);
            }
        }, 100); // 100ms throttle
    }
}

document.addEventListener("scroll", throttleScroll); */