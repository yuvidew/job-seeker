'use client';

import axios, { AxiosResponse } from 'axios';
import { enqueueSnackbar } from 'notistack';

interface ApiResponse {
    msg: string;
    user: {
        _id: string;
    };
    resume:string
}

interface userInfo {
    name: string;
    email: string;
}

interface objType {
    resume : string | undefined
}

export const useFetch = () => {

    const onAddInfo = async (url: string, data: userInfo): Promise<void> => {
        try {
            const res: AxiosResponse<ApiResponse> = await axios.post(url, data);
            if (res.status === 201) {
                enqueueSnackbar(res.data.msg, { variant: 'success' });
                localStorage.setItem("user-Id", res.data.user._id);
                window.location.reload();
            }
        } catch (error: any) {
            enqueueSnackbar(error.response?.data?.msg || 'An error occurred', { variant: 'error' });
        }
    }

    const onUpload = async (url: string, data: objType): Promise<void> => {
        try {
            console.log('opdakjdgaf' , data);
            const res: AxiosResponse<ApiResponse> = await axios.post(url, data);

            if (res.status === 201) {
                enqueueSnackbar(res.data.msg, { variant: 'success' });
            }
        } catch (error: any) {
            enqueueSnackbar(error.response?.data?.msg || 'An error occurred', { variant: 'error' });
        }
    }

    return {
        onAddInfo,
        onUpload
    }
}
