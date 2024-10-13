import { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

axios.defaults.baseURL = 'http://localhost:8222/api/v1';

export const useAxios = (axiosParams, trigger = null) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async (params) => {
        try {
            const token = await cookie.load('token');

            if (!token) {
                throw new Error('Token not found');
            }

            // Add token to the request headers if token exists
            const modifiedParams = {
                ...params,
                headers: {
                    ...params.headers, // preserve any existing headers
                    Authorization: `Bearer ${token}`, // add the token
                },
            };

            const result = await axios.request(modifiedParams);
            setResponse(result.data);
        } catch (error) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, [trigger]); // re-run when trigger changes

    return { response, error, loading };
};
