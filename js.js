function myfunction(){
    var element = document.getElementById('Mute');
    element.style.transition='all 2s ease';
    element.style.left = '85vw';
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
