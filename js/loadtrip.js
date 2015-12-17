function generateGrid(jsonData) {
    var html = '';
    for (var i = 0; i < jsonData.length; i++) {
      var trip = jsonData[i];
      html += '<div class="asia col-xs-6 col-sm-6 col-md-6 col-lg-6"><div class="portfolio_item"><a href="';
      html += 'trip.html?trip=' + trip.id +'"';
      html += 'data-path-hover="M 180,190 0,158 0,0 180,0 z"><figure style="background-image:url(images/portfolio/t5.jpg)"><svg viewBox="0 0 180 320" preserveAspectRatio="none"><path d="M 180,0 0,0 0,0 180,0 z"/></svg><figcaption><div class="view_button">View</div></figcaption></figure></a><div class="portfolio_description"><h3><a href="';
      html += 'trip.html?trip=' + trip.id +'">';
      html += trip.region;
      html += '</a></h3><p>';
      html += trip.start_date;
      html += '</p><p>';
      html += trip.end_date;
      html += '</p></div></div></div>';
  }
  $("#tripRow").append(html);
}
$(function(){
  var loadTripCallback = function(error, data) {
    if(error){
      console.log(error);
    } else {
      console.log(data.trips);
      generateGrid(data.trips);
      var tripID = localStorage.setItem("tripID", data.trips.id);
        console.log(tripID);
    }
  };
  api.loadDestination(localStorage.getItem("token"), loadTripCallback);
});
