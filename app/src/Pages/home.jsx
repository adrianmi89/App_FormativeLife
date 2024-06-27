import { useState, useEffect } from 'react'
import { errors } from "com"
import logic from '../logic'
import CreateCareer from "../components/CreateCareer"
import CareersStudent from "../components/CareersStudent"
import Button from '../components/Button'
import ButtonEditProfile from '../components/ButtonEditProfile'
import CalendarOffers from '../components/CalendarOffers'

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
        <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-52 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
            <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" onClick={props.onClickInicio}>FormativeLife</div>
            <div className="float-right mx-[10%] text-3xl"><i>Busca o atrae talento</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>
            <div className="m-[0%] float-right w-[30%] border-solid">
                <Button onClick={props.onClickInicio}>Página principal 🏚️</Button>
                <Button onClick={handleLogout}>Cerrar Sesión</Button>
                <ButtonEditProfile className="bg-red-500" onClick={ handleDeleteUser }>Borrar cuenta</ButtonEditProfile>
            </div>
            <div>
                <form className="form">
                    {/* Hacer buscador por area profesional si da tiempo */}
                    <Button className="p-2 my-2 mx-20 border-solid rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={props.onClickListarUsers}>Buscar empresas y ver ofertas</Button>
                </form>
            </div>
        </header>
        <main className="w-[100%] flex-auto">
            <container className="mx-4 my-4 p-8 font-serif text-lg w-[95%] h-auto">
                <section>
                    {!user && <p className="p-3">Loading...</p>}
                    {user && 
                    <>
                        <div className='m-8 w-full flex space-x-[30%]'>
                            <div className='float-left'>
                                <h1 className="text-3xl font-bold">{user.name} {user.surnames}</h1><br/>
                                <h2 className="text-xl"><span className="font-extrabold">Edad:</span> {user.age}</h2>
                                <h2 className="text-xl"><span className="font-extrabold">Correo:</span> {user.email}</h2>
                                <div>
                                    <Button className="button m-4" onClick={ handleCreateCareerClick }>Añadir estudios ➕</Button>
                                </div>
                            </div>
                            
                            <div className="float-right mr-40">
                                <h2 className="text-3xl font-extrabold">Mi Agenda de Eventos</h2>
                                {/* <calendar-date>
                                    <calendar-month></calendar-month>
                                </calendar-date> */}
                            </div>
                        </div>
                    </>
                    }
                    
                </section>
                <section>
                    <form action="localhost:8989/images/single" encType="multipart/form-data" method="post">
                        <input type="file" name="photos" id="photos" single="true" />
                        <input type="submit" value="Enviar" />
                    </form>
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