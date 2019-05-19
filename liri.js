var fs = require("fs");
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

//Movie-this command
var movieName = process.argv[3];
var movieSearchURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&apikey=trilogy";
    console.log(movieSearchURL);

var movieThis = function(movieName) {

axios.get(movieSearchURL)
  .then(function(response) {
    console.log("\n")
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country Produced In: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);

})
.catch(function(error) {
  console.log(error, !movieName);
  console.log("\n")
  console.log("Title: Mr.Nobody");
  console.log("Year: 2009");
  console.log("IMDB Rating: 7.8");
  console.log("Rotten Tomatoes Rating: 67%");
  console.log("Country Produced In: Belgium, Germany, Canada, France, USA, UK");
  console.log("Language: English, Mohawk");
  console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
  console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");

  })
  
};




//Concert-this command
var artistName = process.argv[3];
var artistSearchURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
console.log(artistSearchURL);

var bandsSearch = function(){

axios.get(artistSearchURL)
  .then(function(response) {
    console.log("\n")
    console.log("Venue Name: " + JSON.stringify(response.data[0].venue.name));
    console.log("Venue Location: " + JSON.stringify(response.data[0].venue.city));
    console.log("Event Date: " + moment.utc(response.data[0].datetime).format("MM/DD/YYYY"));

  })
  .catch(function(error) {
    console.log(error);
    })
};



//Spotify-this-song command
var getSongName = function(song) {
    return song.name;
}

var getSpotify = function(songName) {

spotify.search({ type: 'track', query: songName}, 
function(error, data) {
  if (error) {
    return console.log(error);
  }

  var songs = data.tracks.items;
    console.log("\n")
    console.log("Artist Name: " + songs[0].artists.map(getSongName)); 
    console.log("Song Name: " + songs[0].name); 
    console.log("Preview Link: " + songs[0].preview_url);
    console.log("Album Name: " + songs[0].album.name);
})
};


//Do-what-it-says command
var doWhatItSays = function() {
fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) throw error;
    
    var randomFile = data.split(",");

    if (randomFile.length == 2) {
        commands(randomFile[0], randomFile[1]);
    } else if (randomFile == 1){
        commands(randomFile[0]);
    }
});
}



var commands = function(caseData, functionData) {
    switch(caseData) {
              case "movie-this" :
              movieThis(functionData);
              break;

              case "spotify-this-song" :
              getSpotify(functionData);
              break;

              case "concert-this" :
              bandsSearch(functionData);
              break;

              case "do-what-it-says" :
              doWhatItSays();
              break;

        default: 
        console.log("LIRI does not know that");
    }
};

var runThis = function (arg1, arg2){
    commands(arg1, arg2);
};

runThis(process.argv[2], process.argv.slice(3).join(" ")); // .slice in case the user's search has multiple words




 




