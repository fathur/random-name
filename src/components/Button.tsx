const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={`button`}
      className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-full py-1 px-10 leading-normal no-underline transition-all bg-blue-500 text-white hover:bg-blue-600 py-3 px-4 leading-tight text-xl"
    >
      {children}
    </button>
  );
};

export default Button;
