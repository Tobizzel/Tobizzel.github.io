var timer = setInterval(myTimer, 800);
var navlinks = document.getElementsByClassName("navlink");

function myTimer() {
	var aktuellePosition = window.location.href;
	var aktiverLink = document.getElementsByClassName("activelink")
	if (aktiverLink[0] == null){
		if (aktuellePosition.includes("#work") || aktuellePosition.includes("#project2") || aktuellePosition.includes("#project3")){
			navlinks[0].classList.add("activelink");
		}

		else if (aktuellePosition.includes("#about")) {
			navlinks[1].classList.add("activelink");
		}

		else if (aktuellePosition.includes("#contact")) {
			navlinks[2].classList.add("activelink");
		}
	}

	else {
		aktiverLink[0].classList.remove("activelink");

		if (aktuellePosition.includes("#work") || aktuellePosition.includes("#project2") || aktuellePosition.includes("#project3")){
			navlinks[0].classList.add("activelink");
		}

		else if (aktuellePosition.includes("#about")) {
			navlinks[1].classList.add("activelink");
		}

		else if (aktuellePosition.includes("#contact")) {
			navlinks[2].classList.add("activelink");
		}

	} 
	
}

