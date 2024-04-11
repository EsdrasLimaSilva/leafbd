class App {
    form;
    nameInput;
    emailInput;
    openingTimeInput;
    closingTimeInput;
    specialtyInput;
    clinicLocation;
    map;
    marker;

    constructor() {
        this.form = document.querySelector("form");
        this.nameInput = document.querySelector("#name");
        this.emailInput = document.querySelector("#email");
        this.openingTimeInput = document.querySelector("#specialty");
        this.closingTimeInput = document.querySelector("#opening-time");
        this.specialtyInput = document.querySelector("#closing-time");
        this.clinicLocation = { lat: -6.887698002563706, lng: -38.56015173326553 };

        // initializing the map
        this.map = L.map('map', {
            center: [this.clinicLocation.lat, this.clinicLocation.lng],
            zoom: 15,
            minZoom: 14,
            maxZoom: 16
        });

        // adding tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.marker = this.addMark(this.clinicLocation.lat, this.clinicLocation.lng);

        // trying to get user location
        this.getUserLocation();

        // handling clicks
        this.map.on("click", this.handleMapClick.bind(this));

        // handle submit
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();

        const name = this.nameInput.value;
        const email = this.emailInput.value;
        const specialty = this.specialtyInput.value;
        const openingTime = this.openingTimeInput.value;
        const closingTime = this.closingTimeInput.value;

        const data = {
            name,
            email,
            specialty,
            openingTime,
            closingTime,
            clinicLocation: {
                type: "Point",
                coordinates: [this.clinicLocation.lat, this.clinicLocation.lng]
            }
        }

        console.log(data);
    }

    handleMapClick(e) {
        this.setClinicLoation(e.latlng.lat, e.latlng.lng)
        this.updateMap();
    }

    setClinicLoation(lat, lng) {
        this.clinicLocation.lat = lat;
        this.clinicLocation.lng = lng;
    }

    getUserLocation() {
        this.map.locate();
        this.map.on('locationfound', (e) => {
            const { lat, lng } = e.latlng;
            this.setClinicLoation(lat, lng);
            this.updateMap(lat, lng);
        });
    }

    addMark(lat, lng) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        return marker;
    }

    updateMap() {
        const lat = this.clinicLocation.lat;
        const lng = this.clinicLocation.lng;

        this.map.setView({ lat, lng });
        this.marker.setLatLng({ lat, lng });
    }

    init() {

    }
}


window.addEventListener("load", () => new App().init());