var lastScroll = 0;
var currentplayer = 0;
var players = [];
var mutestatus = 1;
var ticking = false;
var target = 0;
var maxScroll = 0 - window.innerHeight; //= 0.5 * window.innerHeight;

var ytsettings = {
        'disablekb': 1,
        'controls': 0,
        'showinfo': 0,
        'loop': 1,
        'fs': 0,
        'mute': 1,
        'cc_load_policy': 1,
        'cc_lang_pref': 'en',
        'hl': 'de',
    };

var ytheight = window.innerHeight;
var ytwidth = window.innerWidth;
var scrollTimeout = false;

//var muteRememberTimeout = setTimeout(checkmute, 5000);
