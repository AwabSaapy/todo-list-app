import React, { useState, useEffect} from "react";

type ReturnType<T> = [
    T,
    React.Dispatch<React.SetStateAction<T>>
];

export const useLocalStorage = <T>(key: string, initialValue?: T): ReturnType<T> => {
    const [state, stateSet] = useState<T>(() => {
        if (!initialValue) return;
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
        } catch (e) {
            return initialValue;
        }
    })

    useEffect(() => {
        if (state) {
            try {
                localStorage.setItem(key, JSON.stringify(state))
            } catch (e) {
                console.error(e)
            }
        }
    }, [key, state]);

    return [state, stateSet];
};
