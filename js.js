/* console.log("Noice");

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 */
var player;
function onYoutubeIframeAPIReady(){
    player = new YT.Player('player', {
        height: 360,
        width: 640,
        videoId: 'dQw4w9WgXcQ',
        /* playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 0,
            loop: 1,
            fs: 0,
            autohide: 0
        }, */
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event){
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event){
    if (event.data == YT.PlayerState.PLAYING && !done){
        setTimeout(stopVideo, 6000);
        done=true;
    }
}

function stopVideo(){
    player.stopVideo()
}