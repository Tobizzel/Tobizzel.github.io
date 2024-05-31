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
        // div.style.display="none";
        div.classList.add("hidden");
    }

    function changeclasses(mult, navmult) {
        for (i=classelements.length -1 , x=-1; i > x; i--){
           // navlist[0].style.width = (80 * mult + 0.5)  + "vw";
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