import { useState, useEffect } from 'react'
import { errors } from "com"
import logic from '../logic'
import CreateOffer from "../components/CreateOffer"
import OffersCompany from "../components/OffersCompany"
import Button from '../components/Button'
import ButtonEditProfile from '../components/ButtonEditProfile'
import CalendarOffers from '../components/CalendarOffers'

const { ContentError, MatchError } = errors

function HomeEmpresa(props) {

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

    const handleCreateOfferClick = () => setView('create-offer')

    const handleCreateOfferCancelClick = () => setView(null)

    const handleOfferCreated = () => {
        
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
                <ButtonEditProfile onClick={ handleDeleteUser }>Borrar cuenta</ButtonEditProfile>
                
            </div>
            <div id="area-buscador">
                {/* Hacer buscador por area profesional si da tiempo */}
                <form className="form">
                    <Button onClick={props.onClickListarUsers}>Buscar estudiantes</Button>
                </form>
            </div>
        </header>
        <main className="m-4 w-[100%] flex-auto">
            <container className="my-4 p-8  font-serif text-lg w-[95%] h-auto">
                    <section>
                        {!user && <p className="p-3">Loading...</p>}
                        {user && 
                        <>
                            <div className='m-8 w-full flex space-x-[30%]'>
                                <div className='float-left'>
                                    <h1 className="text-3xl font-bold">Admin de {user.name}</h1><br/>
                                    <h2 className="text-xl "><span className="font-extrabold">Actividad:</span> {user.activity}</h2>
                                    <h2 className="text-xl "><span className="font-extrabold">Ubicación:</span> {user.address}</h2>
                                    <h2 className="text-xl "><span className="font-extrabold">Correo:</span> {user.email}</h2>
                                    <div>
                                        <Button onClick={ handleCreateOfferClick }>Añadir oferta ➕</Button>
                                    </div>
                                </div>
                                <div className="float-right mr-40">
                                    <h2 className="text-3xl font-extrabold">Mi agenda de Entrevitas</h2>
                                    {/* <calendar-date>
                                        <calendar-month></calendar-month>
                                    </calendar-date> */}
                                </div>
                            </div>
                        </>
                        }

                    </section>
                    <section>
                    
                    <OffersCompany targetUserId={logic.getLoggedInUserId()} refreshStamp={ refreshStamp }/>
                </section>

            {view === 'create-offer' && <CreateOffer onCancelClick={handleCreateOfferCancelClick} onCreateOffer={handleOfferCreated} />}
            </container>
        </main>
        <footer className="footer">
            
        </footer>
    </>
    )
}

export default HomeEmpresa;