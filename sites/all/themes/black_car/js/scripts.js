var myLat, myLon, accuracy, userGeoLocation, setNID, map, marker,refresh;
accuracy = 100;

if (navigator.geolocation) { 
		navigator.geolocation.watchPosition(function (position) { 
        accuracy = position.coords.accuracy;
				timestamp = position.timestamp;
        myLat = Number(position.coords.latitude).toFixed(5);
        myLon = Number(position.coords.longitude).toFixed(5);
        var coords = { coords: {latitude:myLat,	longitude:myLon, accuracy:accuracy},
		timestamp:timestamp,			
			}
	userGeoLocation = JSON.stringify(coords);	
           // we have a driver we need to track.
            if (jQuery('#node-id-value').length > 0) {
                setNID = jQuery('#node-id-value').text();
                jQuery.post(
                    Drupal.settings.basePath+'sites/all/modules/custom/custom_driver_location/update_driver_location.php',
                    {data: userGeoLocation, nid: setNID}
                ).done(
                    function (data) {
                        console.log("results: " + data);
                    }
                );
            } else {
                jQuery.post(
                    Drupal.settings.basePath+'sites/all/modules/custom/custom_driver_location/update_driver_location.php',
                    {data: userGeoLocation}
                ).done(
                    function (data) { 
                        console.log("results: " + data);
                    }
                );
            }
    }, function (data) {
        console.log("Error: " + data);
    }, {
        frequency: 3000,
        enableHighAccuracy: true
    });
		
	navigator.geolocation.getCurrentPosition(function (position) { 
        accuracy = position.coords.accuracy;
	timestamp = position.timestamp;
        myLat = Number(position.coords.latitude).toFixed(5);
        myLon = Number(position.coords.longitude).toFixed(5);
	console.log("DrivermyLat==>" + myLat + "DrivermyLat==> " +myLon);			
				//Update map for current location
				if(Drupal.settings.leaflet){
				var map = Drupal.settings.leaflet[0].lMap;
				var marker =map._layers.leaflet_ridebooker;
				if (marker) {
					map.panTo(new L.LatLng(myLat, myLon));
					marker.setLatLng(map.getCenter());
					//Change marker position
					setLeafLatLong(myLat, myLon);
				}
				}

    });
		
}
function cost_button(){
	var url, streetAddress;
	var lon = '';var lat ='';
		if (Drupal.settings.leaflet) {
		  	var map = Drupal.settings.leaflet[0].lMap;
			var marker =map._layers.leaflet_ridebooker;
			var position = marker.getLatLng();
			lat = Number(position['lat']).toFixed(5);
			lon = Number(position['lng']).toFixed(5);
		}
		if(lat == '' || lon == ''){
			lat = myLat;
			lon = myLon;
		}
	url = Drupal.settings.basePath+'sites/all/modules/openlayers_proxy/ymap.php?lat=' + lat + '&lon=' + lon;
    	jQuery.getJSON(url, function (data) {
                var address = data.ResultSet.Results[0]['line1']+', '+data.ResultSet.Results[0]['city']+', '+data.ResultSet.Results[0]['postal'];
		if (address != '') {
		   jQuery('#edit-origin').val(address);
                } else {
                	address = jQuery('.form-item-field-rider-address-und-0-value').find(jQuery('#edit-field-rider-address-und-0-value')).val();
                	jQuery('#edit-origin').val(address);
                }
        });

}

function showPosition(position)
  {
  alert(position.coords.latitude); 
  }
  	


(function ($) { 
    $(document).ready(function () {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('=');

            if(sURLVariables){
            	if(sURLVariables[1]==10){
            	  jQuery("#edit-field-car-type input").removeAttr('checked');
               	  $("#edit-field-car-type #edit-field-car-type-und-10").attr("checked",true);
jQuery("#car-type").find("span").append( "<h2>Hybrid</h2><dl><dd>4.99$ is minimum cost.</dd><dd>2.19$ will be base price.</dd><dd>1.30$ per mile.</dd><dd>0.26$ per minute.</dd></dl>" );
            	}else if(sURLVariables[1]==12){
	       	  jQuery("#edit-field-car-type input").removeAttr('checked');
            	  $("#edit-field-car-type #edit-field-car-type-und-12").attr("checked",true);
            	  jQuery("#car-type").find("span").append( "<h2>SUV</h2><dl><dd>24.99$ is minimum cost.</dd><dd>14.99$ will be base price.</dd><dd>3.75$ per mile.</dd><dd>0.90$ per minute.</dd></dl>" );
            	}else{
            	  $("#edit-field-car-type #edit-field-car-type-und-4").attr("checked",true)
            	  jQuery("#car-type").find("span").append( "<h2>Town</h2><dl><dd>14.99$ is minimum cost.</dd><dd>7.99$ will be base price.</dd><dd>3.75$ per mile.</dd><dd>0.65$ per minute.</dd></dl>" );
            	}
            }
            if(jQuery("form input[type='radio']:checked")) {
		  jQuery("form input[type='radio']:checked").parent().find("span").wrap( "<a data-reveal-id='car-type'></a>" );
		}
        var address0, address1, saveLaterRide;
       
        locationHashChanged();

        if ($('.openlayers-map').length === 1) { 
            setTimeout(function () {
                resizeRideMap();
            }, 500);
            $(window).resize(function () {
                resizeRideMap();
            });
        }
       
           setInterval(function () { 
                 setNID = jQuery('#node-id-value').text();
                jQuery.ajax({type: "POST", 
                url: Drupal.settings.basePath+"drivercoming",
		data: {'nid':setNID}, 
		cache: false,
		}).done(function( result ) {
		   var pathname = window.location.pathname;
		   var res = pathname.split("/");
		   if(typeof(res[3])=="undefined"){
		     param="customer";
		   }else{
		     param='driver';
		   }

		   if(result=='1' && param=='customer'){
			   localStorage.setItem("refresh", parseInt("0"));
		   }else if(result=='2' && param=='customer'){
			   localStorage.setItem("refresh", parseInt("0"));
		  }else if(result=='12' && param=='customer'){
		   if(localStorage.getItem("refresh") == 1){
		   	localStorage.setItem("refresh", parseInt("0"));
		   	location.reload(true);
		   }
		  }else if(result == '0' && param == 'customer'){
			   if(localStorage.getItem("refresh")==0){
			   temp=parseInt(localStorage.getItem("refresh"))+parseInt("1");
			   localStorage.setItem("refresh",temp);
			   location.reload(true);
			  } else if(result=='3'){
			  	window.location(Drupal.settings.basePath +'/user');
			  }
		    jQuery.ajax({
			type: "POST", 				 
			url: Drupal.settings.basePath+"get_driver_location",
			data: {'nid':setNID}, 
			cache: false,
			}).done(function( result ) {
				if (result != 'error') { 
				result = jQuery.parseJSON(result);
				var leaflet_id='leaflet_ridebooker'+setNID;
				var marker2 =map._layers[leaflet_id];
                if(marker2) {
                    marker2.setLatLng([result.lat, result.lon]);
                }
				}
			});
										
		  
		   }
		});
            }, 5000);

        address0 = '#edit-field-rider-address-und-0-value';
        address1 = '#field-start-time-address';
        if ($(address0).length > 0) {
            if ($(address1).length > 0) {
                $(address1).attr('value', $(address0).attr('value'));
                syncTextFields(address0, address1);
            }
        }
        saveLaterRide = $('#save-later-ride');

        if (saveLaterRide.length > 0) {
            saveLaterRide.click(function () {
                $('#edit-submit').click();
            });
        }
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('iphone') != -1) {
            if ($('.google').length > 0) {
                $('.google').hide();
            }
        }
				var lat, lng;
				//Getting map objects
				if (Drupal.settings.leaflet) {
				
				  var map = Drupal.settings.leaflet[0].lMap;
					//Getting marker object
					var marker =map._layers.leaflet_ridebooker;
					if (map._layers.leaflet_ridebooker) {
						
						//for adding all available car in new ride page
						var LeafIcon = L.Icon.extend({
								options: {
									iconSize:     [22, 22],
								}
							});
						var clientIcon = new LeafIcon({iconUrl: '/sites/all/themes/black_car/images/caricon.png'});
						setInterval(function () {  
								jQuery.ajax({
										type: "POST", 				 
										url: Drupal.settings.basePath+"pickup/get_avail_drivers_location",
										data: {}, 
										cache: false,
								}).done(function( result ) {
										if (result != 'error') { 
											result = jQuery.parseJSON(result);
											
											$.each(result, function(key,val) {
													if(val.length != ""){
													        var car_marker = '';
														 // var idTok='leaflet_ridebooker'+key;
														 var idTok='leaflet_ridebooker';
														 car_marker = map._layers[idTok];
                                                         //update driver location
														 car_marker.setLatLng([val[1], val[0]]);
                                                         //Set current user location to default map center
                                                         marker.setLatLng(map.getCenter());
														
													}
											});
											//add icon and bind to popup
											//L.marker([30.31649, 78.03219], {icon: clientIcon}).addTo(map);
										}
								});
								driverTime();
									}, 10000);
					       
						L.control.zoom({position: 'topright'}).addTo(map);
						//Move event of map for update marker position
						map.on('move', function () {
								marker.setLatLng(map.getCenter());
								//console.log(map.getCenter());
						});
						
						//Dragend event of map for update marker position
						map.on('dragend', function(e) {
								var cnt = map.getCenter();
								var position = marker.getLatLng();
								lat = Number(position['lat']).toFixed(5);
								lng = Number(position['lng']).toFixed(5);
								
	
								//console.log(position);
								setLeafLatLong(lat, lng);
								setLatLong();
						});
						//zoomend event of map for update marker position
						map.on('zoomend', function(e) {
								var cnt = map.getCenter();
								var position = marker.getLatLng();
								lat = Number(position['lat']).toFixed(5);
								lng = Number(position['lng']).toFixed(5);
								setLeafLatLong(lat, lng);
						});
						/*Added as block setNID = jQuery('#node-id-value').text();
						setInterval(function () { 
									jQuery.post(
											Drupal.settings.basePath+'testCancelRide',
											{'nid':setNID}
									).done(
											function (result) {
                                                if (result != 'error') {
                                                    // location.reload(true);
                                                   // window.location.href = Drupal.settings.basePath+'user';
                                                }
											}, "json"
									);
								}, 10000); */
					} else {
						 if (jQuery('#node-id-value').length > 0) { 
						 	   console.log('sumit');
								 setNID = jQuery('#node-id-value').text();
									jQuery.post(
											Drupal.settings.basePath+'pickup/get_customer_loc',
											{'nid':setNID}
									).done(
											function (result) { 
													if (result != 'error') {
														result = jQuery.parseJSON(result);
														clat = result.lat;
														clon = result.lon;
														var LeafIcon = L.Icon.extend({
															options: {
																iconSize:     [26, 40],
															}
														});
														var clientIcon = new LeafIcon({iconUrl: '/sites/all/themes/black_car/images/ridericon3.png'});
													 //add icon and bind to popup
														L.marker([clat, clon], {icon: clientIcon}).addTo(map);
														
														//var newIcon = new LeafIcon({iconUrl: 'https://dev-black-cr.gotpantheon.com/sites/all/themes/black_car/images/ridericon3.png'});
														//new L.marker([clat, clon], {icon: RedIcon}).addTo(map);
														//console.log(map);
														var marker1 =map._layers[22];
														var marker2 =map._layers[26];
														if (marker1 && marker2) {
															map.fitBounds([[marker1._latlng.lat, marker1._latlng.lng], [marker2._latlng.lat, marker2._latlng.lng]]);
														}
													}
											}, "json"
									); 
								/*	setInterval(function () { 
									        var idTok='leaflet_ridebooker'+setNID;
										var marker3 =map._layers[idTok];
										setNID = jQuery('#node-id-value').text();
										jQuery.ajax({
												type: "POST", 				 
												url: Drupal.settings.basePath+"get_driver_location",
												data: {'nid':setNID}, 
												cache: false,
										}).done(function( result ) {
										               
												if (result != 'error') { 
													result = jQuery.parseJSON(result);
													
													marker3.setLatLng([result.lat, result.lon])
													
												}
										});
							}, 10000);*/
						/*Code For Alert about Customer Ride cancel */	
							
						}
					}
				}
    });

    function syncTextFields(address0, address1) {
        $(address0).change(function () {
            $(address1).val($(address0).val());
        });
        $(address1).change(function () {
            $(address0).val($(address1).val());
        });
        $('#block-block-8').find('a').click(function () {
            $(address1).val($(address0).val());
        });
    }
})
    (jQuery);

function getUrlVars() {
    var hashes, vars = [], hash;
    hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function printStreetAddress(x, y) {
   var url, key, streetAddress;
    key = 'secret-key';
    url = Drupal.settings.basePath+'sites/all/modules/openlayers_proxy/ymap.php?lat=' + x + '&lon=' + y;
    jQuery.getJSON(url, function (data) {
	console.log("postal: "+data.ResultSet.Results[0]['postal']);
                    streetAddress = data.ResultSet.Results[0]['formated_address'];
		   console.log("city: "+data.ResultSet.Results[0]['city']);
                    if (streetAddress != 'Alameda Harbor Bay Fry' && streetAddress != '') {
                        jQuery('#edit-field-rider-address-und-0-value').attr('value', streetAddress);
                    }
                });
     /* Code to get time */
    	    driverTime();
}
function setLatLong() {
    var lon, lat;
		if (Drupal.settings.leaflet) {
		  var map = Drupal.settings.leaflet[0].lMap;
			var marker =map._layers.leaflet_ridebooker;
			var position = marker.getLatLng();
			lat = Number(position['lat']).toFixed(5);
			lon = Number(position['lng']).toFixed(5);
			//console.log(position['lat'].toFixed(5)+"    "+lon);
			jQuery('#edit-field-geoloc-und-0-lng').val(lon);
			jQuery('#edit-field-geoloc-und-0-lat').val(lat);
			printStreetAddress(lat, lon);
		}
}

function locationHashChanged() {  
 
    if (jQuery('#edit-field-geoloc-und-0-lng').length > 0 && jQuery('#edit-field-geoloc-und-0-lat').length > 0) {
   
        setLatLong();
    }
}

function resizeRideMap() {
    var mapHeight, openLayersMap;
    openLayersMap = jQuery('.openlayers-map');
    mapHeight = jQuery(window).height() - (openLayersMap.offset().top + 36);
    jQuery('.openlayers-container-map-').css('height', mapHeight);
    openLayersMap.css('height', mapHeight);
    jQuery('#block-block-1').css('margin-top', (mapHeight / 2) - 40);
    locationHashChanged();
}

// Update address after map events
function setLeafLatLong(x, y) {
    jQuery('#edit-field-geoloc-und-0-lat').val(x);
		jQuery('#edit-field-geoloc-und-0-lng').val(y);
    printStreetAddress(x, y);
}

//Function to reset marker to users current location
function getcenter(){
  var map = Drupal.settings.leaflet[0].lMap;
	var marker =map._layers.leaflet_ridebooker;
	lat = myLat; //'30.31649';
	lng = myLon; //'78.03219'
	
	var newLatLng = new L.LatLng(lat, lng);
	map.panTo(newLatLng);
  marker.setLatLng(newLatLng); 
	setLeafLatLong(lat, lng);
}
function driverTime(){
if (Drupal.settings.leaflet) {
	var map = Drupal.settings.leaflet[0].lMap;
	//Getting marker object
	var marker =map._layers.leaflet_ridebooker;
	var position = marker.getLatLng();
	lat = Number(position['lat']).toFixed(5);
	lng = Number(position['lng']).toFixed(5);
	    var sPageURL = window.location.search.substring(1);
            var roleid = 0;
            if(sPageURL != ''){
            var sURLVariables = sPageURL.split('=');
            var roleid = sURLVariables[1];
            } else {
            roleid = 11;
            }
          //  console.log("role id:-"+roleid+", lat:-"+lat+", long:-"+lng);
            jQuery.post(
		Drupal.settings.basePath+'getEstimatedTimeCalc',
		{ lat: lat , lon: lng , roleid: roleid }
		).done(function( result ) {
			if (result != 'error') {
				jQuery( ".time_box" ).html( result );

			}
		}); 
		}
}

window.onhashchange = locationHashChanged;

var alreadySelected = 0;
var i = 0;



jQuery("#edit-field-car-type input").live('click', function () {
	jQuery("#edit-field-car-type input").removeAttr('checked');
	jQuery(this).attr('checked', true);
	//jQuery( ".carDetail" ).after( "<p>Test</p>" );
	var prevSelected = alreadySelected;
	alreadySelected = jQuery(this).val();
	if(i == 0) {
     	  prevSelected = alreadySelected;
	}
	i++;
	if(alreadySelected == prevSelected) {
	
	  window.location.href="?driver="+alreadySelected;
	  return false;
	}
});
