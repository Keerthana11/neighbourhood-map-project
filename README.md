## Neighborhood Map project

#### Instructions:

The instructions for running the map are given below :
1. Open the *index.html* file to run the web page.
2. By default, a list of locations would appear on the left of the window whereas the map on the right shows markers marked at those specific locations. For mobile users, the list items would be shown only in landscape mode due to varying potrait device widths.
3. Clicking the markers as well as the list locations will open an infowindow on that location consisting of location name, address, an image and a wikipedia link for more information.  
4. The search bar on the left will help in filtering out the locations in the list as well as the markers on the map when a location name is entered, so as to identify the locations easily. 

#### Implementation Process:

After referring through all the reference links, the implementation was started, and these were the steps that were followed under each file:
##### app.js :
1. The procedure of including google maps api was conducted atfirst. A variable called locations was initialised in which the datas of various locations were stored. The function *initMap()* was used for initialising the map. Markers were added to multiple locations, and using *populateInfoWindow()* infowindow was declared for the appropriate marker locations.
2. Next, a third-party api (wikipedia api) was added to the infowindow as a link, which gives adequate info about the respective locations, and error handling functions were added for the wiki-link as well as for the map incase if the user encounters any component failure.  
3. The view model was constructed by using ko observables and ko observablearrays using knockout. The filtering of the locations as well as the markers on the map were done here. The function involving opening the infowindow when a location in the list is clicked was implemented inside the openInfo function.

##### index.html:
1. The required stylesheets, js files as well as the map were imported, and the structural design required for the project was implemented.
2. The model, view model in the app.js file was synced with the view by using the data binding method in index.html file.

##### responsive.css:
This stylesheet is for styling the web page in mobile devices having max-width equal or less than 500px.

##### style.css:
It involves the main stylesheet required for styling the webpage.

The images folder consists of the images that have been used in the webpage 
In addition to these files two library files such as knockout.js and jquery.min.js were also added for the implementation of project.
