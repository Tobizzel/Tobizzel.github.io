$(document).ready(function(){
	$('#fullpage').fullpage({
		//sectionsColor: ['#000000','#161616','#000000','#161616','#000000','#161616']


        //hier kann die Geschwindigkeit des Scrollens angepasst werden, aber aufgepasst ändert auch die Geschwindigkeit des Scrollen ohne Link
        scrollingSpeed: 800,  // Je niedriger die Zahl, desto schneller wird gescrollt. 800 ist aber eigentlich ein guter Wert!

		onLeave: function(origin, destination, direction) {
                    var leavingSection = this;

                    if (origin.index == 0) {
                        document.getElementById("nav").style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                    }

                    else if (origin.index >= 1 && destination.index == 0 ){
                        document.getElementById("nav").style.backgroundColor = "";
                    }
        },

    });
});
