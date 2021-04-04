
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var gpx = '/me.gpx'; // URL to your GPX file or the GPX itself
new L.GPX(gpx, {
    async: true, marker_options: {
        startIconUrl: 'pin-icon-start.png',
        endIconUrl: 'pin-icon-end.png',
        shadowUrl: 'pin-shadow.png',
    },
}).on('loaded', function (e) {
    mymap.fitBounds(e.target.getBounds());
    var control = L.control.layers(null, null).addTo(mymap);

    document.getElementById("titolo").textContent = e.target.get_name()
}).addTo(mymap);

var layer = null;
function onMove(pos) {
    if (layer)
        mymap.removeLayer(layer)
    layer = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(mymap);
    mymap.addLayer(layer)
}

function error(err) {
    alert('ERROR(' + err.code + '): ' + err.message);
}

function abort() {
    navigator.geolocation.clearWatch(id);
}


id = navigator.geolocation.watchPosition(onMove, error, {
    enableHighAccuracy: false,
    timeout: 50000,
    maximumAge: 0
});
