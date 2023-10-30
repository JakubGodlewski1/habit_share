import ProgressBar from "@/app/(pages)/(signedIn)/friends/components/ProgressBar";
import StatCol from "@/app/(pages)/(signedIn)/(my-habits)/components/StatCol";
import {BiDotsVerticalRounded} from "react-icons/bi";
import Modal from "@/app/components/Modal";
import {useRef} from "react";
import AddFriendForm from "@/app/(pages)/(signedIn)/friends/components/AddFriendForm";
import DeleteFriendBtn from "@/app/(pages)/(signedIn)/friends/components/DeleteFriendBtn";

type Props = {
    imgSrc:string,
    name: string,
    strike: number,
    points: number,
    todoToday: number,
    doneToday: number,
    email:string
}
const FriendCart = ({imgSrc, strike, points, todoToday, doneToday, name, email}:Props) => {
    const modalRef = useRef<HTMLDialogElement | null>(null)

    const openModal = () => {
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        modalRef.current?.close()
    }

    return (
        <div style={{color:"black"}} className="box-primary flex flex-col gap-4">
            <Modal
                closeModal={closeModal}
                ref={modalRef}
                modalLabel="Delete friend"
            >

                <DeleteFriendBtn email={email} closeModal={closeModal}/>
            </Modal>
                <div className="flex items-start gap-2">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img className="w-auto h-auto" src={imgSrc} alt="my pic"/>
                        </div>
                    </div>
                    <h3 className="flex-grow text-accent">{name}</h3>
                    <StatCol label="Strike" value={strike+" days"}/>
                    <StatCol label="Score" value={points.toString()}/>
                    <button onClick={openModal} className="p-1">
                        <BiDotsVerticalRounded color="#dbd2f4" size={32}/>
                    </button>
                </div>
                <ProgressBar
                    value={doneToday}
                    total={todoToday}
                    label="today's habits completed"
                />
        </div>
    );
};

export default FriendCart;