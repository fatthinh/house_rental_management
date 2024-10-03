const Modal = ({ title, children, actions, visible, setVisible, fullscreen }) => {
    return (
        <>
            <div
                className={`transition-all justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${
                    visible ? 'bottom-[0]' : 'bottom-[100vh]'
                }`}
            >
                <div className={`relative w-auto mx-auto w-half ${fullscreen && 'min-w-full min-h-full'}  `}>
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col justify-between bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setVisible(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className={`relative p-6 flex-auto ${fullscreen && 'h-[80vh]'}`}>{children}</div>
                        {/*footer*/}
                        {actions && (
                            <div className="flex items-center gap-4 justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {visible && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
        </>
    );
};

export default Modal;
