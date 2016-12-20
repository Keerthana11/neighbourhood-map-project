var locations = [
{
	title: 'Malampuzha Dam',
	address: 'Malampuzha Dam, Malampuzha-I, Kerala 678651',
	location: {lat: 10.830503, lng: 76.68375},
	id: "location0"
},
{
	title: 'Nelliyampathy',
	address: 'Nelliyampathy, Kerala 678508',
	location: {lat: 10.535393, lng: 76.693607},
	id: "location1"
},
{
	title: 'Palakkad Fort', 
	address: 'Kunathurmedu, Palakkad, Kerala 678001',
	location: {lat: 10.763928, lng: 76.656778},
	id: "location2"
},
{
	title: 'Silent Valley National Park', 
	address: 'Silent Valley Division, Mannarkkad, Karuvara, Kerala 678582',
	location: {lat: 11.068419, lng: 76.519388},
	id: "location3"
},
{
	title: 'Kalpathi',
	address: 'Kalpathi, Palakkad, Kerala 678003', 
	location: {lat: 10.791581, lng: 76.651379},
	id: "location4"
},
{
	title: 'Parambikulam Wildlife Sanctuary', 
	address: 'Thunakadavu, Pollachi, Chittu, Kerala 678661',
	location: {lat: 10.3929, lng: 76.7756},
	id: "location5"
}]

var largeInfowindow;
var bounds;
var map;
var markers = [];
var marker;

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
         var address = locations[i].address;
         marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          address: address,
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
        infowindow.setContent('<div><b>' + marker.title + '</b><br>' + marker.address + '</div><br><div>For more info click the link below - <div id="wikipedia-links"></div>');
        marker.setAnimation(google.maps.Animation.BOUNCE);
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function(){
         infowindow.setMarker = null;
         marker.setAnimation(null);
        });
        
    }


	var wikiurl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
	
	$.ajax({
    	url : wikiurl,
    	dataType :"jsonp",
   		success : function(response){
        	var articleList = response[0];
         	console.log(articleList);
         	var $wikiElem = $('#wikipedia-links');
        	var url = 'http://en.wikipedia.org/wiki/' + articleList;
        	console.log(url);
        	$wikiElem.append('<a href="' + url + '">' + articleList +'</a>');
 		}
	});
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
	
	this.nameTitle = ko.observable(data.title);
	this.locationId = ko.observable(data.id);
    this.divId = ko.computed(function() {
        var div = "div" + this.locationId();
        return div;
    }, this);
	//this.position = ko.observable(data.location);
	//this.places = ko.observableArray([]);
}

var ViewModel = function() {

	var self = this; 
	this.locationsList = ko.observableArray([]);
	locations.forEach(function(locationitem){
		self.locationsList.push( new Locations(locationitem) );
	});
	/*this.filterIndicator = ko.observable("");
    this.filterInfo = ko.observable(false);*/

    this.query = ko.observable('');
    this.search = function(value) {
	// remove all the current locations, which removes them from the view
    self.locationsList.removeAll();

    for(var x in self.locationsList) {
      if(self.locationsList[x].nameTitle.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        self.locationsList.push(self.locationsList[x]);
      }
    }
  };
  this.query.subscribe(this.search);

    this.openInfo = function(thisList) {
        var thisId = this.locationId();
        var newId = thisId.slice(-1);
        populateInfoWindow(markers[newId], largeInfowindow);
    };
	
}


//ViewModel.query.subscribe(ViewModel.search); 	


ko.applyBindings(new ViewModel());