(function ($) {
  $(document).ready(function () {
    //document.addEventListener("deviceready", onDeviceReady, false);
    locationHashChanged();
    
    if ($('.openlayers-map').length === 1 ) {
      setTimeout(function(){
      resizeRideMap();
      }, 500);
      $(window).resize(function() {
        resizeRideMap();
      });
    }

    if($('#refresh-this-page').length > 0) {
      setInterval(function(){
        location.reload();
        // The following is a semi-failed attempt to use ajax to reload the page.
        //$.ajax({
        //    url: location.href,
        //    cache: false
        //}).done(function( returnText ) {
        //    y = $(returnText).filter('body');
        //    $('body').html(y);
        //});
      }, 24000);
    }
    address0 = '#edit-field-rider-address-und-0-value';
    address1 = '#field-start-time-address';
    if($(address0).length > 0) {
      if($(address1).length > 0) {
       $(address1).attr('value', $(address0).attr('value'));
       syncTextFields(address0, address1);
      }
    }
    
    if($('#save-later-ride').length > 0) {
      $('#save-later-ride').click(function(){
        $('#edit-submit').click();
      });
    }
  
  //function onDeviceReady() {
  //  if (typeof(window.device) != 'undefined'){
  //    if (window.device.platform === 'android' || window.device.platform === 'Android') {
  //      $('#app-debug').text('andriod');
  //    }
  //    else {
  //      $('#app-debug').text(window.device.platform);
  //    }
  //  }
  //  else {
  //    $('#app-debug').text('not an app');
  //  }
  //}
  });

  function syncTextFields(address0, address1) {
    $(address0).change(function(){
      $(address1).val($(address0).val());
    });
    $(address1).change(function(){
      $(address0).val($(address1).val());
    });
    $('#block-block-8 a').click(function(){
      $(address1).val($(address0).val());
    });
  }
})(jQuery);

function getUrlVars() {
  var hashes, vars = [], hash;
  hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
  for(var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function printStreetAddress(x, y) {
  var x, y, url, key, addressNumber, streetAddress;
  url = '/sites/all/modules/openlayers_proxy/ymap.php?lat=' + x + '&lon=' + y;
  jQuery.getJSON(url, function(data) {
    streetAddress = data.ResultSet.Results[0]['line1'];
    jQuery('#edit-field-rider-address-und-0-value').attr('value', streetAddress);
  });
}

function setLatLong() {
  var lon, lat;
  lon = getUrlVars()['lon'];
  lat = getUrlVars()['lat'];
  jQuery('#edit-field-geoloc-und-0-lng').val(lon);
  jQuery('#edit-field-geoloc-und-0-lat').val(lat);
  printStreetAddress(lat, lon);
}

function locationHashChanged() {
  if (jQuery('#edit-field-geoloc-und-0-lng').length > 0 && jQuery('#edit-field-geoloc-und-0-lat').length > 0) {
    setLatLong();
  }
}

function resizeRideMap() {
  var mapHeight;
  mapHeight = jQuery(window).height() - (jQuery('.openlayers-map').offset().top + 36);
  jQuery('.openlayers-container-map-').css('height',mapHeight);
  jQuery('.openlayers-map').css('height',mapHeight);
  jQuery('#block-block-1').css('margin-top', (mapHeight/2) - 40);
  locationHashChanged();
}

window.onhashchange = locationHashChanged;

