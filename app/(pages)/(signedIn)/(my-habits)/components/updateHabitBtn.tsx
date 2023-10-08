"use client"
import {BiDotsVerticalRounded, BiSolidCog} from "react-icons/bi";
import Modal from "@/app/components/Modal";
import {useRef} from "react";
import UpdateHabitForm from "@/app/(pages)/(signedIn)/(my-habits)/components/UpdateHabitForm";


const UpdateHabitBtn = () => {
    const modalRef = useRef<HTMLDialogElement | null>(null)

    const openModal = () => {
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        modalRef.current?.close()
    }


    return (
        <>
            <Modal
                ref={modalRef}
                modalLabel="Update the habit"
                closeModal={closeModal}
            >
             <UpdateHabitForm closeModal={closeModal}/>
            </Modal>
            <button
                className="border-none hover:scale-105 hover:bg-primary bg-inherit btn p-0 m-0"
                onClick={openModal}
            >
              <BiDotsVerticalRounded color="#dbd2f4" size={32}/>
            </button>
        </>
    );
};

export default UpdateHabitBtn;