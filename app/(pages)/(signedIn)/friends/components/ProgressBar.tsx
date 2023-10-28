

type Props = {
    label:string,
    total: number,
    value:number
}
const ProgressBar = ({label, total, value}:Props) => {


    return (
        <div
            style={
                total !== 0 ?
                {backgroundImage: `linear-gradient(90deg, rgba(52,156,50,1) ${Math.floor((value/total)*100)}%, rgba(255,255,255,1) ${Math.floor((value/total)*100)}%)`}:
                {background:"#fff"}
            }
            className="w-full px-2.5 py-0.5 rounded-md bg-success">
            <span className="text-black">
                {value}/{total} {label}
            </span>

        </div>
    );
};

export default ProgressBar;