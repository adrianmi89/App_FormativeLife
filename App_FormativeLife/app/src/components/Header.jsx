function Header ({className, role}){
    return (

            role === "student" ?
         
            <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-40 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
                <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" >FormativeLife</div>
                <div className="float-right mx-[10%] text-3xl"><i>Perfil del estudiante</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>
            </header>
        
        :
        
            <header className={className}>
                <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" >FormativeLife</div>
                <div className="float-right mx-[10%] text-3xl"><i>Perfil de la empresa</i><img className="mx-2 cursor-help" width="50px" height="30px" src="https://adrianmi.info/images/enlace-roto.png" alt="Conecta con varios perfiles" title="Conecta con varios perfiles"/></div>
            </header>
        
    )
}

export default Header;