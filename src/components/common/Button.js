/**
 * Returns the button.
 */
function Button({ children, className, onClick }) {
  return (
    <button
      className={
        "rounded-sm bg-blue-600 text-white text-xl mx-auto shadow-md px-5 py-2 hover:bg-blue-700 hover:shadow-xl transition-all " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
