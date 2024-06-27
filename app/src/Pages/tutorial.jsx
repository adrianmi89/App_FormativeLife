import Button from '../components/Button'

function Tutorial(props) {

    return (
    <>
        <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-40 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
            <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" onClick={props.onClickInicio}>FormativeLife</div>
            <div className="float-right mx-[10%] text-3xl"><i>Busca o atrae talento</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>
            <div className="m-[0%] float-right w-[30%] border-solid">
                <Button onClick={props.onClickLogin}>Iniciar Sesión</Button>
                <Button onClick={props.onClickRegister}>Crear Cuenta</Button>
            </div>
            
        </header>
        <main className="w-[100%] flex-auto">
            <aside className="float-left p-4 my-4 mx-1 w-[20%] h-auto border-l-0 border-t-0 border-r-8 border-b-8 border-solid border-black rounded-xl shadow-2xl bg-blue-400 text-justify text-xl font-bold">
                <nav>
                    <ul className="space-y-4">
                        <li className="cursor-pointer hover:text-3xl" onClick={props.onClickInicio}>Inicio</li>
                        <li className="cursor-pointer hover:text-3xl" onClick={props.onClickParaQuienEs}>¿Para quien es?</li>
                        <li onClick={props.onClickTutorial}>Tutorial de uso</li>
                        <li className="cursor-pointer hover:text-3xl" onClick={props.onClickContacto}>Contacto</li>
                    </ul>
                </nav>
            </aside>
            <container className="float-right my-4 m-l-[2%] m-r-[2%] p-8 border-2 border-solid border-black rounded-md font-serif text-xl w-[79%] h-auto">
                <section>
                    <h2 className="font-bold text-2xl">Tutorial de uso</h2><br/>
                    <p className="p-2">Si eres nuevo y no sabes como utilizar este sitio, aquí tiene una pequeña guía de 5 pasos:</p>
                    <br/>
                    <ul>
                        <li>
                            <span className="px-3 bg-black text-white text-3xl text-center flex-auto rounded-full w-2">1</span> Navega por las distintas páginas para tener una idea del objetivo del sitio web.
                        </li><br/>
                        <li>
                            <span className="px-3 bg-black text-white text-3xl text-center flex-auto rounded-full w-2">2</span> Si quieres empezar a utilizarlo y ver que ventajas tiene registrate con uno de los dos tipos de usuario que tenemos.
                        </li><br/>
                        <li>
                            <span className="px-3 bg-black text-white text-3xl text-center flex-auto rounded-full w-2">3</span> Inicia sesión y controla tu perfil de usuario en todo momento.
                        </li><br/>
                        <li>
                            <span className="px-3 bg-black text-white text-3xl text-center flex-auto rounded-full w-2">4</span> Cuanto más actualizado tengas tu perfil, más se van fijar las empresas o estudiantes en tí.
                        </li><br/>
                        <li>
                            <span className="px-3 bg-black text-white text-3xl text-center flex-auto rounded-full w-2">5</span> Para cualquier duda o sugerencia sobre el sitio web tienes el correo y teléfono del administrador del sitio en la página de Contacto.
                        </li><br/>
                        <h3>Suerte con tu perfil y empieza a sacarle rendimiento!</h3>
                    </ul>                    
                </section>
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default Tutorial;