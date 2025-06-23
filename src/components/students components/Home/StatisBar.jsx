
const StatisBar = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div className="border-l-2 border-l-blue-600 p-6">
                        <div className="text-4xl font-bold text-primary mb-2">50+</div>
                        <div className="text-gray-600">معلم مؤهل</div>
                    </div>
                    <div className="border-l-2 border-l-blue-600 p-6">
                        <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                        <div className="text-gray-600">طالب مسجل</div>
                    </div>
                    <div className="border-l-2 border-l-blue-600 p-6">
                        <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                        <div className="text-gray-600">درس مكتمل</div>
                    </div>
                    <div className="p-6">
                        <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                        <div className="text-gray-600">تقييم المنصة</div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default StatisBar