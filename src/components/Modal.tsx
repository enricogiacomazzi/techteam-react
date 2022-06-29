import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface ModalProps {
    visible: boolean;
}


export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({visible, children}) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if(!!visible) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        } 
    }, [visible]);

    return (
    <dialog ref={ref}>
        {children}
    </dialog>
    );
}