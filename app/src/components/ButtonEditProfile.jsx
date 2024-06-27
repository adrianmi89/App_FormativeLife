function ButtonEditProfile ({children, onClick, className}){
    
    return (
       
        <button onClick={onClick} className={"m-2 p-2 text-white border-solid border-2 border-black " + className} >
            {children}
        </button>
    )
}

export default ButtonEditProfile;