import './style.css'
export const Button = (props) => {
    return(
            <button 
                disabled = {props.disabled}
                className='button' 
                onClick={props.onClick}>{props.text}
            </button>
    )
}