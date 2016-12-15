var locations = [
{
	title: 'Malampuzha Dam',
	location: {lat: 10.830503, lng: 76.68375}
},
{
	title: 'Neliyampathy',
	location: {lat: 10.535393, lng: 76.693607}
},
{
	title: 'Palakkad Fort', 
	location: {lat: 10.763928, lng: 76.656778}
},
{
	title: 'Silent Valley', 
	location: {lat: 11.068419, lng: 76.519388}
},
{
	title: 'Kalpathy', 
	location: {lat: 10.791581, lng: 76.651379}
},
{
	title: 'Kava', 
	location: {lat: 10.823757, lng: 76.724994}
}]

var largeInfowindow;
var bounds;
var map;
var markers = [];

// TODO: Complete the following function to initialize the map
function initMap() {
    // TODO: use a constructor to create a new map JS object. You can use the coordinates
    // we used, 40.7413549, -73.99802439999996 or your own!
    bounds = new google.maps.LatLngBounds();
    largeInfowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'),{
	    center: {lat: 10.763928, lng: 76.656778},
        zoom: 10
    });

    for (var i = 0; i < locations.length; i++) {
    	
         var position = locations[i].location;
         var title = locations[i].title;
         var marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
         });
         markers.push(marker);
         bounds.extend(marker.position);
         marker.addListener('click', function() {
          populateInfoWindow(this, largeInfowindow);
         });
       }
       map.fitBounds(bounds);
}

function populateInfoWindow(marker, infowindow) {
	
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function(){
          infowindow.setMarker = null;
        });
    }
}

function searchfunction() {

    var search, filter, ul, li, a, i;
    search = document.getElementById("search-text");
    filter = search.value.toUpperCase();
    ul = document.getElementById("list-items");
    li = ul.getElementsByTagName("li");
    for ( i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


var Locations = function(data) {
	
	this.nameTitle = ko.observable(data.name);
	this.position = ko.observable(data.location);
	this.locations = ko.observableArray(data.locations);
}

var ViewModel = function() {

	var self = this; 
	this.locationsList = ko.observableArray([]);
	locations.forEach(function(location){
		self.locationsList.push( new Location(location) );
	});
	
}

ko.applyBindings(new ViewModel());
