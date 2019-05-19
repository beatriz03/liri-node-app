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

axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&apikey=trilogy", { 
params: {movieName: "Mr. Nobody"}
})
  .then(function(response) {

    var jsonData = response.data
    var showData = [

    console.log("Title: " + jsonData.Title),
    "Title: " + jsonData.Title,
    console.log("Year: " + jsonData.Year),
    "Year: " + jsonData.Year,
    console.log("IMDB Rating: " + jsonData.imdbRating),
    "IMDB Rating: " + jsonData.imdbRating,
    console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value),
    "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
    console.log("Country Produced In: " + jsonData.Country),
    "Country Produced In: " + jsonData.Country,
    console.log("Language: " + jsonData.Language),
    "Language: " + jsonData.Language,
    console.log("Plot: " + jsonData.Plot),
    "Plot: " + jsonData.Plot,
    console.log("Actors: " + jsonData.Actors),
    "Actors: " + jsonData.Actors,
    ].join("\n")
fs.appendFile("log.txt", showData, function(error) {
    if (error) {
        console.log(showData);
      }
  });
})

};




//Concert-this command
var artistName = process.argv[3];
var artistSearchURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
console.log(artistSearchURL);

var bandsSearch = function(){

axios.get(artistSearchURL)
  .then(function(response) {

    var artistData = [
    console.log("\n"),
    console.log("Venue Name: " + JSON.stringify(response.data[0].venue.name)),
    "Venue Name: " + JSON.stringify(response.data[0].venue.name),
    console.log("Venue Location: " + JSON.stringify(response.data[0].venue.city)),
    "Venue Location: " + JSON.stringify(response.data[0].venue.city),
    console.log("Event Date: " + moment.utc(response.data[0].datetime).format("MM/DD/YYYY")),
    "Event Date: " + moment.utc(response.data[0].datetime).format("MM/DD/YYYY")
    ].join("\n")
    fs.appendFile("log.txt", artistData, function(error) {
        if (error) {
            console.log(artistData);
          }
      });
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
  var songData =[
    console.log("\n"),
    console.log("Artist Name: " + songs[0].artists.map(getSongName)),
    "Artist Name: " + songs[0].artists.map(getSongName),
    console.log("Song Name: " + songs[0].name),
    "Song Name: " + songs[0].name,
    console.log("Preview Link: " + songs[0].preview_url),
    "Preview Link: " + songs[0].preview_url,
    console.log("Album Name: " + songs[0].album.name),
    "Album Name: " + songs[0].album.name
    ].join("\n")
    fs.appendFile("log.txt", songData, function(error) {
        if (error) {
            console.log(songData);
          }
      });
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




 




