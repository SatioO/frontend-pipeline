import React from "react"

export default function useDebounce(value, delay) {
    const [deferredValue, setDeferredValue] = React.useState(value);

    React.useEffect(
        () => {
            const handler = setTimeout(() => {
                setDeferredValue(value);
            }, delay);
            
            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );

    return deferredValue;
}