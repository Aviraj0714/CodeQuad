import { PiCaretDownBold } from "react-icons/pi";

function Select({ onChange, value, options, title }) {
    return (
        <div className="relative w-full">
            <label className="mb-2">{title}</label>
            <select
                className="w-full rounded-md border-none bg-darkHover px-4 py-2 text-white outline-none"
                value={value}
                onChange={onChange}
            >
                {options.sort().map((option) => {
                    const optionValue = option;
                    const displayName =
                        option.charAt(0).toUpperCase() + option.slice(1);

                    return (
                        <option key={optionValue} value={optionValue}>
                            {displayName}
                        </option>
                    );
                })}
            </select>
            <PiCaretDownBold
                size={16}
                className="absolute bottom-3 right-4 z-10 text-white"
            />
        </div>
    );
}

export default Select;