"use client"
import {IoAdd} from "react-icons/io5";
import Modal from "@/app/components/Modal";
import {useRef} from "react";
import AddFriendForm from "@/app/(pages)/(signedIn)/friends/components/AddFriendForm";

const AddFriendBtn = ({disableText=false, className}:{disableText?:boolean, className?:string}) => {
    const modalRef = useRef<HTMLDialogElement | null>(null)

    const openModal = () => {
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        modalRef.current?.close()
    }

    return (
        <div className="flex">
            <Modal
                closeModal={closeModal}
                ref={modalRef}
                modalLabel="Add a friend"
            >
                <AddFriendForm closeModal={closeModal}/>
            </Modal>
            {!disableText && <h3 className="box flex-center">Add new friend</h3>}
            <button onClick={openModal} className={`btn-primary btn-square btn ${className}`}>
                <IoAdd size={32}/>
            </button>
        </div>
    );
};

export default AddFriendBtn;