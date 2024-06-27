function Button ({children, onClick}){
    return (
        <button onClick={onClick} className="m-2 p-2 border-solid border-2 rounded-md shadow-2xl bg-white hover:bg-black hover:text-white hover:text-sm">
            {children}
        </button>
    )
}

export default Button;