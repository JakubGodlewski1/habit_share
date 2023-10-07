type Props = {
    label: string,
    value: string,
}

const StatRow = ({label, value}:Props) => {
        return (
            <div className={`flex border-[1px] rounded-lg border-primary overflow-hidden`}>
                <span className="p-md box flex-center whitespace-nowrap">{label}</span>
                <span className="p-md flex items-center text-accent bg-primary whitespace-nowrap">{value}</span>
            </div>
        );
};

export default StatRow;