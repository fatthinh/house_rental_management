import { SearchIcon } from '@/components/Icons';

export default function SearchBox({ className }) {
    return (
        <div className={`px-3 py-2 max-w-xs ${className}`}>
            <div className="relative">
                <label className="sr-only">Search</label>
                <input
                    type="text"
                    className="py-2 px-3 ps-9 block w-full border-1 border-neutral-300 shadow-sm rounded-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none focus:outline-neutral-500"
                    placeholder="Nhập từ khóa..."
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <SearchIcon />
                </div>
            </div>
        </div>
    );
}
