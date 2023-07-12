import './styles.css';

export const TextInput = (props) => {
    return (
        <input
            className='text-input'
            type="search"
            value={props.seacrhValue}
            onChange={props.hadleChange}
            placeholder='Search'
        />
    )
}