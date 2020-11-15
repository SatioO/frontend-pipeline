import React from "react"
import useDebounce from "../../../hooks/useDebounce";

function Header(props) {
    const [query, setQuery] = React.useState('');
    const debouncedQuery = useDebounce(query, 500);

    React.useEffect(() => {
        props.onChange(debouncedQuery)
    }, [debouncedQuery])

    return (
        <div className="header">
            <p className="header-title">Friends List</p>
            <div>
                <input 
                type="search" 
                placeholder="Search" 
                onChange={e => setQuery(e.target.value.trim())}/>
            </div>
        </div>
    )
}

export default Header