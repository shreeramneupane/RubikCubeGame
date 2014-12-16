//Bruik Game AJAX Document
function ShowBestScore() {
	this.score = function(playerScore) {
		var xmlhttp;
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("scoreResult").innerHTML = xmlhttp.responseText;
			}
		}
		xmlhttp.open("GET", "score.php?score=" + playerScore, true);
		xmlhttp.send();
	}
}