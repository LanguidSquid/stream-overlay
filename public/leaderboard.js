var leaderboard = (function () {

	var timer;
	
	var updateLeaderboard = function() {
		console.log('in updateLeaderboard');
		let location = window.location.href;
		console.log('location - ' + location.split('?')[1].split('=')[1]);
		// let params = new URLSearchParams(location.search);
		let streamName = location.split('?')[1].split('=')[1];

		console.log(streamName);

		$.ajax({
			url: "http://api.vivbot.com/users/?channel=" + streamName + "&sort=rankPlace",
			type: "GET",
			success: function(result){
				var garbagePlaceholder = 0;
				$('#leaderboard-body')[0].innerHTML = "";
				var jsonResultObject = JSON.parse(result)
				jsonResultObject.data.forEach(function(element) {
					var tr = "<tr><td>" + element.rankPlace + 
						"</td><td>" + element.name + 
						"</td><td>" + element.coinBalance + "</td></tr>";
					$('#leaderboard-body')[0].innerHTML = $('#leaderboard-body')[0].innerHTML + tr;
				});
			}
		});
	}

	var start = function() {
		timer = setInterval(updateLeaderboard, 30000);
		updateLeaderboard();
	}	

	var injectResults = function(result) {
		console.log(result);
	}

	return {
		start: start
	}		
})();

leaderboard.start();