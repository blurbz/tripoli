function TextInput({ type, value, placeholder, onChange }) {
  return (
    <input
      type={type || "text"}
      value={value}
      onChange={onChange}
      className="rounded-md bg-gray-200 px-6 py-2 text-xl leading-8 block m-4 focus:bg-white shadow-md outline-none focus:shadow-lg transition-all"
      placeholder={placeholder}
    />
  );
}

export default TextInput;
