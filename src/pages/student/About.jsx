import { FiTarget, FiHeart, FiUsers, FiAward } from 'react-icons/fi';
import about_image from '../../data/images/about_image.jpg'

const About = () => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-lg  p-8 relative">
        <div className='mr-[-200px] w-[100%] h-[600px] p-3 rounded-[20px] absolute z-[-1] left-[50%] translate-x-[-50%] flex flex-col items-center justify-center' style={
          {
            backgroundImage: `url("${about_image}")`,
            backgroundSize: '100% 100%',
            boxShadow: '600px 600px 10px 0 rgba(0,0,0,0.5) inset'
          }
        }>
          <h1 className="text-3xl text-center font-bold mb-8 text-white">من نحن</h1>

          <p className="text-[1.2rem] md:text-[1.6rem] text-white text-center white mb-6 leading-relaxed">
            تليسكوب منصة إلكترونية مصممة لدعم وتسهيل عملية حجز دروس خصوصية لطلاب التعليم الاساسي في الجمهورية العربية السورية. يهدف الموقع إلى توفير وسيلة سهلة وفعّالة للطلاب وأولياء أمورهم للتواصل مع معلمين مؤهلين، وتنظيم جداول الدروس، والحصول على الدعم الأكاديمي بسهولة.

          </p>
        </div>
        <div className="w-[100%] flex gap-x-3 max-w-none mt-[500px]  flex-col items-center md:flex-row md:items-stretch md:justify-center ">
          {/* Vision */}
          <div className="w-[95%] md:w-[30%] bg-primary bg-opacity-5 px-6 py-3 rounded-lg mb-8 hover:translate-y-[-20px] transition-all duration-500 cursor-pointer">
            <div className="flex items-center justify-center flex-col mb-2">
              <FiTarget className="w-[50px] h-[50px] text-white mb-2" />
              <h2 className="text-2xl font-bold text-white">رؤيتنا</h2>
            </div>
            <p className="text-white text-justify leading-relaxed text-[1.3rem]">
              نسعى لأن نكون الجسر الذي يربط بين الطلاب الطموحين والمعلمين المؤهلين، لنساهم في بناء
              جيل متعلم ومتميز يواكب التطورات التعليمية الحديثة ويحقق أحلامه الأكاديمية.
            </p>
          </div>

          {/* Mission */}
          <div className="w-[95%] md:w-[30%] bg-secondary bg-opacity-5 px-6 py-3 rounded-lg mb-8 hover:translate-y-[-20px] transition-all duration-500 cursor-pointer">
            <div className="flex items-center justify-center flex-col mb-2">
              <FiHeart className="w-[50px] h-[50px] text-white mb-2" />
              <h2 className="text-2xl font-bold text-white">مهمتنا</h2>
            </div>
            <p className="text-white text-justify leading-relaxed text-[1.3rem]">
              توفير منصة سهلة وآمنة تمكن الطلاب وأولياء أمورهم من العثور على أفضل المعلمين المؤهلين،
              وتنظيم جداول الدروس بسهولة، ومتابعة التقدم الأكاديمي في بيئة تعليمية محفزة ومناسبة.
            </p>
          </div>

          {/* Commitment */}
          <div className="w-[95%] md:w-[30%] bg-accent bg-opacity-5 px-6 py-3 rounded-lg mb-8 hover:translate-y-[-20px] transition-all duration-500 cursor-pointer">
            <div className="flex items-center justify-center flex-col mb-2">
              <FiAward className="w-[50px] h-[50px] text-white mb-2" />
              <h2 className="text-2xl font-bold text-white">التزامنا</h2>
            </div>
            <p className="text-white text-justify leading-relaxed text-[1.3rem]">
              نلتزم بتوفير تجربة تعليمية متميزة تضع الطالب في المقدمة، مع الحرص على جودة التعليم
              وسلامة البيئة التعليمية. نؤمن بأن التعليم حق لكل طفل، ونعمل جاهدين لجعل الدروس
              الخصوصية متاحة وفعالة لجميع الطلاب في محافظة حمص.
            </p>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <FiUsers className="w-8 h-8 text-black" />
          <h2 className="text-2xl font-bold text-gray-800">ما نقدمه</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">🎓 معلمون مؤهلون</h3>
            <p className="text-gray-600 text-sm">شبكة واسعة من المعلمين المؤهلين والمعتمدين</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">📅 نظام حجز مرن</h3>
            <p className="text-gray-600 text-sm">نظام حجز سهل ومرن يناسب جميع الأوقات</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">🗺️ خريطة تفاعلية</h3>
            <p className="text-gray-600 text-sm">خريطة تفاعلية لإيجاد أقرب المعلمين</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">📊 متابعة التقدم</h3>
            <p className="text-gray-600 text-sm">متابعة دقيقة للتقدم الأكاديمي</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">💰 أسعار تنافسية</h3>
            <p className="text-gray-600 text-sm">أسعار تنافسية وشفافة لجميع الخدمات</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">🛠️ دعم فني</h3>
            <p className="text-gray-600 text-sm">دعم فني متواصل لحل جميع المشاكل</p>
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6 bg-primary bg-opacity-5 rounded-lg">
          <div className="text-3xl font-bold text-white mb-2">50+</div>
          <div className="text-white">معلم مؤهل</div>
        </div>
        <div className="text-center p-6 bg-secondary bg-opacity-5 rounded-lg">
          <div className="text-3xl font-bold text-white mb-2">1000+</div>
          <div className="text-white">طالب مسجل</div>
        </div>
        <div className="text-center p-6 bg-accent bg-opacity-5 rounded-lg">
          <div className="text-3xl font-bold text-white mb-2">5000+</div>
          <div className="text-white">درس مكتمل</div>
        </div>
      </div>
    </div>
  );
};

export default About;
