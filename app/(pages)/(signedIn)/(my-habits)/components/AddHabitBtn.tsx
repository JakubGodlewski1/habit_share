"use client"
import {IoAdd} from "react-icons/io5";
import Modal from "@/app/components/Modal";
import {useEffect, useRef, useState} from "react";
import AddHabitForm from "@/app/(pages)/(signedIn)/(my-habits)/components/AddHabitForm";


const AddHabitBtn = () => {
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const openModal = () => {
        modalRef.current?.showModal()
        setModalOpen(true)
    }

    const closeModal = () => {
        modalRef.current?.close()
        setModalOpen(false)
    }

    return (
        <div className="flex items-stretch">
            <Modal
                closeModal={closeModal}
                ref={modalRef}
                modalLabel="Create a habit"
            >
                <AddHabitForm modalOpen={modalOpen} closeModal={closeModal}/>
            </Modal>
            <h3 className="hidden box sm:flex-center sm:block">Add habit</h3>
            <button onClick={openModal} className="btn-primary btn-square btn">
                <IoAdd size={32}/>
            </button>
        </div>
    );
};

export default AddHabitBtn;