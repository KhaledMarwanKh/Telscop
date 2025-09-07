import physics from './images/physics.png'
import science from './images/science.png'
import maths from './images/maths.png'
import chm from './images/chemistry.png'
import geo from './images/geography.png'
import hist from './images/history.png'
import ar from './images/books.png'
import en from './images/engllish.png'
import about_image from './images/about_image.jpg'
import header_image_1 from './images/header_image_1.jpg'
import header_image_2 from './images/header_image_2.jpg'
import header_image_3 from './images/header_image_3.png'
import middle_image from './images/middle_image.jpg'


export const subjects = [
    { key: 'arabic', name: 'اللغة العربية', icon: ar },
    { key: 'math', name: 'الرياضيات', icon: maths },
    { key: 'science', name: 'العلوم', icon: science },
    { key: 'english', name: 'اللغة الإنجليزية', icon: en },
    { key: 'history', name: 'التاريخ', icon: hist },
    { key: 'geography', name: 'الجغرافيا', icon: geo },
    { key: 'physics', name: 'الفيزياء', icon: physics },
    { key: 'chemistry', name: 'الكيمياء', icon: chm }
];

export const assets = {
    header_image_1,
    header_image_2,
    header_image_3,
    about_image,
    middle_image
}

export const city = [
    { key: 'homes', name: "حمص" },
];

export const grades = [
    { value: 'all', name: 'جميع الصفوف' },
    { value: '1', name: 'الصف الأول' },
    { value: '2', name: 'الصف الثاني' },
    { value: '3', name: 'الصف الثالث' },
    { value: '4', name: 'الصف الرابع' },
    { value: '5', name: 'الصف الخامس' },
    { value: '6', name: 'الصف السادس' },
    { value: '7', name: 'الصف السابع' },
    { value: '8', name: 'الصف الثامن' },
    { value: '9', name: 'الصف التاسع' }
];

export const timeSlots = [
    { value: '07:00', label: '7:00 ص', id: 0 },
    { value: '08:00', label: '8:00 ص', id: 1 },
    { value: '09:00', label: '9:00 ص', id: 2 },
    { value: '10:00', label: '10:00 ص', id: 3 },
    { value: '11:00', label: '11:00 ص', id: 4 },
    { value: '12:00', label: '12:00 م', id: 5 },
    { value: '13:00', label: '1:00 م', id: 6 },
    { value: '14:00', label: '2:00 م', id: 7 },
    { value: '15:00', label: '3:00 م', id: 8 },
    { value: '16:00', label: '4:00 م', id: 9 },
    { value: '17:00', label: '5:00 م', id: 10 },
    { value: '18:00', label: '6:00 م', id: 11 },
    { value: '19:00', label: '7:00 م', id: 12 },
    { value: '20:00', label: '8:00 م', id: 13 },
    { value: '21:00', label: '9:00 م', id: 14 },
    { value: '22:00', label: '10:00 م', id: 15 }
];


export const daysInArabic = [
    { key: 'sunday', day: 'الاحد', num: 0 },
    { key: 'monday', day: 'الاثنين', num: 1 },
    { key: 'tuesday', day: 'الثلاثاء', num: 2 },
    { key: 'wednesday', day: 'الاربعاء', num: 3 },
    { key: 'thursday', day: 'الخميس', num: 4 },
    { key: 'friday', day: 'الجمعة', num: 5 },
    { key: 'saturday', day: 'السبت', num: 6 }
];

export const homes = [
    { region: "البياضا", translation: "Al-Bayada" },
    { region: "الخالدية", translation: "Al-Khalidiyah" },
    { region: "جورة الشياح", translation: "Joura al-Shiyah" },
    { region: "بابا عمرو", translation: "Baba Amro" },
    { region: "غوطة", translation: "Ghota" },
    { region: "انشاءات", translation: "Insha'at" },
    { region: "وادي الذهب", translation: "Wadi al-Dahab" },
    { region: "كرم الشامي", translation: "Karm al-Shami" },
    { region: "الوعر", translation: "Al-Wa'er" },
    { region: "القصور", translation: "Al-Qusour" },
    { region: "المحطة", translation: "Al-Mahatta" },
    { region: "عكرمة الجديدة", translation: "Akrama al-Jadidah" },
    { region: "عكرمة القديمة", translation: "Akrama al-Qadeemah" },
    { region: "ضاحية الوليد", translation: "Dahiat al-Walid" },
    { region: "المخيم", translation: "Al-Mukhayyam" },
    { region: "الشماس", translation: "Al-Shamas" },
    { region: "الإدخار", translation: "Al-Idkhar" },
    { region: "النزهة", translation: "Al-Nuzha" }
];

export const translateDayToArabic = (day) => {
    return daysInArabic.filter(enDay => enDay.key === day)[0].day;
}

export const getTime = (time) => {
    return timeSlots.filter(t => t.value === time)[0].label;
}

export const getDayKeyByNumber = (dayNum) => {
    if (dayNum > 6 && dayNum < 0) {
        throw new Error("invalid day number");
    }
    return daysInArabic.filter(day => day.num === dayNum)[0].key;
}

export function getNextDayDate(dayName, tar) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const todayIndex = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const targetIndex = daysOfWeek.findIndex(day => day.toLowerCase() === dayName.toLowerCase());

    if (targetIndex === -1) {
        return;
    }

    let daysUntilNext; // Always go forward, even if same day

    if (targetIndex < new Date().getDay()) {
        daysUntilNext = (targetIndex - todayIndex + 7) % 7 || 7;
    } else {
        daysUntilNext = targetIndex - todayIndex
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilNext);
    return nextDate.toLocaleDateString("en-US");
}

export const getRegionKeyByRegionName = (regionName) => {
    const regionKey = homes.filter(region => region.translation === regionName)[0];

    if (regionKey) {
        return regionKey.region;
    } else {
        return "Not Found";
    }
}

export const getSubjectNameByKey = (key) => {
    if (key) {
        return subjects.filter(s => s.key === key)[0].name;
    } else {
        return key;
    }
}

export const getStatusBadge = (status) => {
    const badges = {
        upcoming: { color: 'bg-blue-100 text-blue-800', text: 'قادم' },
        completed: { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
        cancelled: { color: 'bg-red-100 text-red-800', text: 'ملغي' }
    };
    return badges[status] || badges.upcoming;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString).toLocaleDateString("en-US").split("/").reverse();
    date[2] = date[2].length === 1 ? "0" + date[2] : date[2];
    date[1] = date[1].length === 1 ? "0" + date[1] : date[1];
    [date[2], date[1]] = [date[1], date[2]];
    return date.join("-");
}

export const formatTime = (timeString) => {
    const slot = timeSlots.filter(slot => slot.value === timeString)[0];
    return slot ? slot?.label : timeString;
};

export const getDayInArabic = (dayNameInEnglish) => {
    if (dayNameInEnglish) {
        return daysInArabic.filter(dayInfo => dayInfo.key === dayNameInEnglish)[0].day;
    }
}

export const getTimeSlotId = (slot) => {
    const s = timeSlots.filter(s => s.value === slot)[0];
    return s ? s.id : 0;
}

export const getGradeNameByNumber = (gradeNum) => {
    if (gradeNum && gradeNum < 10) {
        return grades.filter(grade => parseInt(grade.value) === gradeNum)[0].name;
    }
}

export const getGeoLocation = async () => {
    try {
        let x = setInterval(
            () => {
                if (navigator.geolocation) {
                    let lat, lng;

                    navigator.geolocation.getCurrentPosition(
                        ({ coords: { latitude, longitude } }) => {
                            lat = latitude;

                            lng = longitude;
                        },
                        (error) => {
                            console.log(error);
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 1000000
                        }
                    );

                    clearInterval(x);

                    return [lng, lat];
                }
            }
            , 500)
    } catch (e) {
        return [];
    }
}