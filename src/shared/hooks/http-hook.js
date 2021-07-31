import { useState, useCallback } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // ****************** NOTE *********************

    // IF ON ONE PAGE WE ARE MAKING API CALL. THAT CALL IS IN PROGRESS AND WE CHANGE THE PAGE THEN HOW CAN WE CANCEL THIS CALL
    // WELL THERE IS WAY. COME BACK TO THIS VIDEO AND CHECK AND IMPLEMENT IT

    //  ****************** NOTE *********************


    const sendRequest = useCallback(async (
        url,
        method = "GET",
        body = null,
        headers = {}
    ) => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    }

    return {
        isLoading,
        error,
        sendRequest,
        clearError
    };

};

