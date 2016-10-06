var myLat, myLon, accuracy, userGeoLocation, setNID;
accuracy = 100;
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
        console.log('position changed');
        accuracy = position.coords.accuracy;
        myLat = Number(position.coords.latitude).toFixed(5);
        myLon = Number(position.coords.longitude).toFixed(5);
        userGeoLocation = JSON.stringify(position);
        if (jQuery('#update-driver-location-callback').length > 0) {
            // we have a driver we need to track.
            if (jQuery('#node-id-value').length > 0) {
                setNID = jQuery('#node-id-value').text();
                jQuery.post(
                    '/sites/all/modules/custom/custom_driver_location/update_driver_location.php',
                    {data: userGeoLocation, nid: setNID}
                ).done(
                    function (data) {
                        console.log("results: " + data);
                    }
                );
            }
            else {
                jQuery.post(
                    '/sites/all/modules/custom/custom_driver_location/update_driver_location.php',
                    {data: userGeoLocation}
                ).done(
                    function (data) {
                        console.log("results: " + data);
                    }
                );
            }
        }
    }, function (data) {
        console.log("Error: " + data);
    }, {
        // maximumAge: 300000,
        // timeout: 30000,
        frequency: 3000,
        enableHighAccuracy: true
    });
}
(function ($) {
    $(document).ready(function () {
        //document.addEventListener("deviceready", onDeviceReady, false);
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

        if ($('#refresh-this-page').length > 0) {
            setInterval(function () {
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
    alert(x+" "+y);
    url = '/sites/all/modules/openlayers_proxy/ymap.php?lat=' + x + '&lon=' + y;
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        if (Number(x).toFixed(3) !== '37.780' || Number(y).toFixed(3) !== '-122.351') {
            if (myLat !== Number(x).toFixed(5) || myLon !== Number(y).toFixed(5) || accuracy < 40) {
                jQuery.getJSON(url, function (data) {
                    streetAddress = data.ResultSet.Results[0]['line1'];
                    //alert(streetAddress);
                    if (streetAddress != 'Pier 50' && streetAddress != '') {
                        jQuery('#edit-field-rider-address-und-0-value').attr('value', streetAddress);
                    }
                });
            }
        }
    }
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
    var mapHeight, openLayersMap;
    openLayersMap = jQuery('.openlayers-map');
    mapHeight = jQuery(window).height() - (openLayersMap.offset().top + 36);
    jQuery('.openlayers-container-map-').css('height', mapHeight);
    openLayersMap.css('height', mapHeight);
    jQuery('#block-block-1').css('margin-top', (mapHeight / 2) - 40);
    locationHashChanged();
}

window.onhashchange = locationHashChanged;

