const Form = ({ children, action, method = 'post', onSubmit, className }) => {
    return (
        <form className={`max-w-[80%] mx-auto mt-6 ${className}`} action={action} method={method} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;
