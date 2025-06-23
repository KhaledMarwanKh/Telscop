import { Link, useNavigate } from 'react-router-dom'
import { subjects } from '../../../data/mockData'
import middle_image from '../../../data/images/middle_image.jpg'

const SubjectPanel = () => {
    const navigate = useNavigate()

    return (
        <section style={
            {
                backgroundImage: `url("${middle_image}")`,
                backgroundSize: '100% 100%',
                backgroundAttachment: 'fixed'
            }
        } className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 style={
                    {
                        textShadow: '0 0 10px orange'
                    }
                } className="text-4xl font-bold text-center mb-12 text-accent">
                    المواد الدراسية المتاحة
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {subjects.map((subject) => (
                        <Link
                            onClick={() => {
                                navigate('/teachers')
                                localStorage.setItem('filter', subject.key)
                                window.scrollTo(0, 0);
                            }}
                            key={subject.key}
                            className="flex items-center flex-col bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center group cursor-pointer"
                        >
                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                                <img src={subject.icon} className='w-[60px]' alt="" />
                            </div>
                            <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SubjectPanel