var muteRememberTimeout = setTimeout(checkmute, 15000); //check every 15 seconds

function onYouTubeIframeAPIReady(){
    for (let i = 0; i < ytvideolist.length; i++) {

        divname = "div"+ i;
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", divname);
        imp = document.getElementById("Impressum");
        document.body.insertBefore(newDiv, imp)

        player = new YT.Player (divname, {
            videoId: ytvideolist[i],
            height: ytheight,
            width: ytwidth,
            playerVars: ytsettings,
            events: {
            'onReady': onPlayerReady,
            }
        });

        players.push(player);

        maxScroll = maxScroll + window.innerHeight;

    }
}

function onPlayerReady(event){
    myfunction();
    players[0].playVideo();
    currentytlink = "https://www.youtube.com/watch?v=" + ytvideolist[0];
    document.getElementById("ytlink").href = currentytlink;
    
}

function mutebutton(){
    if (mutestatus == 1){
        players[currentplayer].unMute();
        document.getElementById("mutelogo").style.transistion = "all 0.1s ease";
        document.getElementById("mutelogo").style.opacity = 0;
        document.getElementById("mutelogo").style.zIndex = 1;
        document.getElementById("demutelogo").style.transistion = "all 0.1s ease";
        document.getElementById("demutelogo").style.opacity = 1;
        document.getElementById("demutelogo").style.zIndex = 2;
        mutestatus = 0;
    } else {
        players[currentplayer].mute();
        document.getElementById("demutelogo").style.opacity = 0;
        document.getElementById("mutelogo").style.opacity = 1;
        document.getElementById("demutelogo").style.zIndex = 1;
        document.getElementById("mutelogo").style.zIndex = 2;
        mutestatus = 1;
        clearTimeout(muteRememberTimeout)
        muteRememberTimeout = setTimeout(checkmute, 15000); //check every 15 seconds
    };
}

function checkmute(){
    if (mutestatus == 1){
        console.log("REMEMBER TO UNMUTE");
        var element = document.getElementById('mutelogo');
        var element2 = document.getElementById('demutelogo');
        element.style.transition='all 2s ease';
        element2.style.transition='all 2s ease';

        element2.style.left = '50vw';
        element.style.left = '50vw';
        element.style.fill = "red";
        element2.style.fill = "red";
    

        document.getElementById('audiofile').play();

        setTimeout(myfunction,2000);
    }

    muteRememberTimeout = setTimeout(checkmute, 15000);//check every 15 seconds
}