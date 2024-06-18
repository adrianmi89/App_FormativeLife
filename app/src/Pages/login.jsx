import { useState } from "react"
import logic from "../logic"
import { errors, validate} from "com"

const { SystemError, MatchError, ContentError} = errors;

function Login({onUserLoggedIn, onClickResetPassword, onClickInicio}) {

    const [error, setError] = useState(null);

    const handleSubmit = event => {

        event.preventDefault();
        const form = event.target;

        const email = form.user.value;
        const password = form.password.value;
       
        try{
            logic.loginUser(email, password)
                .then(() => onUserLoggedIn())
                .catch(error => {
                    errorHandler(error);
                })
        }
        catch(error){
            errorHandler(error);
        }
    }

    const errorHandler = (error) => {
        console.error(error.message)

        let feedback = error.message;

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, por favor corrige eso.`;

        else if (error instanceof MatchError)
            feedback = `${feedback}, pon unas credenciales válidas.`;

        else{
            feedback = "Lo sentimos, ha habido un error, inténtalo de nuevo más tarde.";
            alert(feedback)
        }
            

        const isUserError = error.message.includes("email");
        const isPasswordError = error.message.includes("password");

        setError({ message: feedback, isUserError, isPasswordError })
    }

    return (
    <>
        <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-40 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
            <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" onClick={onClickInicio}>FormativeLife</div>
            <div className="float-right mx-[10%] text-3xl"><i>Tu red de contactos haciendo Match</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>
        </header>
        <main className="my-4 mx-[30%] w-[20%] flex-auto">
            <container className="my-4 m-l-[2%] m-r-[2%] p-8 font-serif text-lg h-auto">
                <section className="flex-auto">
                <h2 className="text-3xl font-mono font-extrabold">Inicia Sesión</h2><br/>
                    <form className="text-xl" onSubmit={handleSubmit}>
                        <label className="font-extrabold" htmlFor="user">Usuario:</label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="text" id="user" placeholder="Tu email"/><br/>
                        {error?.isUserError && <span className="text-red-500">{error.message}</span>}<br/>

                        <label className="font-extrabold" htmlFor="password">Contraseña</label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="password" id="password" placeholder="Contraseña"/><br/>
                        {error?.isPasswordError && <span className="text-red-500">{error.message}</span>}<br/><br/>

                        <button className="p-2 border-solid border-2 border-black rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" type="submit">Iniciar Sesion</button><br/><br/>
                    </form>

                </section>
            </container>
        </main>
        <footer>
            <button className="mx-2 p-2 border-solid border-2 border-black rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={onClickInicio}>Volver</button>
        </footer>
    </>
    )
}

export default Login;