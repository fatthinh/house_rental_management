import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Button';
import { useState, useEffect } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import API, { endpoints } from '@/configs/API';
import { formatDate } from '@/utils/index';
import PageWrapper from '@/components/PageWrapper';
import cookie from 'react-cookies';
import { useSelector } from 'react-redux';
import { dataSelector } from './../redux/selectors';
import { useRef } from 'react';

const InvoiceSingle = () => {
    const { id } = useParams();
    const { currentMonth } = useSelector(dataSelector);
    const printRef = useRef(null);
    const navigate = useNavigate();
    const {
        response: services,
        error: servicesError,
        loading: servicesLoading,
    } = useAxios({
        method: 'GET',
        url: `${endpoints.service}?agreement-id=${id}&month=${currentMonth}`,
    });

    const { response: serviceCategory } = useAxios({
        method: 'GET',
        url: `${endpoints.service}/categories`,
    });

    const [invoices, setInvoices] = useState([]);

    const getInvoiceByServices = async (servs) => {
        try {
            const token = await cookie.load('token');
            const res = await API.get(`${endpoints.invoice}/getByServices?services=${servs?.join(', ')}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status == 200) setInvoices(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (services?.length) {
            const servs = serviceCategory?.map(
                (cate) => services?.find((service) => service.category.id === cate.id).id,
            );

            if (servs) getInvoiceByServices(servs);
        }

        const timer = setTimeout(async () => {
            if (!invoices.length && !services?.length) navigate(`/agreements/${id}/new-invoice`, { replace: true });
        }, 500);

        return () => clearTimeout(timer);
    }, [id, services]);

    const calTotal = () => {
        return invoices.reduce((accumulator, item) => accumulator + item?.amount, 0);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                /* Add your styles here */
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                }
              </style>
            </head>
            <body>
              ${printRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    };

    return (
        <PageWrapper>
            <Header category="Chi tiết" title="Hóa đơn" />
            <div className="py-4">
                Hợp đồng thuê#{id}, hóa đơn tháng {new Date(invoices[0]?.createdAt).getMonth() + 1}
            </div>
            <hr />
            <div className="py-2 mb-8 text-xs text-end">
                {invoices && formatDate(invoices[0]?.createdAt)}
                <span className="ml-2 px-4 py-1 rounded-md bg-accent-200">{invoices && invoices[0]?.state}</span>
            </div>
            <div className="grid md:grid-cols-2	gap-4 grid-rows-1" ref={printRef}>
                {serviceCategory &&
                    invoices &&
                    services &&
                    serviceCategory.map((item, index) => (
                        <div key={item.name} className="mr-5">
                            <div className="flex justify-between py-2 gap-4">
                                <h3 className="text-sm">{item.name}:</h3>
                                <span className="text-sm">
                                    {item.id <= 2
                                        ? services.find((service) => service.category.id === item.id)?.quantity -
                                          services.find((service) => service.category.id === item.id)?.prevQuantity
                                        : services.find((service) => service.category.id === item.id)?.quantity}
                                    {' ' + item.unit} x{' '}
                                    {item.id === 5
                                        ? invoices[index]?.amount.toLocaleString()
                                        : Number(item.price).toLocaleString()}
                                    đ
                                </span>
                            </div>
                            <div className="flex justify-end">
                                <span className="text-md">
                                    {invoices
                                        .find(
                                            (inv) =>
                                                inv.serviceId ===
                                                services.find((service) => service.category.id === item.id)?.id,
                                        )
                                        ?.amount.toLocaleString()}
                                    đ
                                </span>
                            </div>
                        </div>
                    ))}

                <div className="flex justify-end items-end gap-3">
                    <Button className="print:hidden" text="In hóa đơn" outline onClick={handlePrint} />
                </div>
                <div className="flex justify-between border-b-[3px]">
                    <h3>Tổng hóa đơn: </h3>
                    {calTotal().toLocaleString()}đ
                </div>
                <div className="flex justify-end items-end gap-3">
                    <Button className="print:hidden" text="Chỉnh sửa" secondary />
                    <Button className="print:hidden" text="Thanh toán" primary />
                </div>
                <style>
                    {`
                @media print {
                    .print\\:hidden {
                        display: none !important;
                    }
                }
                `}
                </style>
            </div>
        </PageWrapper>
    );
};
export default InvoiceSingle;
