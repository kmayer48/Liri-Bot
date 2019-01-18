require("dotenv").config();

// API keys
var keys = require("./keys.js");
// axios package
var axios = require("axios");
// moment.js package
var moment = require('moment');
moment().format();
// spotify package
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// fs pacakge to handle read/write text file
var fs = require("fs");

// agrv[2] chooses user actions; agrv[3] is input parameter, i.e; song name
var firstCommand = process.argv[2];
var secondCommand = process.argv[3];

// concatenate multiple words in 2nd user argument for search purposes
for (var i = 4; i < process.argv.length; i++) {
    secondCommand += ' ' + process.argv[i];
}

// switch statement to determine which funtion to run based on user input (first command)
switch (firstCommand) {
    case "concert-this":
        concertThis(secondCommand);
        break;
    case "spotify-this-song":
        spotifyThis(secondCommand);
        break;
    case "movie-this":
        movieThis(secondCommand);
        break;
    case "do-what-it-says":
        doIt();
        break;
    default:
    console.log("Please input one of the recognized commands!");
    break;
};

// bands in town API which returns the name of the venue, venue location, and date of the event
function concertThis(secondCommand) {
    axios.get("https://rest.bandsintown.com/artists/" + secondCommand + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {
            // saves datetime response into a variable converted using moment.js
            var dateTime = moment(response.data[i].datetime).format("MM-DD-YYYY");
            var concertResults = 
                "\n--------------------Concert Results--------------------" +
                // concert lineup
                "\nLineup: " + response.data[i].lineup + 
                // vanue name
                "\nVenue Name: " + response.data[i].venue.name + 
                // vanue city
                "\nVenue Location: " + response.data[i].venue.city +
                // vanue date of the event converted using moment.js
                "\nDate of the Event: " + dateTime +
                "\n-------------------------------------------------------\n";

            console.log(concertResults);

        // writes results to log.txt
        fs.appendFile("log.txt", concertResults, function(err) {
            // If an error was experienced it will log to the console
            if (err) {
                console.log(err);
            }    
        });
        }
        console.log("\n-------------------------------------------------------\n" +
        "Your concert results were in logged a text file!" +
        "\n-------------------------------------------------------\n");
    })
    // error response
    .catch(function (error) {
        console.log(error.response);
    });
    
}

// Spotify API call which returns the artist, song's name, preview link, and the album in which the song belongs to
function spotifyThis(secondCommand) {
    if(secondCommand === undefined) {
        secondCommand = "The Sign";
    }
    spotify.search({ type: 'track', query: secondCommand })
    .then(function(response) {
        for (var i = 0; i < 10; i++) {
            var spotifyResults = 
                "\n--------------------Spotify Results--------------------" +
                // artist
                "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                // song name
                "\nSong Name: " + response.tracks.items[i].name +
                // preview link
                "\nPreview Link: " + response.tracks.items[i].preview_url +
                // album name
                "\nAlbum Name: " + response.tracks.items[i].album.name +
                "\n-------------------------------------------------------\n";
                    
            console.log(spotifyResults);

        // writes results to log.txt
        fs.appendFile("log.txt", spotifyResults, function(err) {
            // If an error was experienced it will log to the console
            if (err) {
                console.log(err);
            }    
            });
        }
        console.log("\n-------------------------------------------------------\n" +
            "Your song results were in logged the text file!" +
            "\n-------------------------------------------------------\n");
    })
    // error response
    .catch(function(error) {
        console.log(error.response);
    });
}

function movieThis(secondCommand) {
    if(secondCommand === undefined){
        secondCommand = "mr nobody";
        console.log("\n----------------------------------------" + 
        "\nIf you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +
        "\nIt's on Netflix!")        
    } 
    axios.get("https://www.omdbapi.com/?t=" + secondCommand + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "\n--------------------Movie Results----------------------" +
                // movie title
                "\nMovie Title: " + response.data.Title + 
                // release year
                "\nYear of Release: " + response.data.Year +
                // IMDB rating
                "\nIMDB Rating: " + response.data.imdbRating +
                // country produced
                "\nCountry Produced: " + response.data.Country +
                // movie language
                "\nLanguage: " + response.data.Language +
                // movie plot
                "\nPlot: " + response.data.Plot +
                // movie cast
                "\nMovie Cast: " + response.data.Actors +
                "\n-------------------------------------------------------\n";

            console.log(movieResults);

        // writes results to log.txt
        fs.appendFile("log.txt", movieResults, function(err) {
            // If an error was experienced it will log to the console
            if (err) {
                console.log(err);
            }    
            });
        console.log("\n-------------------------------------------------------\n" +
                "Your movie results were in logged the text file!" +
                "\n-------------------------------------------------------\n");
    })
    // error response
    .catch(function (error) {
        console.log(error.response);
    });
}

function doIt(){
    // reads random.txt file
    fs.readFile('random.txt', "utf8", function(error, data){
    // splits text in file by a comma delimter 
      var txt = data.split(',');
    // returns value from text[1] and performs function
      spotifyThis(txt[1]);
    });
}
