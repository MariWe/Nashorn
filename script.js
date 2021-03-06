let model, next, lat1, lat2, lon1, lon2, one, obj, d, lat, lon;

window.onload = () => {
    
    let dest = document.getElementById('seven').getAttribute('gps-entity-place');
    let zielLat = dest.latitude;
    let zielLon = dest.longitude;
    
    one = document.getElementById('one');
    getLocation();
    
    //"Navigation"
    function Navigation() {
        next = document.getElementById(one.dataset.next);
        lat2 = parseFloat(one.dataset.lat);
        lon2 = parseFloat(one.dataset.lon);
        zielDistanz(lat1, lon1, zielLat, zielLon);
        Distanz(lat1, lon1, lat2, lon2);
        Display();
        if (d < 5) {
            if (next.dataset.next === "null") {
                const div = document.querySelector('#demo');
                div.innerText = "Sie haben Ihr Ziel erreicht!";
            }
            else {
                one = next;
                obj = next;
            }
        }
    }

   function Display() {
        const div = document.querySelector('#demo');
        div.innerText = "Distanz bis zum Ziel: " + dis.toFixed(2) + "m";
    }
    
    function zielDistanz(lat1, lon1, zielLat, zielLon) {
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = zielLat * Math.PI / 180;
        const Δφ = (zielLat - lat1) * Math.PI / 180;
        const Δλ = (zielLon - lon1) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        dis = R * c; // in metres
        return dis;
    }

    //Aktuelle Position
    function getLocation() {
        navigator.geolocation.watchPosition(function (position) {
            aktuell = position.coords;
            lat1 = aktuell.latitude;
            lon1 = aktuell.longitude;
            Navigation();
            Pointing();
            return lat1, lon1;
        })
    }

    //Ausrichtung des Pfeils
    function Pointing() {
        var pfeil = document.querySelector('#pfeil');
        var position = one.object3D.position;
        pfeil.object3D.lookAt(new THREE.Vector3(position.x, position.y, position.z));
    }

    //distanzBerechnung
    //cr: "https://www.movable-type.co.uk/scripts/latlong.html"
    function Distanz(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        d = R * c; // in metres
        return d;
    }
}
