import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet/dist/leaflet.css'

const LocationMap = ({ teacherLocation, studentLocation }) => {
    const mapInstance = useRef(null);
    const mapRef = useRef(null);
    const routeController = useRef(null);
    const studentMarker = useRef(null);
    const teacherMarker = useRef(null);

    useEffect(() => {
        if (!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView([studentLocation.lat, studentLocation.lgt], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapInstance.current);

            routeController.current = L.Routing.control({
                waypoints: [
                    L.latLng(studentLocation.lat, studentLocation.lgt),
                    L.latLng(teacherLocation.lat, teacherLocation.lng)
                ],
                routeWhileDragging: false,
                router: new L.Routing.OSRMv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                }),
                showAlternatives: false,
                fitSelectedRoutes: true,
                show: false,
                lineOptions: {
                    styles: [{ color: 'blue', weight: 4 }]
                },
            }).addTo(mapInstance.current);
        }
        studentMarker.current = L.marker([studentLocation.lat, studentLocation.lgt]).addTo(mapInstance.current);
        studentMarker.current.bindPopup('<h1>انت هنا</h1>').openPopup();
        teacherMarker.current = L.marker([teacherLocation.lat, teacherLocation.lng]).addTo(mapInstance.current);
    }, [teacherLocation, studentLocation])

    return (
        <div ref={mapRef} className='w-full h-[500px] rounded ' />
    )
}

export default LocationMap