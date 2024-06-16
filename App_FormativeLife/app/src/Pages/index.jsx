import logic from "../logic";
import { errors, validate } from "com"

const { SystemError } = errors;

//TODO Componetizar los botones, el main, el container y el aside
function Inicio({ onClickLogin , onClickRegister, onClickParaQuienEs, onClickTutorial, onClickContacto, onClickListarUsers}) {

    const handleClickUserLogin = () => {
      
        onClickLogin();
    } 

    const handleClickUserRegister = () => {

        onClickRegister();
    }

    const handleClickParaQuienEs = () => {

        onClickParaQuienEs();
    }

    const handleClickTutorial = () => {

        onClickTutorial();
    }

    const handleClickContacto = () => {

        onClickContacto();
    }

    const handleClickListarUsers = () => {

        onClickListarUsers();
    }
        
    return (
    <>
        <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-40 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
            <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal">FormativeLife</div>
            <div className="float-right mx-[10%] text-3xl"><i>Busca o atrae talento</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>

            <div className="m-[0%] float-right w-[30%] border-solid">
                <button className="p-2 border-solid rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={handleClickUserLogin}>Iniciar Sesión</button>
                <button className="p-2 m-4 border-solid rounded-md shadow-3xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={handleClickUserRegister}>Crear cuenta</button>
                {/* {
                    !logic.isUserLoggedIn && 
                    <>
                    <button className="login" onClick={handleClickUserLogin}>Iniciar Sesión</button>
                    <button className="register" onClick={handleClickUserRegister}>Crear cuenta</button>
                    </>
                }
                {
                    logic.isUserLoggedIn && <button className="buscar" ><a href="/home">Volver a tu perfil</a></button>
                } */}
            </div><br/><br/>
            {/* <div id="area-perfil mt-10">
                Usuarios registrados: 
            </div> */}
        </header>
        <main className="w-[100%] flex-auto">
            <aside className="float-left p-4 mx-1 my-4 w-[20%] h-auto border-l-0 border-t-0 border-r-8 border-b-8 border-solid border-black rounded-xl shadow-2xl bg-blue-400 text-justify text-xl font-bold">
                <nav>
                    <ul className="space-y-4">
                        <li>Inicio</li>
                        <li className="cursor-pointer hover:text-3xl" onClick={handleClickParaQuienEs}>¿Para quien es?</li>
                        <li className="cursor-pointer hover:text-3xl" onClick={handleClickTutorial}>Tutorial de uso</li>
                        <li className="cursor-pointer hover:text-3xl" onClick={handleClickContacto}>Contacto</li>
                    </ul>
                </nav>
            </aside>
            <container className="float-right my-4 m-l-[2%] m-r-[2%] p-8 border-2 border-solid border-black rounded-md font-serif text-lg w-[79%] h-auto">
                <section>
                    <h2>Estudiante de último año contactando con su primera empresa.</h2><br/>
                    <img width="300px" height="300px" src="https://www.infoautonomos.com/wp-content/uploads/2016/11/man-875702_640-640x433.jpg"/>
                    <p className="p-3">Una primera toma de contacto del estudiante con la empresa es crucial para que tanto el estudiante y el empresario con los mismos valores puedan conocerse y ser productivos para llevar un negocio al éxito.</p>
                    <p className="p-3">Y eso se consigue de una forma más productiva cuando se tiene experiencia en el sector. ¿Pero que pasa cuando no tienes experiencia laboral?.<br/>En un mundo laboral en donde ya la experiencia que tengas en 
                    cualquier trabajo le gana por golada a los títulos y a la formación que puedas adquirir aprendiendo, ya sea de forma autodidacta o aprendiendo de los mejores, tener una primera oportunidad laboral es importantísimo para que los
                    que no paran de aprender vean que todo su esfuerzo da resultados y los motiven a aprender más para ser cada vez más útiles a las empresas.</p>                    
                    <img width="300px" height="300px" src="https://adrianmi.info/images/EmpleoNotFound.png"/>
                    Este chiste que me encontré en Linkedin hay que tomárselo con humor, pero nada más lejos de la realidad. Es es día a día de los que tenemos formación y nadie quiere apostar por nosotros por no tener experiencia. Y es que si nadie
                    te da la oportunidad de demostrar lo que vales nunca puedes conseguir la experiencia que tanto se pide en las empresas.<p>En Linkedin es facil que una semana nos encontremos "has aparecido en x búsquedas esta semana!". El
                    algoritmo hace su trabajo, sí, pero ese dato no nos sirve de nada si luego solicitamos un puesto en esa empresa y siempre recibimos la respuesta predeterminada que se da para quienes destacan automáticamente ese perfil. Da igual que te 
                    digan "tu perfil se ajusta un 80% a ese puesto", que si no tienes experiencia demostrable nunca se van fijar en tí.<br/>Este sitio web pretende hacer visible a los perfiles "pre-junior" y decirles a las empresas que también existimos. No 
                    esperes más y regístrate!<br/>Buena suerte (;</p>
                </section>
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default Inicio;