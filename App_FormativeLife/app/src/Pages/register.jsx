import { useState } from "react";
//import Form from "../components/Form"
import logic from "../logic"
import { errors, validate } from "com"

const { ContentError, DuplicityError, RangeError, TypeError } = errors

function Register(props) {

    //Construimos un objecto para guardar el estado de los diferente tipor de errores que recojamos
    // en el formulario para poder ponerlos en el html al lado de su input
    const [error, setError] = useState(null);

    const handleSubmitStudent = event => {

        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const surnames = form.surnames.value;
        const age = parseInt(form.age.value);

        const email = form.email.value;
        const password = form.password.value;

        try{
            logic.registerStudent(name, surnames, age, email, password)
                .then(() => props.onClickLogin())
                .catch(error => {
                    errorHandler(error)
                })

        }
        catch(error){
            errorHandler(error)
        }
    }

    //TODO
    const handleSubmitCompany = event => {

        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const address = form.address.value;
        const activity = form.activity.value;
        const email = form.email.value;
        const password = form.password.value;

        try{
            logic.registerCompany(name, address, activity, email, password)
                .then(() => props.onClickLogin())
                .catch(error => {
                    errorHandler(error)
                })
        }
        catch(error){
            errorHandler(error)
        }
    }

    //Esta función nos va guardar los tipos de error de cada campo del formulario como propiedad del objeto Error
    const errorHandler = (error) => {
        console.error(error.message)

        let feedback = error.message;

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`;

        else if (error instanceof DuplicityError)
            feedback = `${feedback}, please verify credentials`;

        else
            feedback = "Sorry, there was an error, please try again later";

        const isNameError = error.message.includes('name')
        const isSurnamesError = error.message.includes('surnames')
        const isAgeError = error.message.includes("age")
        const isEmailError = error.message.includes("email")
        const isPasswordError = error.message.includes("password")
        const isActivityError = error.message.includes("activity")
        const isAddressError = error.message.includes("address")

        setError({ message: feedback, isNameError, isSurnamesError, isAgeError, isEmailError, isPasswordError, isActivityError, isAddressError });
    }


    return (
    <>
        <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-40 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
            <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" onClick={props.onClickInicio}>FormativeLife</div>
            <div className="float-right mx-[10%] text-3xl"><i>Crea ya tu perfil profesional !!</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>
            
        </header>
        <main className="my-4 mx-[2%] w-[100%] flex-auto">
            <container className="my-4 m-l-[2%] m-r-[2%] p-8 font-serif text-lg w-[79%] h-auto">
                <section className="flex-auto">
                <h2 className="text-3xl font-mono font-extrabold text-center">Regístrate</h2><br/>
                    <form className="float-right text-xl" onSubmit={ handleSubmitStudent }>
                        <label className="font-extrabold" htmlFor="name">Nombre: </label>
                        <input className="myborder-solid border-2 bg-white border-black mx-2 p-2" type="text" id="name" placeholder="" required /><br/><br/>
                        {/* {error?.isNameError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label className="font-extrabold" htmlFor="surnames">Apellidos: </label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="text" id="surnames" placeholder="" required /><br/><br/>
                        {/* {error?.isSurnamesError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label className="font-extrabold" htmlFor="age">Edad: </label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="text" id="age" placeholder="Debe ser mayor de 16" required /><br/><br/>{error?.isAgeError && <span className="text-red-500">{error.message}</span>}<br/>

                        <label className="font-extrabold" htmlFor="email">Correo electrónico: </label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="text" id="email" placeholder="" required /><br/><br/>
                        {/* {error?.isEmailError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label className="font-extrabold" htmlFor="password">Contraseña: </label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="password" id="password" placeholder="Entre 8 y 16 caracteres" required /><br/><br/>
                        {/* {error?.isPasswordError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <button className="p-2 border-solid border-black border-2 rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" type="submit">Registrarse como estudiante</button>
                    </form>

                    <form className="float-left text-xl" onSubmit={ handleSubmitCompany }>
                        <label className="font-extrabold" htmlFor="name">Nombre: </label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="text" id="name" placeholder="" required /><br/><br/>
                        {/* {error?.isNameError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label className="font-extrabold" htmlFor="address">Ubicación: </label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="text" id="address" placeholder="Calle Real, N20 - Coruña" required /><br/><br/>
                        {error?.isAddressError && <span className="text-red-500">{error.message}</span>}<br/>

                        <label className="font-extrabold" htmlFor="activity">Actividad: </label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="text" id="activity" placeholder="Diseño Web" required /><br/><br/>
                        {/* {error?.isActivityError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label className="font-extrabold" htmlFor="email">Correo electrónico: </label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="text" id="email" placeholder="" required /><br/><br/>
                        {/* {error?.isEmailError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <label className="font-extrabold" htmlFor="password">Contraseña: </label>
                        <input className="border-solid border-2 bg-white border-black mx-2 p-2" type="password" id="password" placeholder="Entre 8 y 16 caracteres" required /><br/><br/>
                        {/* {error?.isPasswordError && <span className="text-red-500">{error.message}</span>}<br/> */}

                        <button className="p-2 border-solid border-black border-2 rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" type="submit">Registrarse como empresa</button>
                    </form>

                </section>
                    {/* <button onClick={ FormStudent() }>Registrarse como Estudiante</button> */}
                    {/* <button onClick={ FormCompany() }>Registrarse como Empresa</button> */} 
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default Register;