import { Link, useRouteError } from 'react-router-dom'

const ErrPage = () => {
    const error = useRouteError();
    return (
        <div className='w-full h-[100vh] flex flex-col gap-10 items-center justify-center'>
            <div className="rounded w-[300px] h-[300px] flex flex-col gap-10 items-center justify-center py-3 px-2 bg-white shadow-lg">
                <p className='text-2xl font-bold'>ERROR 500</p>
                <Link className='px-10 py-4 bg-primary font-semibold text-white rounded-full' to={'/'}>
                    العودة الى الصفحة الرئيسية
                </Link>
            </div>
        </div>
    )
}

export default ErrPage