require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//OMDB command
var movieName = process.argv[3];
var movieSearchURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&apikey=trilogy";
    console.log(movieSearchURL);

var movieThis = function(movieName) {

axios.get(movieSearchURL)
  .then(function(response) {
      console.log(response);
    console.log("Rating: " + response.data.imdbRating);
    console.log("Country Produced In: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  })
}


//BandsInTown command
var artistName = process.argv[3];
var artistSearchURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
console.log(artistSearchURL);

var bandsSearch = function(){

axios.get(artistSearchURL)
  .then(function(response) {
      console.log(response);
    console.log("Venue Name: " + response.data.venue.name);
    console.log("Venue Location: " + response.venue.city);
    console.log("Event Date: " + response.datetime);
  })
}



//Spotify command
var getArtistName = function(artist) {
    return artist.name;
}

var getSpotify = function(songName) {

spotify.search({ type: 'track', query: songName}, 
function(err, data) {
  if (err) {
    return console.log('The Sign: Base of Ace ' + err);
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


 




