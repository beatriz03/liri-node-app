var fs = require("fs");
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//Movie-this command
var movieName = process.argv[3];
var movieSearchURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&apikey=trilogy";
    console.log(movieSearchURL);

var movieThis = function(movieName) {

axios.get(movieSearchURL)
  .then(function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country Produced In: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  })
}


//Concert-this command
var artistName = process.argv[3];
var artistSearchURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
console.log(artistSearchURL);

var bandsSearch = function(){

axios.get(artistSearchURL)
  .then(function(response) {
    console.log("\n")
    console.log("Venue Name: " + JSON.stringify(response.data[0].venue.name, null, 2));
    console.log("Venue Location: " + JSON.stringify(response.data[0].venue.city, null, 2));
    console.log("Event Date: " + JSON.stringify(response.data[0].datetime, null, 2));
  })
  .catch(function(error) {
    console.log(error);
    })
    
}



//Spotify-this-song command
var getArtistName = function(artist) {
    return artist.name;
}

var getSpotify = function(songName) {

spotify.search({ type: 'track', query: songName}, 
function(err, data) {
  if (err) {
    return console.log('The Sign: Ace of Base ' + err);
  }

  var songs = data.tracks.items;
  for(var i=0; i<songs.length; i++) {
    console.log(i); 
    console.log("Artist Name: " + songs[i].artists.map(getArtistName)); 
    console.log("Song Name: " + songs[i].name); 
    console.log("Preview: " + songs[i].preview_url);
    console.log("Album Name: " + songs[i].album.name);
    console.log("----------------")
  }
});
}


var pick = function(caseData, functionData) {
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

        default: 
        console.log("LIRI does not know that");
    }
}

var runThis = function (arg1, arg2){
    pick(arg1, arg2);
};

runThis(process.argv[2], process.argv[3]);


 




