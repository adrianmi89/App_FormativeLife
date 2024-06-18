function Contacto(props) {

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
                        <li className="cursor-pointer hover:text-3xl" onClick={props.onClickTutorial}>Tutorial de uso</li>
                        <li onClick={props.onClickContacto}>Contacto</li>
                    </ul>
                </nav>
            </aside>
            <container className="float-right my-4 m-l-[2%] m-r-[2%] p-8 border-2 border-solid border-black rounded-md font-serif text-2xl w-[79%] h-auto">
                <section>
                    <h2 className="font-bold text-2xl">Contacto</h2><br/>
                    <p className="p-2">Para cualquier duda o sugerencia de mejora del sitio web envíar un correo o WhatsApp.</p>
                    <p className="p-2"><span className="font-extrabold text-xl">Recuerda: </span>Tu perfil es muy importante para las empresas que busquen talento, con lo cual se admiten críticas y sugerencias para mejorar la zona del perfil y que sea más atractivo para las empresas.</p>
                </section>
                <section className="my-10">
                    <h2 className="font-bold text-2xl">Correo:</h2><a className="text-lg my-2" href="https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&osid=1&passive=1209600&service=mail&ifkv=AS5LTAQAusx69Y98YK1AmprwsqZCmuDOj8EAE-LlOcHe0JZ0oRFOomANfEgaE-i-TNPIBeZYcqjV8A&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin#inbox" target="_blank">adrianmi.info@gmail.com</a>
                    <h2 className="font-bold text-2xl">Teléfono:</h2><a className="text-lg my-2" href="https://web.whatsapp.com/" target="_blank">608501323</a>
                    </section>
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default Contacto;