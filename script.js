document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Active State on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const updateActiveLink = () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // 2. Tour Data (Amsterdam-Belgium Rerouted Loop)
    const tourLocations = [
        { day: 1, name: "Schiphol Airport", lat: 52.3105, lng: 4.7683, type: "transport" },
        { day: 1, name: "Ruby Emma Hotel", lat: 52.3414, lng: 4.9192, type: "hotel" },
        { day: 1, name: "Gifu Ramen Bar", lat: 52.3693, lng: 4.8805, type: "food" },

        { day: 2, name: "Zaandam Station", lat: 52.4414, lng: 4.8159, type: "attraction" },
        { day: 2, name: "Zaanse Schans", lat: 52.4731, lng: 4.8210, type: "attraction" },

        { day: 3, name: "Museumplein", lat: 52.3582, lng: 4.8812, type: "attraction" },
        { day: 3, name: "Hortus Botanicus", lat: 52.3667, lng: 4.9083, type: "attraction" },

        { day: 4, name: "Giethoorn P1", lat: 52.7401, lng: 6.0792, type: "transport" },
        { day: 4, name: "Zwolle Sassenpoort", lat: 52.5091, lng: 6.0963, type: "attraction" },
        { day: 4, name: "Hotel De Roode Schuur", lat: 52.2127, lng: 5.5031, type: "hotel" },

        { day: 5, name: "Rotterdam Markthal", lat: 51.9179, lng: 4.4852, type: "attraction" },
        { day: 5, name: "Binnenhof The Hague", lat: 52.0797, lng: 4.3125, type: "attraction" },
        { day: 5, name: "Hotel Avenue Louise", lat: 50.8235, lng: 4.3673, type: "hotel" },

        { day: 6, name: "Atomium", lat: 50.8949, lng: 4.3415, type: "attraction" },
        { day: 6, name: "Grand Place", lat: 50.8467, lng: 4.3524, type: "attraction" },
        { day: 6, name: "Maison Dandoy", lat: 50.8481, lng: 4.3551, type: "food" },
        { day: 6, name: "Frites Atelier", lat: 50.8491, lng: 4.3523, type: "food" },

        { day: 7, name: "Ghent Graslei", lat: 51.0555, lng: 3.7208, type: "attraction" },
        { day: 7, name: "Castelnou Aparthotel", lat: 51.0496, lng: 3.7391, type: "hotel" },

        { day: 8, name: "The Old Chocolate House", lat: 51.2064, lng: 3.2241, type: "food" },
        { day: 8, name: "Hotel Bourgoensch Hof", lat: 51.2076, lng: 3.2263, type: "hotel" },

        { day: 9, name: "Minnewater Lake", lat: 51.1997, lng: 3.2239, type: "attraction" },
        { day: 9, name: "Lover's Bridge", lat: 51.2048, lng: 3.2251, type: "attraction" },
        { day: 9, name: "Boho Brunch", lat: 51.2065, lng: 3.2208, type: "food" },

        { day: 10, name: "Antwerp Station", lat: 51.2172, lng: 4.4211, type: "attraction" },
        { day: 10, name: "Holiday Inn Express Antwerp", lat: 51.2185, lng: 4.4146, type: "hotel" },

        { day: 11, name: "Schiphol (Departure)", lat: 52.3105, lng: 4.7683, type: "transport" }
    ];

    // 3. Icons (Color-Coded)
    const icons = {
        attraction: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
        }),
        transport: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
        }),
        hotel: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
        }),
        food: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
        })
    };

    // 4. Leaflet Map Initialization
    const mapSection = document.getElementById('map-section');
    const mapElement = document.getElementById('map');
    
    if (mapSection && mapElement) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !window.tourMap) {
                    const map = L.map('map').setView([51.50, 4.5], 7);
                    window.tourMap = map;

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    tourLocations.forEach(loc => {
                        const label = loc.type === 'food' ? `🍴 Pit Stop: ${loc.name}` : `Day ${loc.day}: ${loc.name}`;
                        L.marker([loc.lat, loc.lng], { icon: icons[loc.type] || icons.attraction })
                            .bindPopup(`<strong>${label}</strong>`)
                            .addTo(map);
                    });

                    setTimeout(() => { map.invalidateSize(); }, 500);
                    mapObserver.unobserve(mapSection);
                }
            });
        }, { threshold: 0.1 });

        mapObserver.observe(mapSection);
    }
});
