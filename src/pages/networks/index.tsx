import { useEffect, useState, type FormEvent } from "react"
import { Header } from "../../components/Header"
import { Input } from '../../components/Input'

import { db } from '../../services/firebaseConnection'
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore'

export function Networks() {
    const [linkedin, setLinkedin] = useState('')
    const [youtube, setYoutube] = useState('')
    const [instagram, setInstagram] = useState('')

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, 'social', 'link')

            getDoc(docRef).then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setLinkedin(snapshot.data()?.linkedin)
                    setYoutube(snapshot.data()?.youtube)
                    setInstagram(snapshot.data()?.instagram)
                }
            }).catch((error) => {
                console.log('Erro: ' + error);
            })
        }

        loadLinks()
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        setDoc(doc(db, 'social','link'), {
            linkedin: linkedin,
            youtube: youtube,
            instagram: instagram
        }).then(() => {
            console.log('Cadastrado com sucesso!')
        }).catch(error => {
            console.log('Não foi possível realizar o cadastro: ' + error);
        })
    }

    return (
        <div className="flex flex-col items-center">
            <Header />

            <h1 className="text-white font-semibold text-2xl pt-7 pb-4">
                Minhas redes sociais
            </h1>

            <form
                className="flex flex-col w-11/12 max-w-xl gap-2"
                onSubmit={handleRegister}
            >
                <label className="text-white font-semibold pt-2">
                    Meu Linkedin
                </label>
                <Input
                    type="url"
                    placeholder="Digite a url do seu Linkedin"
                    value={linkedin}
                    onChange={e => setLinkedin(e.target.value)}
                />
                <label className="text-white font-semibold pt-2">
                    Meu YouTube
                </label>
                <Input
                    type="url"
                    placeholder="Digite a url do seu YouTube"
                    value={youtube}
                    onChange={e => setYoutube(e.target.value)}
                />
                <label className="text-white font-semibold pt-2">
                    Meu Instagram
                </label>
                <Input
                    type="url"
                    placeholder="Digite a url do seu Instagram"
                    value={instagram}
                    onChange={e => setInstagram(e.target.value)}
                />

                <button
                    className="w-full h-9 bg-blue-600 text-white font-medium rounded-md mt-2 cursor-pointer"
                    type="submit"
                >Cadastrar</button>
            </form>
        </div>
    )
}