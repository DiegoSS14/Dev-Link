
import { Link } from 'react-router'

export function Error() {
    return (
        <div className='flex flex-col w-full h-screen items-center justify-center'>
            <h1 className='text-blue-600 font-bold text-8xl mb-2'>
                404
            </h1>
            <h1 className='text-blue-600 font-bold text-3xl mb-2'>
                Página não encontrada!
            </h1>
            <span className='text-white mb-6'>
                Você caiu em uma página que não existe.
            </span>

            <Link
                to='/'
                className='text-white bg-gray-50/20 py-1 px-4 rounded-md'
            >
                Ir para a página principal
            </Link>
        </div>
    )
}