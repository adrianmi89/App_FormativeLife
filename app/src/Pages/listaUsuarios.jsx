import logic from "../logic";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from '../components/Button'


function ListaUsuarios(props) {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const role = logic.getLoggedInUserRole();
    const id = logic.getLoggedInUserId();

    useEffect(() => {

        const listaUsuarios = async () => {
            try {

                const users = await logic.retrieveUsers();
                //Filtramos por role para que nos muestre los usuarión según lo que se quiera consultar.
                //En este caso como solo tenemos dos tipos de usuario nos llegaría con decir que el rol
                //tiene que ser distinto al nuestro.
                const tipoUsers = users.filter(user => user.role !== role);
                setUsers(tipoUsers);

            } catch (error) {
                console.error(error.message)

                let feedback = error.message

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    feedback = `${feedback}, please correct it`
                else
                    feedback = 'sorry, there was an error, please try again later'

                alert(feedback)
            }
            finally {
                setLoading(false);
            }
        }

        listaUsuarios();
    }, [])

    if (loading) {
        return <p className="p-3">Loading...</p>;
    }

    if (error) {
        return <p className="p-3">{error}</p>;
    }

    return (
        <>
            <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-40 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
                <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" onClick={props.onClickInicio}>FormativeLife</div>
                <div className="float-right mx-[10%] text-3xl"><i>Lista de Usuarios</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>

                <Button className="m-[0%] float-right w-[30%] border-solid rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={props.onUserLoggedIn}>Volver a tu perfil</Button>
            </header>
            <main className="w-[100%] flex-auto">
                <container className="my-4 m-l-[5%] m-r-[5%] p-8 font-serif text-lg w-[90%] h-auto">
                    <section>
                        {
                            role == "student" ?
                           
                                <>
                                    <h2 className="text-xl font-bold text-center">Lista de empresas tech</h2>
                                    <ul>

                                        {
                                            users.map(user => (

                                                    <li key={user.id} className="text-lg font-bold p-4">
                                                    <Link to={`/profile/${user.id}`}>{user.name}</Link>
                                                </li>
                                                
                                            ))   
                                        }
                                        
                                    </ul>
                                </>
                                :
                                <>
                                    <h2 className="text-xl font-bold text-center">Lista de estudiantes</h2>
                                    <ul>
                                        
                                        {
                                            users.map(user => (

                                                <li key={user.id} className="text-lg font-bold p-4">
                                                    <Link to={`/profile/${user.id}`}>{user.name} {user.surnames}</Link>
                                                </li>
                                            ))
                                        }

                                    </ul>
                                </>
                        }
                    </section>
                </container>
            </main>
            <footer>

            </footer>
        </>
    )
}

export default ListaUsuarios;
