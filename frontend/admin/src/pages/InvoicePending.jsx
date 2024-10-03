import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Button';
import { useState, useEffect } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API, { endpoints } from '@/configs/API';
import Modal from '@/components/Modal';
import { formatDate } from '@/utils/index';
import PageWrapper from '@/components/PageWrapper';
import { invoiceFields } from '@/utils';
import Spinner from '@/components/Spinner';

const InvoicePending = () => {
    const { id } = useParams();
    const { response, error, loading } = useAxios({
        url: `${endpoints.invoice}/${id}`,
        method: 'GET',
    });
    const [editable, setEditable] = useState(false);

    return <PageWrapper></PageWrapper>;
};
export default InvoicePending;
