
import { useState, useEffect, type FormEvent } from 'react'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { FiTrash2 } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import {
    addDoc,
    onSnapshot,
    collection,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'

interface LinkProps {
    id: string
    name: string
    url: string
    bg: string
    color: string
}

export function Admin() {

    const [urlInput, setUrlInput] = useState('')
    const [linkNameInput, setLinkNameInput] = useState('')
    const [colorBgLink, setColorBgLink] = useState('#51DBD7')
    const [colorLink, setcolorLink] = useState('#00000')

    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, 'links')
        const queryRef = query(linksRef, orderBy('created', 'asc'))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinkProps[];

            snapshot.forEach(doc => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                })
            })
            setLinks(lista)
        })

        return unsub;

    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault()

        if (urlInput === '' || linkNameInput === '') {
            alert('Preencha os campos')
            return;
        }

        addDoc(collection(db, 'links'), {
            name: linkNameInput,
            url: urlInput,
            bg: colorBgLink,
            color: colorLink,
            created: new Date(),
        }).then(() => {
            setLinkNameInput('')
            setUrlInput('')
            console.log('Link cadastrado com sucesso!')
        }).catch(error => {
            console.log('erro ao cadastrar no banco: ' + error)
        })
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, 'links', id)
        await deleteDoc(docRef)
    }

    return (
        <div className='flex flex-col min-h-screen items-center pb-7 px-2'>
            <Header />

            <form
                className='flex flex-col w-full max-w-lg mt-8 gap-2'
                onSubmit={handleRegister}
            >

                <label className='text-white font-medium'>
                    URL do Link
                </label>
                <Input
                    type='url'
                    placeholder='Digite a ULR'
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <label className='text-white font-medium mt-2'>
                    Nome do link
                </label>
                <Input
                    type='text'
                    placeholder='Digite o nome do Link'
                    value={linkNameInput}
                    onChange={(e) => setLinkNameInput(e.target.value)}
                />

                <section className='flex gap-4 mt-2'>
                    <div className='flex items-center gap-2'>
                        <label className='text-white font-medium mt-2'>
                            Cor do fundo
                        </label>
                        <Input
                            type='color'
                            className='w-10 h-8'
                            value={colorBgLink}
                            onChange={e => setColorBgLink(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-white font-medium mt-2'>
                            Cor do link
                        </label>
                        <Input
                            type='color'
                            className='w-10 h-8'
                            value={colorLink}
                            onChange={e => setcolorLink(e.target.value)}
                        />
                    </div>
                </section>

                {linkNameInput !== '' && (
                    <div className='flex flex-col items-center justify-start mb-7 p-1 border-gray-100/25 border-1 rounded'>
                        <label className='text-white font-medium mt-2 mb-3'>
                            Veja como está ficando
                        </label>
                        <article
                            className='w-11/12 max-w-lg items-center justify-between bg-zinc-900 rounded px-2 py-3'
                            style={{ marginBottom: 8, marginTop: 8, background: colorBgLink, }}
                        >
                            <p className='text-center font-medium' style={{ color: colorLink }}>{linkNameInput}</p>
                        </article>
                    </div>
                )}

                <button
                    type='submit'
                    className='w-full h-8 bg-blue-600 text-white rounded cursor-pointer mb-7'
                >Cadastrar</button>
            </form>

            {links.length > 0 && (
                <div className='flex flex-col w-full max-w-lg'>
                    <h2 className='text-2xl font-medium text-white mb-4'>Links</h2>

                    <div className='flex flex-col w-full items-center gap-2'>
                        {links.map((link) => (
                            <article
                                key={link.id}
                                className='flex w-full justify-between items-center px-3 py-3 gap-1 rounded'
                                style={{ background: link.bg, color: link.color }}
                            >
                                <p>{link.name}</p>
                                <button
                                    className='p-1 border border-dashed rounded cursor-pointer'
                                    onClick={() => handleDeleteLink(link.id)}
                                >
                                    <FiTrash2 size={20} />
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            )}


        </div>
    )
}