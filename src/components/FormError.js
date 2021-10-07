import React from "react";

const FormError = ({ text }) => (
  <section className="text-center p-2 mb-2 rounded border border-red-600 bg-red-100 shadow-lg">
    <p className="text-red-700 font-bold">
      <span className="ml-1">{text}</span>
    </p>
  </section>
);

export default FormError;
