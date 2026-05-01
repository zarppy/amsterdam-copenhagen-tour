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

    // 2. Tour Data (Amsterdam-Belgium Loop)
    const tourLocations = [
        { day: 1, name: "Schiphol Airport", lat: 52.3105, lng: 4.7683, type: "transport" },
        { day: 1, name: "Ruby Emma Hotel", lat: 52.3414, lng: 4.9192, type: "hotel" },
        { day: 1, name: "Gifu Ramen Bar", lat: 52.3693, lng: 4.8805, type: "food" },
        { day: 1, name: "Albert Heijn", lat: 52.3741, lng: 4.8843, type: "food" },
        { day: 1, name: "Febo", lat: 52.3653, lng: 4.8872, type: "food" },

        { day: 2, name: "Zaandam Station", lat: 52.4414, lng: 4.8159, type: "attraction" },
        { day: 2, name: "Zaanse Schans (Windmills)", lat: 52.4731, lng: 4.8210, type: "attraction" },
        { day: 2, name: "Damrak (Dancing Houses)", lat: 52.3762, lng: 4.8953, type: "attraction" },

        { day: 3, name: "Rijksmuseum", lat: 52.3600, lng: 4.8852, type: "attraction" },
        { day: 3, name: "Van Gogh Museum", lat: 52.3582, lng: 4.8812, type: "attraction" },
        { day: 3, name: "Hans & Grietje (Spiegelgracht)", lat: 52.3592, lng: 4.8885, type: "food" },
        { day: 3, name: "Hortus Botanicus", lat: 52.3667, lng: 4.9083, type: "attraction" },

        { day: 4, name: "Giethoorn P1 Parking", lat: 52.7401, lng: 6.0792, type: "transport" },
        { day: 4, name: "Vollenhove Harbor", lat: 52.6821, lng: 5.9512, type: "attraction" },
        { day: 4, name: "Zwolle Sassenpoort", lat: 52.5091, lng: 6.0963, type: "attraction" },
        { day: 4, name: "Firma Stroop (Utrecht)", lat: 52.0934, lng: 5.1147, type: "food" },
        { day: 4, name: "Hotel De Roode Schuur", lat: 52.2127, lng: 5.5031, type: "hotel" },

        { day: 5, name: "Rotterdam Markthal", lat: 51.9179, lng: 4.4852, type: "attraction" },
        { day: 5, name: "Adagio Grand Place", lat: 50.8467, lng: 4.3525, type: "hotel" },
        { day: 5, name: "Chez Leon", lat: 50.8475, lng: 4.3533, type: "food" },
        { day: 5, name: "Neuhaus Chocolate", lat: 50.8476, lng: 4.3538, type: "food" },

        { day: 6, name: "Atomium", lat: 50.8949, lng: 4.3415, type: "attraction" },
        { day: 6, name: "Maison Dandoy", lat: 50.8481, lng: 4.3551, type: "food" },
        { day: 6, name: "Frites Atelier", lat: 50.8491, lng: 4.3523, type: "food" },
        { day: 6, name: "Frank Cafe", lat: 50.8493, lng: 4.3562, type: "food" },
        { day: 6, name: "Mont des Arts", lat: 50.8444, lng: 4.3567, type: "attraction" },

        { day: 7, name: "Namur Citadel", lat: 50.4605, lng: 4.8640, type: "attraction" },
        { day: 7, name: "Dinant Church", lat: 50.2611, lng: 4.9124, type: "attraction" },

        { day: 8, name: "Le Pain Quotidien Ghent", lat: 51.0543, lng: 3.7228, type: "food" },
        { day: 8, name: "Choccoladebar Mayana", lat: 51.0545, lng: 3.7225, type: "food" },
        { day: 8, name: "Ghent Graslei", lat: 51.0555, lng: 3.7208, type: "attraction" },
        { day: 8, name: "The Old Chocolate House", lat: 51.2064, lng: 3.2241, type: "food" },
        { day: 8, name: "Boho Brunch", lat: 51.2065, lng: 3.2208, type: "food" },
        { day: 8, name: "Grand Hotel Casselbergh", lat: 51.2087, lng: 3.2241, type: "hotel" },

        { day: 9, name: "Minnewater Lake", lat: 51.1997, lng: 3.2239, type: "attraction" },
        { day: 9, name: "Lover's Bridge", lat: 51.2048, lng: 3.2251, type: "attraction" },
        { day: 9, name: "Nakhon Thai", lat: 51.2093, lng: 3.2268, type: "food" },
        { day: 9, name: "Antwerp Station", lat: 51.2172, lng: 4.4211, type: "attraction" },
        { day: 9, name: "Hotel Franq", lat: 51.2194, lng: 4.4025, type: "hotel" },

        { day: 10, name: "Amsterdam Return", lat: 52.3792, lng: 4.8994, type: "transport" },
        { day: 10, name: "Hotel Mercier", lat: 52.3732, lng: 4.8821, type: "hotel" }
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
