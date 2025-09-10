
import { auth } from '../services/firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, type ReactNode } from 'react';

import { Navigate } from 'react-router';

interface PrivateProps {
    children: ReactNode
}

export function Private({ children }: PrivateProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [signed, setSigned] = useState<boolean>(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const usuario = {
                    uid: user?.uid,
                    email: user?.email
                }
                localStorage.setItem('reactLinks', JSON.stringify(usuario))
                setSigned(true)
                setLoading(false)
            } else {
                setLoading(false)
                setSigned(false)
            }

            unsub();
        })
    }, [])

    if (loading) {
        return <div></div>
    }

    if (!signed) {
        return <Navigate to='/login' />
    }

    return (
        children
    );
}