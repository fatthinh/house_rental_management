export default function PageWrapper({ children, className }) {
    return (
        <div className={`flex-1 m-2 mt-6 md:m-10 md:mt-2 p-2 md:p-10 bg-white rounded-3xl shadow-lg ${className}`}>
            {children}
        </div>
    );
}
