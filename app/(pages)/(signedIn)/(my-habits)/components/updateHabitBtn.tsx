"use client"
import {BiSolidCog} from "react-icons/bi";
import Modal from "@/app/components/Modal";
import AddHabitForm from "@/app/(pages)/(signedIn)/(my-habits)/components/AddHabitForm";
import {useRef, useState} from "react";
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
                modalLabel="Update the habit"
                closeModal={closeModal}
            >
             <UpdateHabitForm closeModal={closeModal}/>
            </Modal>
            <button
                className="border-none hover:bg-secondary hover:scale-105 bg-inherit h-full btn w-full"
                onClick={openModal}
            >
                <BiSolidCog size={48}/>
            </button>
        </>
    );
};

export default UpdateHabitBtn;