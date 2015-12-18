function generateGrid(jsonData) {
    var html = '';
    for (var i = 0; i < jsonData.length; i++) {
      var destination = jsonData[i];
      html += '<section class="hgroup"><div class="container"><h1>';
      html += destination.country;
      html += '</h1><ul class="breadcrumb pull-right"><li><a href="index.html">Home</a> </li><li class="active">Destinations</li></ul></div></section><section><div class="container"><div class="row"><div class="col-sm-8 col-md-8"><div class="full_page_photo"><img src="';
      html += destination.photo_url;
      html += '" height="400" width="650"></div></div><div class="col-sm-4 col-md-4"><article class="portfolio_details"><h2 class="section_header">Trip details</h2><p>';
      html += destination.description;
      html += '</p><br><br><div><p><strong>Star date: </strong>';
      html += destination.start_date;
      html += '</p><p><strong>End date: </strong>';
      html += destination.end_date;
      html += '</p><p><strong>Trip length: </strong>';
      html += destination.trip_length;
      html += '</p><p><strong>Estimated cost: </strong>';
      html += destination.est_cost;
      html += '</p></div><br><br><button class="btn btn-primary center-block btn-lg green-btn">Edit Trip</button> <button id="remove-destination" type="submit" class="btn btn-danger center-block btn-lg">Remove Trip</button></article></div></div></div></section>';
    }
  $('#display-destination').append(html);
}

$(function(){
  var loadDestinationCallback = function(error, data) {
    if(error){
      console.log(error);
    } else {
      console.log(data.destinations);
      generateGrid(data.destinations);

      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    var marker, i;

    for (i = 0; i < data.destinations.length; i++) {
      var myLatLng = new google.maps.LatLng(data.destinations[i].longitude, data.destinations[i].latitude)
      marker = new google.maps.Marker({
        position: myLatLng,
        map: map
      });
       latlngbounds.extend(myLatLng);
    }

      map.setCenter(latlngbounds.getCenter());
      map.fitBounds(latlngbounds);
    }
  };
  api.loadDestination(localStorage.getItem("token"), loadDestinationCallback);

  $('#remove-destination').on('submit', function(e){
    e.preventDefault();
    var reloadPage = function(error, data) {
    if (error) {
      console.log(error);
    } else {
      window.location.reload(true);
    }
  };

  api.deleteDestination(localStorage.getItem("token"), localStorage.getItem("destinationID"), reloadPage);

  })

});
