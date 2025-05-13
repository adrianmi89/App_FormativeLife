function HeaderProfile ({role}){
    return (

            role === "student" ?
         
            <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-40 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
                <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" >FormativeLife</div>
                <div className="flex-auto w-[30%] float-left mx-[20%] text-2xl justify-center"><i>Perfil del estudiante</i></div>
            </header>
        
        :
        
            <header className="mx-0 my-0 p-6 flex-auto w-[100%] h-40 border-solid shadow-2xl bg-blue-400 font-extrabold font-sans">
                <div className="text-6xl font-mono float-left cursor-pointer" title="Ir a la página principal" >FormativeLife</div>
                <div className="flex-auto w-[30%] float-left mx-[20%] text-2xl justify-center"><i>Perfil de la empresa</i></div>
            </header>
        
    )
}

export default HeaderProfile;