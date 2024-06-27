import Button from '../components/Button'

function ParaQuienEs(props) {
  
    console.debug('App render')
    
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
            <aside className="float-left p-4 my-4 w-[20%] h-auto border-l-0 border-t-0 border-r-8 border-b-8 border-solid border-black rounded-xl shadow-2xl bg-blue-400 text-justify text-xl font-bold">
                <nav>
                    <ul className="space-y-4">
                        <li className="cursor-pointer hover:text-3xl" onClick={props.onClickInicio}>Inicio</li>
                        <li onClick={props.onClickParaQuienEs}>¿Para quien es?</li>
                        <li className="cursor-pointer hover:text-3xl" onClick={props.onClickTutorial}>Tutorial de uso</li>
                        <li className="cursor-pointer hover:text-3xl" onClick={props.onClickContacto}>Contacto</li>
                    </ul>
                </nav>
            </aside>
            <container className="float-right my-4 m-l-[2%] m-r-[2%] p-8 border-2 border-solid border-black rounded-md font-serif text-xl w-[79%] h-auto">
                <section className="display-flex w-4/5">
                    <h2 className="font-bold text-2xl">¿Para Quién es?</h2>
                    <p className="p-3">Este sitio web busca que tanto los estudiantes como las empresas tengan un primer contacto de 
                    una forma cómoda, rápida y sean selectivos sobre lo que buscan y den paso una posible entrevista ya contando con el perfil que 
                    se van encontrar. Una manera muy efectiva de filtrar sin tener que enfrentarse a varios procesos de selección.</p>
                    <p className="p-3">Las ventajas de utilizar este sitio web son:</p><br/>
                    <div className="w-2/5 border-double border-4 border-blue-300 float-left">
                        <div className="text-center font-extrabold">Estudiante</div><br/>
                        <div className="text-center font-medium">- Perfil detallado</div>
                        <div className="text-center font-normal">- Poder actualizar el perfil en unos pocos clicks</div>
                        <div className="text-center font-normal">- Ser más selectivo al buscar ofertas al ser un sitio web solo para pre-juniors</div><br/>
                    </div>
                    <div className="w-2/5 border-double border-4 border-blue-300 float-right ms-10">
                        <div className="text-center font-extrabold">Empresa</div><br/>
                        <div className="text-center font-normal">- Perfil detallado</div>
                        <div className="text-center font-normal">- Poder poner ofertas en unos pocos clicks</div>
                        <div className="text-center font-normal">- Evitar procesos de seleción largos ya conociendo rápido a varios perfiles</div><br/>
                    </div>                    
                </section>
            </container>
        </main>
        <footer>
            
        </footer>
    </>
    )
}

export default ParaQuienEs;