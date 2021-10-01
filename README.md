
# BrewTown

This App will allow users to track the different breweries they go to and rate the beers they try.  When the user logs in they are taken to a profile page which will display an image of the user, the username, the amount of breweries visited, the beers rated and a tier system (0-19 beers rated = bronze, 20-49 = silver, 49-100 = gold, and 100+ = platinum).  On the user profile there will be a progress bar telling the user how many beers they need to rate to reach the next tier.  The user can click on Brewery List which the user has a choice of selected from a dropdown menu of a list of breweries near them or they can add their own brewery (if the brewery isn't in the dropdown list).  The dropdown list is taken from an api called openbrewerydb and connecting that with the geolocation api.  After selecting or adding a brewery the user is then taken to a form where they will enter in the beer they drank, the type of beer it was that they had, notes/thoughts, and will lastly give the beer a rating from 1-5.  The user is then taken to a ratings table which will display the brewery, beer, type, rating, notes, and date listed by most recent rating at the top.  The user can also delete any of the rows from the table which will update the profile page's breweries visited, beers rated and progress bar.


https://user-images.githubusercontent.com/82717484/135664177-89b8cadf-b7b7-48a4-acc1-c6cb63a004ce.mov




## Built With

Javascript
React
Redux
Node
Express
Passport
PostgreSQL
Material UI
Geolocation Api
Openbrewerydb Api

