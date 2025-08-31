
const BookingsStat = ({ bookings }) => {
    return (
        <div className="mt-8 bg-primary bg-opacity-5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-white text-center">ملخص الحجوزات القادمة</h3>
            <div className="grid md:grid-cols-3 gap-4">
                <div style={{
                    borderLeft: '2px solid white'
                }} className="text-center" >
                    <div className="text-2xl font-bold text-white">
                        {bookings.length}
                    </div>
                    <div className="text-white text-sm">درس قادم</div>
                </div>
                <div style={{
                    borderLeft: '2px solid white'
                }} className="text-center ">
                    <div className="text-2xl font-bold text-white">
                        {bookings.reduce((sum, booking) => sum + booking.price, 0).toLocaleString()}
                    </div>
                    <div className="text-white text-sm">ل.س - إجمالي التكلفة</div>
                </div>
                <div className="text-center ">
                    <div className="text-2xl font-bold text-white">
                        {new Set(bookings.map(b => b.subject)).size}
                    </div>
                    <div className="text-white text-sm">مادة مختلفة</div>
                </div>
            </div>
        </div>
    )
}

export default BookingsStat