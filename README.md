# Liri-Bot

## LIRI is similar to iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

# Prerequisites

    * Terminal or Gitbash
    * Node.js & NPM (Node Plugin Manager)
    * Clone down repo

##### Enter `npm install` in either Terminal or Gitbash to install neccessary packages to run this application.

# Available Commands
### On your command line enter one of the following commands:

# Concert This

    `node liri.js concert-this` <band name goes here>

## This will display results from the Bands in Town API. The response is set to return:

    1. The lineup of the event
    2. The venue name
    3. The venute location
    4. The date of the event converted with moment.js

![](https://github.com/kmayer48/liri-bot/blob/master/gifs/concert-this.gif)
    
# Spotify This Song

    `node liri.js spotify-this-song` <song name goes here>

## This will display results from the Spotify API. The response is set to return:

    1. Artist name(s)
    2. Song name
    3. Preview link
        - note that not all songs have an available 30 second preview link if you receive null as a response
    4. Album name

##### If no response is entered the default search paramter is "The Sign" by Ace of Base

![](https://github.com/kmayer48/liri-bot/blob/master/gifs/spotify-this.gif)

# Movie This

    `node liri.js movie-this` <movie name goes here>

## This will display results from the OMBD API. The response is set to return:

    1. Movie title
    2. Year of release
    3. IMDB Rating
    4. Rotten tomatoes rating
    5. Country produced
    6. Language
    7. Plot
    8. Movie Cast

##### If no response is entered the default search paramter is "Mr. Nobody"

![](https://github.com/kmayer48/liri-bot/blob/master/gifs/movie-this.gif)

# Do What It Says

    `node liri.js do-what-it-says`

## This reads the random.txt file that is available in the repo. It's defualt search parameters are to "Spotify This" with the search paramter of "I want it that way". The text file can be alterted to one of the above commands before the first comma, followed by your search parameter. 

## All search results will be dynamically logged and updated in a log.txt file that the application will create. Each search will amend new results to this file.

![](https://github.com/kmayer48/liri-bot/blob/master/gifs/txt-file.gif)

# Authors

### Kenny Mayer