var draw = function(tweetArray){
  var allTweets = $("#all-tweets");
  allTweets.html("");

  
  for(var i = tweetArray.length - 1; i >= tweetArray.length - 6 && tweetArray[i] !== undefined; i-- ){
  	var tweet = tweetArray[i];
    console.log(tweet);
    
    // Seeting style for each user and their tweet
		var userStyle = {
			douglascalhoun: "doug",
			sharksforcheap: "tony",
			shawndrost: "shawn",
			mracus: "marcus",
			you: "you"
		};

		var userClass = userStyle[tweet.user];

		// Figuring out the time
		var timeNow = new Date ();
		var timeElapsed = timeNow.getTime() - tweet.created_at.getTime();
		var tweetTime;

		if (timeElapsed >= 86400000) {
			tweetTime = tweet.created_at.getTime();
		} else if (timeElapsed >= 3600000) {
			tweetTime = Math.floor(timeElapsed/3600000);
			tweetTime = tweetTime.toString() + " hours ago";
		} else {
			tweetTime = Math.floor(timeElapsed/1000);
			tweetTime = tweetTime.toString() + " minutes ago";
		}
			
		// Rendering the tweets into HTML
		var $tweetStrings = $('<p></p>');
		var singleTweetString = '<span class="tweeter ' 
			+ userClass 
			+ '" user-id="' 
			+ tweet.user 
			+ '">'
			+ tweet.user 
			+ '</span>: <span class="tweet' 
    	+ userClass 
    	+ '">' 
    	+ tweet.message 
    	+ '</span></br><span class="time">'
    	+ tweetTime
    	+ '</span>';

    $tweetStrings.append(singleTweetString);
    
    allTweets.append($tweetStrings);

    function filterEachHandler() {
    	var tweeterId = $(this).attr("user-id");
			var filteredArray = _(window.streams.home).filter(function(tweet) {return tweet.user === tweeterId;});
			draw(filteredArray);
    }
		allTweets.each(function() {
			var link = $(".tweeter");
    	link.on("click", filterEachHandler);
		});
  }
}

$(document).ready(function() {

	var newTweets = $("#newTweets");
	newTweets.click(function() {
		draw(window.streams.home);
	});

	$("#showAllTweets").on("click", function() {
		draw(window.streams.home);
	});

	$("#submittedTweet").on("click", function(event) {
		event.preventDefault();
		var $message = $("textarea").val();
		var tweetArray = window.streams.home.slice(window.streams.home.length - 5, window.streams.home.length - 1);
		tweetArray.push({
			created_at: new Date(),
			message: $message,
			user: "you"
		});
		draw(tweetArray);
	}); 

	setTimeout(function() {
		draw(window.streams.home);
	}, 2000);
	setInterval(function() {
		draw(window.streams.home);
	}, 10000);
});




