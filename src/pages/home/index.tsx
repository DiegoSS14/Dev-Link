import { Social } from '../../components/Social';

import { FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa';

import { db } from '../../services/firebaseConnection'
import {
    doc,
    collection,
    getDoc,
    getDocs,
    orderBy,
    query
} from 'firebase/firestore'
import { useEffect, useState } from 'react';

interface LinkProps {
    id: string
    name: string
    url: string
    bg: string
    color: string
}

interface SocialLinkProps {
    linkedin: string,
    youtube: string,
    instagram: string,
}

export function Home() {
    const [links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinkProps>()

    useEffect(() => {
        const linksRef = collection(db, 'links')
        const queryRef = query(linksRef, orderBy('created', 'asc'))
        getDocs(queryRef)
            .then((snapshot) => {
                let lista = [] as LinkProps[]

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })

                setLinks(lista)
            })

    }, [])

    useEffect(() => {
        const docRef = doc(db, 'social', 'link')
        getDoc(docRef).then((snapshot) => {
            if (snapshot.data() !== undefined) {
                setSocialLinks({
                    linkedin: snapshot.data()?.linkedin,
                    youtube: snapshot.data()?.youtube,
                    instagram: snapshot.data()?.instagram,
                })
            }
        })
    })

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white">Diego Sousa</h1>
            <span className="text-white font-medium mt-7 mb-4">Veja meus links 👇🏽</span>

            <main className="flex flex-col w-11/12 max-w-2xl text-center gap-2">
                <div className='flex flex-col gap-2'>
                    {links.length > 0 && (
                        links.map(link => (
                            <section
                                className="w-full h-9 py-1 rounded-lg transition-transform hover:scale-102"
                                style={{ backgroundColor: link.bg }}
                                key={link.id}
                            >
                                <a href={link.url} target='blank'>
                                    <p
                                        className="text-base md-text-lg cursor-pointer"
                                        style={{ color: link.color }}
                                    >
                                        {link.name}
                                    </p>
                                </a>
                            </section>
                        ))
                    )}
                </div>

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                        <Social url={socialLinks?.linkedin}>
                            <FaLinkedin size={35} color='#fff' />
                        </Social>
                        <Social url={socialLinks.youtube}>
                            <FaYoutube size={35} color='#fff' />
                        </Social>
                        <Social url={socialLinks.instagram}>
                            <FaInstagram size={35} color='#fff' />
                        </Social>
                    </footer>
                )}
            </main>

        </div>
    )
}