document.addEventListener("DOMContentLoaded", initSite());

async function initSite(){
    console.log(await loadYoutubeAPI());
    console.log(await loadYoutubePlayers());
    console.log(await initVariables());
    console.log(await startWebsite());
}

async function loadYoutubeAPI(){
    return new Promise(function(resolve) {
        if (!(typeof YT =="undefined")){
            resolve("Already loaded!");
        }

        var tag = document.createElement('script');
        tag.src = "//www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        setInterval(function(){if(!(typeof YT =="undefined")){resolve("Sucessfully loaded!")}}, 100 );
    });    
}

async function loadYoutubePlayers() {
    return new Promise(function(resolve) {
        let x = 0;
        window.players= [];
        for (let i = 0; i < ytvideolist.length; i++) {
            divname = "div"+ i;
            newDiv = document.createElement("video");
            newDiv.setAttribute("id", divname);
            newDiv.setAttribute("class", "section")
            beforeDiv = document.getElementById("NicesVideoDiv");
            document.body.insertBefore(newDiv, beforeDiv)

            player = new YT.Player (divname, {
                videoId: ytvideolist[i].videourl,
                height: window.innerHeight,
                width: window.innerWidth,
                playerVars: {
                    'disablekb': 1,
                    'controls': 0,
                    'showinfo': 0,
                    'loop': 1,
                    'fs': 0,
                    'mute': 1,
                    'cc_load_policy': 1,
                    //'cc_lang_pref': 'en',
                    'hl': 'de',
                    'start': ytvideolist[i].startsek,
                    'end': ytvideolist[i].startsek + 30,
                },
                events: {
                    'onStateChange': onPlayerStateChange,
                }
            });
        
            players.push(player);
     
            x = x + 1;
        }

        resmes = "Es wurden " + x + " YT Videos geladen!";
        var allDivs = document.querySelectorAll("video");
        allDivs.forEach(element => {
            element.remove();
        });

        resolve(resmes);
    });
}

async function initVariables(){

    return new Promise(function(resolve) {
        //Globe Variablen setzen
            window.sections = document.querySelectorAll(".section");
            window.currentSection = 0;
            window.previousSection = 0;
            window.isScrolling = false;
            window.hideTimeout = 0;
            window.contentWrapperElement = document.getElementById('contentwrapper');
            window.ytLinkElement = document.getElementById('ytlink');
            window.navigationClassElement = document.getElementsByClassName("navigation");
            window.navigationTagElement = document.getElementsByTagName("nav");
            window.muteStatus = true;
            window.muteLogo = document.getElementById('mutelogo');
            window.unMuteLogo = document.getElementById('demutelogo');
            window.unMuteText = document.getElementById('entmutetext');
            window.muteInterval = 0;

    
        resolve("Variables declared!");
    });
}

async function startWebsite(){
    return new Promise(function(resolve) {
        // Always Scroll to Top on Reaload
            document.querySelectorAll("iframe")[0].scrollIntoView();

        // Positionierung der UI Elemente
            var element3 = document.getElementById('dubbed');
            muteLogo.style.opacity="1";
            muteLogo.style.transition='all 2s ease';
            muteLogo.style.left = '85vw';
            unMuteLogo.style.transition='all 2s ease';
            unMuteLogo.style.left = '85vw';
            element3.style.transition='opacity 6s ease';
            element3.style.opacity = "0";
            
        // Ersten Link setzen    
            currentytlink = "https://www.youtube.com/watch?v=" + ytvideolist[0].videourl;
            ytLinkElement.href = currentytlink;
        
        // EventListner initalisieren
            document.addEventListener('wheel', handleScroll);
            document.addEventListener('mousemove', resetHideTimer)
            resetHideTimer();

            muteInterval = setInterval(checkmute, 15000);

            const checkPlayerReady = setInterval(function(){if (players[0] && typeof players[0].playVideo === 'function'){
                players[0].playVideo();
                clearInterval(checkPlayerReady);
            }}, 100);
            
        resolve("Website ist komplett startklar!");

    });
}

async function onPlayerStateChange(event) {
    if (event.data == 0){
        previousSection = currentSection;
        players[currentSection].seekTo(ytvideolist[currentSection].startsek);
        currentSection = currentSection + 1;

        isScrolling = true;
        await scrollToSection(sections[currentSection]);
        isScrolling = false;
    }
}

function resetHideTimer() {
    clearTimeout(hideTimeout);
    changeclasses(1,1);
    contentWrapperElement.classList.remove("hidden");
    contentWrapperElement.classList.add("hideshown");
    ytLinkElement.classList.remove("hidden");
    hideTimeout = setTimeout(hideNavigationElements, 4000);
}

function hideNavigationElements(){
    changeclasses(0.5, 3);
    contentWrapperElement.classList.add("hidden");
    contentWrapperElement.classList.remove("hideshown");
    ytLinkElement.classList.add("hidden");
}

function changeclasses(mult, navmult) {
    for (i=navigationClassElement.length - 1 , x=-1; i > x; i--){
        navigationTagElement[0].style.marginLeft = (10 * navmult) +"vw";
        navigationClassElement[i].style.height = (5 * mult) + "vh";
        navigationClassElement[i].style.width = (10 * mult) + "vw";
        navigationClassElement[i].style.lineHeight = (5 * mult) + "vh";
        navigationClassElement[i].style.fontSize = (2 * mult) + "vh";
        if (i == navigationClassElement.length - 1){
            navigationClassElement[i].style.marginRight = "0";
        }
        else{
            navigationClassElement[i].style.marginRight = (7.5 * mult) + "vw";
        }   
    }
}

// Fullpage Scroll
    function scrollToSection(element) {
        return new Promise(function(resolve) {
            element.scrollIntoView({ behavior: 'smooth' });
            differentchecks(element);
            setTimeout(resolve, 1500);

        });   
    }

    async function navScroll(element) {
        for (let i = 0; i < sections.length; i++) {
            if (element == sections[i]){
                previousSection = currentSection;
                currentSection = i;
            }
        }

        isScrolling = true;
        await scrollToSection(element);
        isScrolling = false;
    }

    async function handleScroll(event) {
        if (isScrolling) return;
        isScrolling = true;
        previousSection = currentSection;

        if (event.deltaY > 0) {
            currentSection = Math.min(currentSection + 1, sections.length - 1);
        } else {
            currentSection = Math.max(currentSection - 1, 0);
        }

        await scrollToSection(sections[currentSection]);

        isScrolling = false;
    }

    function differentchecks(){

        if (previousSection <= players.length - 1){
            players[previousSection].pauseVideo();
        }

        if (currentSection <= players.length - 1){
            players[currentSection].playVideo();
            currentytlink = "https://www.youtube.com/watch?v=" + ytvideolist[currentSection].videourl;
            ytLinkElement.href = currentytlink;

            if(muteStatus){
                players[currentSection].mute();
            }

            else{
                players[currentSection].unMute();
            }
        }

        if (currentSection <= players.length - 1 && previousSection >= players.length - 1){
            document.addEventListener('mousemove', resetHideTimer);
            resetHideTimer();
            if (muteStatus){
                muteLogo.style.opacity = 1;
                unMuteLogo.style.opacity = 0;
            } else {
                muteLogo.style.opacity = 0;
                unMuteLogo.style.opacity = 1;
            }
        }

        if (currentSection > players.length - 1){
            clearTimeout(hideTimeout);
            document.removeEventListener('mousemove', resetHideTimer);
            contentWrapperElement.classList.remove("hidden");
            contentWrapperElement.classList.remove("hideshown");
            changeclasses(1,1);
            ytLinkElement.classList.add("hidden");
            muteLogo.style.opacity = 0;
            unMuteLogo.style.opacity = 0;

            


        }    
    }

function mutebutton(){

    if (muteStatus){
        players[currentSection].unMute();
        muteLogo.style.transistion = "all 0.1s ease";
        muteLogo.style.opacity = 0;
        muteLogo.style.zIndex = 1;
        unMuteLogo.style.transistion = "all 0.1s ease";
        unMuteLogo.style.opacity = 0.3;
        unMuteLogo.style.zIndex = 2;
        muteStatus = false;
    } else {
        players[currentSection].mute();
        unMuteLogo.style.opacity = 0;
        muteLogo.style.opacity = 1;
        unMuteLogo.style.zIndex = 1;
        muteLogo.style.zIndex = 2;
        muteStatus = true;
    };

}

function checkmute(){
    if (currentSection <= players.length - 1){
        if (muteStatus){
            setTimeout(function(){
                muteLogo.style.opacity="1";
                muteLogo.style.left = '85vw';
                unMuteLogo.style.left = '85vw';
                unMuteText.style.opacity = '0';
            }, 2000);

            unMuteText.style.opacity='1';
            unMuteLogo.style.left = '50vw';
            muteLogo.style.left = '50vw';
                
            unMuteLogo.style.fill = "red";
            muteLogo.style.fill = "red";
            
            if (!document.hidden){
                document.getElementById('audiofile').play();
            }    
        }
    }
}
