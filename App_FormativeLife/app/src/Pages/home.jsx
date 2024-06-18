import { useState, useEffect } from 'react'
import { errors } from "com"
import logic from '../logic'
import CreateCareer from "../components/CreateCareer"
import CareersStudent from "../components/CareersStudent"
import Button from '../components/Button'

const { ContentError, MatchError } = errors

function Home(props) {

    const [view, setView] = useState(null);
    const [user, setUser] = useState(null);
    const [refreshStamp, setRefreshStamp] = useState(null);

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error.message)

                    let feedback = error.message

                    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                        feedback = `${feedback}, please correct it`
                    else if (error instanceof MatchError)
                        feedback = `${feedback}, please verify user`
                    else
                        feedback = 'sorry, there was an error, please try again later'

                    alert(feedback)
                })
        } catch (error) {
            console.error(error.message)

            let feedback = error.message

            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                feedback = `${feedback}, please correct it`
            else
                feedback = 'sorry, there was an error, please try again later'

            alert(feedback)
        }
    }, [])

    const handleLogout = () => {
        logic.logoutUser()

        props.onClickInicio()
    }

    const handleCreateCareerClick = () => setView('create-career')

    const handleCreateCareerCancelClick = () => setView(null)

    const handleCareerCreated = () => {
        
        setRefreshStamp();
        setView(null)
    }

    const handleDeleteUser = () => {

        alert("Para eliminar tu cuenta de usuario borra todos tus estudios y luego envía un correo al administrador del sitio web desde el menú de Contacto solicitando la eliminar la cuenta.")
    }

    return (
    <>
        <header header className="mx-0 my-0 p-6 flex-auto w-[100%] h-52 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
            <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" onClick={props.onClickInicio}>FormativeLife</div>
            <div className="float-right mx-[10%] text-3xl"><i>Busca o atrae talento</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>
            <div className="m-[0%] float-right w-[30%] border-solid">
                <button className="p-2 border-solid rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={props.onClickInicio}>Página principal 🏚️</button>
                <button className="p-2 m-4 border-solid rounded-md shadow-3xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={handleLogout}>Cerrar Sesión</button>
                <Button className="p-2 bg-red-500 text-white m-2 border-solid border-black" onClick={ handleDeleteUser }>Borrar cuenta</Button>
            </div>
            <div>
                <form className="form">
                    {/* Hacer buscador por area profesional si da tiempo */}
                    <button className="p-2 my-2 mx-20 border-solid rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={props.onClickListarUsers}>Buscar empresas y ver ofertas</button>
                </form>
            </div>
        </header>
        <main className="w-[100%] flex-auto">
            <container className="my-4 p-8 font-serif text-lg w-[95%] h-auto">
                <section>
                    {!user && <p className="p-3">Loading...</p>}
                    {user && 
                    <>
                        <h1 className="text-3xl font-bold">{user.name} {user.surnames}</h1><br/>
                        <h2 className="text-xl"><span className="font-extrabold">Edad:</span> {user.age}</h2>
                        <h2 className="text-xl"><span className="font-extrabold">Correo:</span> {user.email}</h2>
                    </>
                    }
                    
                </section>
                <section>
                    <div className="mr-40">
                        <button className="button m-4" onClick={ handleCreateCareerClick }>Añadir estudios ➕</button>
                    </div>
                    <CareersStudent targetUserId={logic.getLoggedInUserId()} refreshStamp={ refreshStamp }/>
                </section>

            {view === 'create-career' && <CreateCareer onCancelClick={handleCreateCareerCancelClick} onCreateCareer={handleCareerCreated}/>}
            </container>
        </main>
        <footer className="footer">
            
        </footer>
    </>
    )
}

export default Home;