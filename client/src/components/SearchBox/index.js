import React from "react"
import useDebounce from "../../hooks/useDebounce";

function SearchBox(props) {
    const [query, setQuery] = React.useState('');
    const debouncedQuery = useDebounce(query, 500);

    React.useEffect(() => {
        props.onChange(debouncedQuery)
    }, [debouncedQuery])

    return (
        <div className="input-container">
            <input 
                type="text" 
                className="input-text" 
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                onChange={e => setQuery(e.target.value)} />
        </div>
    )
}

export default SearchBox