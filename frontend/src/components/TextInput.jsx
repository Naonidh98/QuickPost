import React from "react";

const TextInput = ({
  type,
  placeholder,
  styles,
  label,
  labelStyles,
  register,
  name,
  error,
  ref,
  id
}) => {
  return (
    <div className="w-full flex flex-col mt-2">
      {label && (
        <label htmlFor={id} className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</label>
      )}

      <div>
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          className={`bg-[] rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
          {...register}
        />
      </div>

      {
        error && (
          <span className="text-xs text-[#f64949fe] mt-0.5">{error}</span>
        )
      }
    </div>
  );
};

export default TextInput;
