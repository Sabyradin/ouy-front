document.addEventListener("DOMContentLoaded", () => {
    console.log("Байланыс беті жүктелді");
    
    // Пайдаланушының орналасқан жерін көрсету функциясы
    function initUserLocationMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                showUserPosition,
                showGeolocationError,
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            alert("Браузеріңіз геолокацияны қолдамайды");
        }
    }
    
    // Пайдаланушының орнын көрсету
    function showUserPosition(position) {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        
        const shopLocation = {
            lat: 43.2388969,  // Дүкеннің координаталары
            lng: 76.9271441
        };
        
        const map = new google.maps.Map(document.getElementById("user-location-map"), {
            zoom: 14,
            center: shopLocation,
            mapTypeId: 'roadmap',
            styles: [
                {
                    "featureType": "poi",
                    "stylers": [{"visibility": "off"}]
                }
            ]
        });
        
        // Дүкеннің маркері
        new google.maps.Marker({
            position: shopLocation,
            map: map,
            title: "OYU EcoShop дүкені",
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }
        });
        
        // Пайдаланушының маркері
        new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Сіздің орналасқан жеріңіз",
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        });
        
        // Екі нүктенің арасындағы сызық
        new google.maps.Polyline({
            path: [userLocation, shopLocation],
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
        });
        
        // Есептеу қашықтығы
        const distance = calculateDistance(
            userLocation.lat, 
            userLocation.lng, 
            shopLocation.lat, 
            shopLocation.lng
        );
        
        document.getElementById("distance-info").innerHTML = `
            <p><strong>Сіздің қазіргі орналасқан жеріңізге дейін:</strong> ${distance} км</p>
        `;
    }
    
    // Геолокация қатесі
    function showGeolocationError(error) {
        let errorMessage = "Орналасқан жерді анықтау мүмкін болмады. ";
        
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage += "Геолокацияға рұқсат берілмеді.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage += "Орналасқан жер туралы ақпарат қолжетімсіз.";
                break;
            case error.TIMEOUT:
                errorMessage += "Орналасқан жерді анықтау уақыты асып кетті.";
                break;
            case error.UNKNOWN_ERROR:
                errorMessage += "Белгісіз қате орын алды.";
                break;
        }
        
        document.getElementById("distance-info").innerHTML = `
            <p class="error">${errorMessage}</p>
        `;
    }
    
    // Екі нүкте арасындағы қашықтықты есептеу (км)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Жер радиусы км-де
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        return distance.toFixed(1);
    }
    
    // Картаны іске қосу
    window.initMap = function() {
        initUserLocationMap();
    };
    
    // Социальные кнопки анимациясы
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.querySelector('i').style.transform = 'scale(1.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.querySelector('i').style.transform = 'scale(1)';
        });
    });
});