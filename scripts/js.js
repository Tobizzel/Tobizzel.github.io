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
        for (let i = 0; i < ytvideolist.length; i++) {
            divname = "div"+ i;
            newDiv = document.createElement("video");
            newDiv.setAttribute("id", divname);
            newDiv.setAttribute("class", "section")
            beforeDiv = document.getElementById("NicesVideoDiv");
            document.body.insertBefore(newDiv, beforeDiv)

            player = new YT.Player (divname, {
                videoId: ytvideolist[i],
                height: ytheight,
                width: ytwidth,
                playerVars: ytsettings,
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

    
        resolve("Variables declared!");
    });
    

}

async function startWebsite(){
    return new Promise(function(resolve) {
        //Always Scroll to Top on Reaload
            document.querySelectorAll("iframe")[0].scrollIntoView();

        // Positionierung der UI Elemente
            var element = document.getElementById('mutelogo');
            var element2 = document.getElementById('demutelogo');
            var element3 = document.getElementById('dubbed');
            element.style.opacity="1";
            element.style.transition='all 2s ease';
            element.style.left = '85vw';
            element2.style.transition='all 2s ease';
            element2.style.left = '85vw';
            element3.style.transition='opacity 6s ease, left 2s ease';
            element3.style.left = '20vw';
            element3.style.opacity = "0";
        
        //EventListner initalisieren
            document.addEventListener('wheel', handleScroll);
            document.addEventListener('mousemove', resetHideTimer)
            resetHideTimer();

        resolve("Website ist komplett startklar!");

    });
}

function resetHideTimer() {
    clearTimeout(hideTimeout);
    changeclasses(1,1);
    contentWrapperElement.classList.remove("hidden");
    ytLinkElement.classList.remove("hidden");
    hideTimeout = setTimeout(hideNavigationElements, 4000);
}

function hideNavigationElements(){
    changeclasses(0.5, 3);
    contentWrapperElement.classList.add("hidden");
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
        
        //setTimeout(() => {
          //  isScrolling = false;
        //}, 1500); // Adjust this timeout as needed
    }


    function differentchecks(){

        if (previousSection <= players.length - 1){
            players[previousSection].pauseVideo();
        }

        if (currentSection <= players.length - 1){
            players[currentSection].playVideo();
        }
    }

