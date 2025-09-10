
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router'

import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'

export function Header() {

    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <header className='w-full max-w-2xl mt-4 px-1'>
            <nav className='w-full h-12 flex justify-between items-center bg-white px-4 rounded-md'>
                <div className='flex gap-4 font-medium'>
                    <Link to='/'>
                        Home
                    </Link>

                    <Link to='/admin'>
                        Links
                    </Link>

                    <Link to='/admin/social'>
                        Redes Sociais
                    </Link>
                </div>

                <button
                    onClick={handleLogout}
                    className='cursor-pointer'
                >
                    <BiLogOut size={28} color='#db2629' />
                </button>
            </nav>
        </header>
    )
}