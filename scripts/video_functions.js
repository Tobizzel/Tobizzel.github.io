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
    };
}