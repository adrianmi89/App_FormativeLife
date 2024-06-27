import { CalendarRange, CalendarMonth } from "cally"

// Calendario para que los estudiantes puedan añadir eventos
function Picker({value, onChange}){

    return (
        <CalendarRange value={value} onChange={onChange}>
            <CalendarMonth />
            <CalendarMonth offset={1} />
        </CalendarRange>
    )
}

export default Picker;
