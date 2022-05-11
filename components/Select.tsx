type InputProps = {
    onSelect: (value: React.SetStateAction<string>) => void
    label: string;
    children: React.ReactNode[];
    value: string;
}

export default function Select({ children, label, onSelect, value }: InputProps) {
    return (
        <div>
            {label && <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                {label}
            </label>}
            <select
                id="location"
                name="location"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue={value}
                onChange={(e) => onSelect(e.target.value)}
            >
                {children}
            </select>
        </div>
    )
}
