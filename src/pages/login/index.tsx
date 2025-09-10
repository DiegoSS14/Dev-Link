import { Link } from 'react-router'
import { Input } from '../../components/Input'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        if(email === '' || password === '') {
            alert('Preencha todos os campos!');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log('USUÁRIO LOGADO COM SUCESSO!')
            navigate('/admin', {replace: true});
        }).catch((error) => {
            console.log('Erro ao tentar fazer login:')
            console.log(error);
        })
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <Link to='/'>
                <h1 className='mt-1 text-white font-bold text-5xl mb-6'>
                    Dev
                    <span className='bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent'>
                        Link
                    </span>
                </h1>
            </Link>

            <form
                className='w-full max-w-xl flex flex-col px-4 gap-2'
                onSubmit={handleSubmit}
            >
                <Input
                    placeholder='Digite o seu e-mail'
                    value={email}
                    onChange={e => { setEmail(e.target.value) }}
                />

                <Input
                    placeholder='********'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    className='h-9 bg-blue-600 rounded text-white font-medium cursor-pointer hover:bg-blue-700 transition duration-300'
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}