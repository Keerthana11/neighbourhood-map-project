// Atfirst, storing the values for different places under the variable locations
var locations = [{
        title: 'Malampuzha Dam',
        address: 'Malampuzha Dam, Malampuzha-I, Kerala 678651',
        location: {
            lat: 10.830503,
            lng: 76.68375
        },
        image: "image/md.jpg",
        id: "location0"
    },
    {
        title: 'Nelliyampathy',
        address: 'Nelliyampathy, Kerala 678508',
        location: {
            lat: 10.535393,
            lng: 76.693607
        },
        image: "image/np.jpg",
        id: "location1"
    },
    {
        title: 'Palakkad Fort',
        address: 'Kunathurmedu, Palakkad, Kerala 678001',
        location: {
            lat: 10.763928,
            lng: 76.656778
        },
        image: "image/pf.jpg",
        id: "location2"
    },
    {
        title: 'Silent Valley National Park',
        address: 'Silent Valley Division, Mannarkkad, Karuvara, Kerala 678582',
        location: {
            lat: 11.068419,
            lng: 76.519388
        },
        image: "image/sv.png",
        id: "location3"
    },
    {
        title: 'Kalpathi',
        address: 'Kalpathi, Palakkad, Kerala 678003',
        location: {
            lat: 10.791581,
            lng: 76.651379
        },
        image: "image/kr.jpg",
        id: "location4"
    },
    {
        title: 'Parambikulam Wildlife Sanctuary',
        address: 'Thunakadavu, Pollachi, Chittu, Kerala 678661',
        location: {
            lat: 10.3929,
            lng: 76.7756
        },
        image: "image/pw.jpg",
        id: "location5"
    }
];

// Initialising the required variables
var largeInfowindow;
var bounds;
var map;
var markers = [];
var marker;

// Function that involves in initializing the map
function initMap() {
    // Creating map, infowindow and bounds objects
    bounds = new google.maps.LatLngBounds();
    largeInfowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        // Setting latitude,longitude values allow the map to load at the particular region in default
        center: {
            lat: 10.763928,
            lng: 76.656778
        },
        zoom: 10
    });

    //Assigning markers to multiple locations along with their infowindows
    for (var i = 0; i < locations.length; i++) {

        var position = locations[i].location;
        var title = locations[i].title;
        var address = locations[i].address;
        var image = locations[i].image;
        marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            image: image,
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

//Function that initialises as well as helps in including datas within an infowindow
function populateInfoWindow(marker, infowindow) {

    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div><b>' + marker.title + '</b><br>' + marker.address + '</div><br>' + '<img src="' + marker.image + '" alt="Image of ' +
            marker.title + '"><br>' + '<div>For more info click the link below - <div id="wikipedia-links"></div>');
        marker.setAnimation(google.maps.Animation.BOUNCE); // Animates the marker
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker = null;
            marker.setAnimation(null);
        });

    }

    // The 3rd party API (wikipedia) link in the infowindow is initialised here by using ajax request along with error handling method
    var wikiurl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
    var $wikiElem = $('#wikipedia-links');
    $.ajax({
        url: wikiurl,
        dataType: "jsonp",
        success: function(response) {
            var articleList = response[0];
            console.log(articleList);
            var url = 'http://en.wikipedia.org/wiki/' + articleList;
            console.log(url);
            $wikiElem.append('<a href="' + url + '">' + articleList + '</a>');
        }
    });

    var wikiTimeout = setTimeout(function() {
        $.wikiElem.text("Failed to load the wiki-link!");
        var alertbox = localStorage.getItem('alertbox') || '';
        if (alertbox != 'yes') {
            alert("Unable to connect at the moment!");
        }
    }, 8000);

    $.ajax({
        url: wikiurl,
        dataType: "jsonp",
        success: function(response) {
            var articleList = response[1];
            var wlink = $("#wiki-link");
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                wlink.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            }
            clearTimeout(wikiTimeout);
        }
    });

}

// This function alerts the user at times when the map fails to load

var mapfail = function() {
    var maptimeout = setTimeout(function() {
        alert("Unable to load Google Maps!");
    }, 5000);
};

// This function initialises the required datas using knockout method 
var Locations = function(data) {

    this.nameTitle = data.title;
    this.locationId = ko.observable(data.id);
    this.divId = ko.computed(function() {
        var div = "div" + this.locationId();
        return div;
    }, this);
};

//The viewmodel of knockout is defined here
var ViewModel = function() {

    var self = this;
    var x;
    this.locationsList = ko.observableArray([]);
    locations.forEach(function(locationitem) {
        self.locationsList.push(new Locations(locationitem));
    });

    this.query = ko.observable();
    // Filters the locations of the list along with the markers
    this.filteredList = ko.computed(function() {
        var filter = self.query();
        console.log("------");

        if (!filter) {

            for (var i = 0; i < markers.length; i++) {
                markers[i].setVisible(true);
            }
            return locations;

        } else {
            // item indicates the location object, whereas i indicates the index used for the marker
            return ko.utils.arrayFilter(locations, function(item, i) {
                var found = item.title.toLowerCase().indexOf(filter) >= 0;
                console.log(item.title, filter, found);
                markers[i].setVisible(found, true);
                return found;
            });
        }
    });

    //Enables opening of infowindow when any location inside the list is clicked
    this.openInfo = function(thisList) {
        this.locationId = ko.observable(thisList.id);
        var thisId = this.locationId();
        var newId = thisId.slice(-1);
        populateInfoWindow(markers[newId], largeInfowindow);
    };

};

ko.applyBindings(new ViewModel());