type Props = {
    label: string,
    value: string,
}

const StatRow = ({label, value}:Props) => {
        return (
            <div className={`flex flex-col border-[1px] rounded-lg border-accent overflow-hidden`}>
                <span className="p-sm flex-center text-accent bg-primary whitespace-nowrap">{label}</span>
                <span className="text-[#000] rounded-none p-sm flex-center bg-secondary whitespace-nowrap">{value}</span>
            </div>
        );



};

export default StatRow;