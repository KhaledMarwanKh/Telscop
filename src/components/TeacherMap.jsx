import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';
import { subjects } from '../data/assests';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TeacherMap = ({ teachers, onTeacherSelect }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([34.7342, 36.7072], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);
    }

    markersRef.current.forEach(marker => {
      mapInstance.current.removeLayer(marker);
    });
    markersRef.current = [];

    teachers.forEach(teacher => {

      const customIcon = L.divIcon({
        className: 'teacher-marker',
        html: `<div style="            
            width:30px;
            height: 30px;
            background-color: blue;
            padding: 3px;
            border-radius: 50%;
            position: relative;">
        <img style="        
        width:100%;
        border-radius:50%;" 
        src="${teacher.image}" />
        </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([teacher?.location?.coordinates[1], teacher?.location?.coordinates[0]], { icon: customIcon })
        .addTo(mapInstance.current);

      const popupContent = `
        <div class="p-3 flex flex-col items-center rounded-[10px] text-black text-right" dir="rtl">
            <div class="flex justify-around items-center min-w-64">
                <img class="w-[100px] h-[100px] rounded-full " style="border:3px groove blue" src="${teacher?.image}" />
                <div>
                  <p class="font-bold text-[1.1rem]">${teacher?.name}</p>
                  <p class="font-semibold text-[0.9rem]">${teacher?.subject}</p>
                </div>
            </div>

            <div class="flex items-center justify-between flex-col w-full">
                <div class="flex justify-center items-center gap-x-1">
                    <p class="text-[1.0rem] font-bold">
                    الصفوف :
                    </p>
                    <p class="text-[0.9rem] font-normal"">
                        ${teacher?.Class?.join(',')}
                    </p>
                </div>

                <p class="text-[0.9rem]">${teacher?.price}  ل.س / الجلسة  </p>
            </div>

            <button onclick="window.selectTeacher('${teacher?._id}')">
                احجز الان
            </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => {
        if (mapInstance.current) {
          mapInstance.current.removeLayer(marker);
        }
      });
    };
  }, [teachers]);

  useEffect(() => {
    window.selectTeacher = (teacherId) => {
      if (onTeacherSelect && localStorage.userToken) {
        onTeacherSelect(teacherId);
      } else {
        toast.warn('يجب عليك تسجيل الدخول اولا')
      }
    };

    return () => {
      delete window.selectTeacher;
    };
  }, [onTeacherSelect]);

  return <div ref={mapRef} className="w-full h-96 rounded  border border-gray-200" />;
};

export default TeacherMap;
