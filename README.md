## Neighborhood Map project


#### Objective

You will develop a single-page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add additional functionality to this application, including: map markers to identify popular locations or places you’d like to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. You will then research and implement third-party APIs that provide additional information about each of these locations (such as StreetView images, Wikipedia articles, Yelp reviews, etc).

#### Implementation Process:

After referring through all the reference links, the implementation was started, and these were the steps that were followed:
##### app.js :
1. The procedure of including google maps api was conducted atfirst. A variable called locations was initialised in which the datas of various locations were stored. The function initMap() was used for initialising the map. Markers were added to multiple locations, and using populateInfoWindow() infowindow was declared for the appropriate marker locations.
2. Next, a third-party api (wikipedia api) was added to the infowindow as a link, which gives adequate info about the respective locations, and error handling functions were added for the wiki-link as well as for the map incase if the user encounters any component failure.  
3. The view model was constructed by using ko observables and ko observablearrays using knockout. The filtering of the locations as well as the markers on the map were done here. The function involving opening the infowindow when a location in the list is clicked was implemented inside the openInfo function.

##### index.html:
1. The required stylesheets, js files as well as the map were imported, and the structural design required for the project was implemented.
2. The model, view model in the app.js file was synced with the view by using the data binding method in index.html file.

##### responsive.css:
This stylesheet is for styling the web page in mobile devices having max-width equal or less than 500px.

##### style.css:
Involves the main stylesheet required for styling the webpage.

The images folder consists of the images that have been used in the webpage 
In addition to these files two library files such as knockout.js and jquery.min.js were also added for the implementation of project.
