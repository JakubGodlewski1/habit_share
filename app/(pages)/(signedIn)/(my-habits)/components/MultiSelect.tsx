type Props = {
    allElements: string[],
    activeElements: string[],
    setActiveElements: (el:any)=>void
}

const MultiSelect = ({allElements, activeElements, setActiveElements }:Props) => {
    const activeStyle = "hover:bg-accent btn-accent shadow opacity-100 z-10"
    const inactiveStyle = "opacity-60 z-0"

    return (
        <div className="join">
            {allElements && allElements.map(el=>
                <button
                    onClick={()=>setActiveElements(el)}
                    key={el}
                    className={`join-item btn flex-grow ${activeElements.includes(el) ? activeStyle : inactiveStyle}`}>
                    {el}
                </button>)
            }
        </div>
    );
};

export default MultiSelect;