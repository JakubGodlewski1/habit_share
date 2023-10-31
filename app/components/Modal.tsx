"use client"

import {forwardRef, ReactNode} from "react";
import React from "react";

type Props = {
    children: ReactNode,
    modalLabel: string,
    closeModal: ()=>void,
}

// eslint-disable-next-line react/display-name
const Modal = forwardRef(({children, modalLabel, closeModal}:Props, ref:any) => {


    return (
        // @ts-ignore
    <dialog style={{maxHeight: "90vh", maxHeight:"90dvw"}} ref={ref} className="modal">
        <div className="bg-secondary modal-box p-0">
            <div className="flex justify-between align-top border-b-black border-b-[1px] p-4">
                <h3 className="text-inherit">{modalLabel}</h3>
                <button
                    onClick={closeModal}
                    className="btn btn-sm btn-circle btn-ghost">
                    ✕
                </button>
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    </dialog>
    );
});

export default Modal;