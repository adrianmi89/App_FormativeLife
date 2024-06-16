
function Tutorial(props) {

    return (
    <>
        <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-40 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
            <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" onClick={props.onClickInicio}>FormativeLife</div>
            <div className="float-right mx-[10%] text-3xl"><i>Busca o atrae talento</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>
            <div className="m-[0%] float-right w-[30%] border-solid">
                <button className="p-2 border-solid rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={props.onClickLogin}>Iniciar Sesión</button>
                <button className="p-2 m-4 border-solid rounded-md shadow-3xl bg-white hover:bg-black hover:text-white hover:text-sm" onClick={props.onClickRegister}>Crear Cuenta</button>
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
            <container className="float-right my-4 m-l-[2%] m-r-[2%] p-8 border-2 border-solid border-black rounded-md font-serif text-lg w-[79%] h-auto">
                <section>
                    <h2 className="font-bold text-xl">Tutorial de uso</h2><br/>
                    <p>Si eres nuevo y no sabes como utilizar este sitio, aquí está pequeña guía:</p>
                    <br/><br/>
                    <ul>
                        <li>1. Navega por las distintas páginas para tener una idea del objetivo del sitio web.
                        </li><br/>
                        <li>
                            2. Si quieres empezar a utilizarlo y ver que ventajas tiene registrate con uno de los 2 tipos de usuario que tenemos.
                        </li><br/>
                        <li>
                            3. Inicia sesión y controla tu perfil de usuario en todo momento.
                        </li><br/>
                        <li>
                            4. Cuanto más actualizado tengas tu perfil, más se van fijar las empresas o estudiantes en tí.
                        </li><br/>
                        <li>
                            5. Para cualquier duda o sugerencia sobre el sitio web tienes el correo y teléfono del administrador del sitio en la página de Contacto.
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