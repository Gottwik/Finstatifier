window.onload = function(){

	// Doesnt replace icos at finstat except the contact seciotn	
	if(window.location.href.indexOf('finstat.sk') == -1 || window.location.href.indexOf('http://finstat.sk/Kontakt') != -1){

		// Sumchecks the ico for validity
		function isValidICO(ico){
			var t = 0;
			var i = 8;
			ico.split('').forEach(function(digit){
				if(i > 1){
					t += digit * i;
				}
				i--;
			});
			t = t % 11;
			c = ico[ico.length-1];
			if(t == 0 && c == 1){
				return true;
			}
			if(t == 1 && c == 0){
				return true;
			}
			if(t > 1 && c == 11-t){
				return true;
			}
			return false;
		}

		var innertext = document.getElementsByTagName("body")[0].innerText;
		var inner = document.getElementsByTagName("body")[0].innerHTML;
		var match;

		// Finds all 8 digit numbers on the page and saves it to matches
		icoregex = /[^0-9]((?:\d[ ]*){7}\d)[^0-9][^( \d)]/g;
		var matches = [];
		while (match = icoregex.exec(innertext)) {
			if(matches.indexOf(match[1]) == -1){
				matches.push(match[1]);
			}
		}

		// Iterates matches and replaces it with hyperlink to finstat
		matches.forEach(function(m){
			var trimmed = m.replace(/\s/g, "");
			if(isValidICO(trimmed)){
				inner = inner.replace(m, "<a href=\"http://finstat.sk/Hladaj?query="+trimmed+"\">"+m+"</a>");
			}
		});

		// If changes occured we replace the new html
		if(document.getElementsByTagName("body")[0].innerHTML != inner){
			document.getElementsByTagName("body")[0].innerHTML = inner;
		}
	}
}