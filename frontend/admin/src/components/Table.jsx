import { Link } from 'react-router-dom';
import SearchBox from '@/components/SearchBox';
import Dropdown from '@/components/Dropdown';

const Table = ({ data, fields, toDetail, dropdownItems, onClickDropdownItem, dropdownLabel }) => {
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg divide-y divide-gray-200">
                        <div className="flex items-center justify-between">
                            <SearchBox />
                            {dropdownItems && (
                                <Dropdown
                                    className="mr-4"
                                    dropdownItems={dropdownItems}
                                    setCurrentItem={onClickDropdownItem}
                                    label={dropdownLabel}
                                />
                            )}
                        </div>
                        <div className="overflow-auto max-h-[420px]">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        {fields.map((item) => (
                                            <th
                                                key={item.field}
                                                scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                            >
                                                {item.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data.map((dataItem) => (
                                        <tr key={dataItem.id}>
                                            {fields.slice(0, fields.length - 1).map((item) => (
                                                <td
                                                    key={item.field}
                                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                                                >
                                                    {typeof dataItem[item.field] === 'number' && item.field !== 'id'
                                                        ? dataItem[item.field].toLocaleString()
                                                        : dataItem[item.field]}
                                                </td>
                                            ))}
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                <Link className="text-primary-300" to={`${toDetail}/${dataItem.id}`}>
                                                    Chi tiết
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
