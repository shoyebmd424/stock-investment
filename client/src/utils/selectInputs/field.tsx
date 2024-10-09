import React, { useEffect, useRef, } from 'react';
import { Controller, Control } from 'react-hook-form';
import "./selectInput.scss";
import { MdArrowDropDown } from 'react-icons/md';

interface Option {
    name: string;
    code: string;
    id: string;
}

interface SelectInputProps {
    label: string;
    name: string;
    control: Control<any>; 
    options:Option[];
    setId: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectField: React.FC<SelectInputProps> = ({ label, name, control,options,setId }) => {
    const [filter, setFilter] = React.useState<string>('');
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement | null>(null);
    const [filteredOptions, setFilteredOptions] = React.useState<Option[]>(options);
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filterText = e.target.value;
        setFilter(filterText);
    };

    const handleOptionClick = (option: Option) => {
        setIsOpen(false);
        setId(option?.id);
    };
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setFilteredOptions(
            options?.filter(option =>
                option?.name?.toLowerCase()?.includes(filter.toLowerCase())
            )
        );
    }, [filter, options]);

    return (
        <Controller 
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    <div className="input-float-group select-input-field" ref={selectRef}>
                        <div className='dropdown'><MdArrowDropDown className={isOpen?"rotate":""} size={25}/></div>
                        <input
                            type="text"
                            onClick={() => setIsOpen(!isOpen)}
                            className="input-field"
                            readOnly
                            value={field.value ? options.find(option => option.code === field.value)?.name : ''}
                            placeholder=""
                        />
                        <label className="text-capitalize" htmlFor={label}>
                            {label}
                        </label>
                        {isOpen && (
                            <div style={{ zIndex: "5" }} className="position-absolute options-area bg-white border border-gray-300 w-full mt-1 z-10">
                                <input
                                    type="text"
                                    className="w-full p-2 border-b border-gray-300"
                                    value={filter}
                                    onChange={handleFilterChange}
                                    placeholder="Filter..."
                                />
                                <ul className="max-h-60 overflow-auto p-0 m-0">
                                    {filteredOptions?.length > 0 ? (
                                        filteredOptions?.map(option => (
                                            <li
                                                key={option.code}
                                                className="p-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    field.onChange(option.code);
                                                    handleOptionClick(option);
                                                    setId(option.id);
                                                }}
                                            >
                                                {option.name}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="p-2">No options available</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            )}
        />
    );
};
