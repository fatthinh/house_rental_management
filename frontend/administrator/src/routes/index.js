// Pages
import TenantList from '@/pages/TenantList';
import Home from '@/pages/Home';
import InvoiceList from '@/pages/InvoiceList';
import HouseList from '@/pages/HouseList';
import AgreementList from '@/pages/AgreementList';
import TenantForm from '@/pages/TenantForm';
import AgreementForm from '@/pages/AgreementForm';
import HouseForm from '@/pages/HouseForm';
import InvoiceForm from '@/pages/InvoiceForm';
import TenantSingle from '@/pages/TenantSingle';
import AgreementSingle from '@/pages/AgreementSingle';
import HouseSingle from '@/pages/HouseSingle';
import InvoiceSingle from '@/pages/InvoiceSingle';

// Icons
import { GoHome } from 'react-icons/go';
import { IoPeopleOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';
import { BsDoorOpen } from 'react-icons/bs';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';

// Public routes
const routes = [
    { path: '/', element: Home, name: 'Tổng quan', icon: GoHome },
    { path: '/tenants', element: TenantList, name: 'Cư dân', icon: IoPeopleOutline },
    { path: '/tenants/new', element: TenantForm, display: 'none' },
    { path: '/tenants/:id', element: TenantSingle, display: 'none' },
    { path: '/agreements', element: AgreementList, name: 'Hợp đồng', icon: LiaFileContractSolid },
    { path: '/agreements/:id', element: AgreementSingle, display: 'none' },
    { path: '/agreements/new', element: AgreementForm, display: 'none' },
    { path: '/houses', element: HouseList, name: 'Phòng', icon: BsDoorOpen },
    { path: '/houses/:id', element: HouseSingle, display: 'none' },
    { path: '/houses/new', element: HouseForm, display: 'none' },
    { path: '/invoices', element: InvoiceList, name: 'Hóa đơn', icon: LiaFileInvoiceDollarSolid },
    { path: '/invoices/new', element: InvoiceForm, display: 'none' },
    { path: '/invoices/:id', element: InvoiceSingle, display: 'none' },
];

export default routes;
