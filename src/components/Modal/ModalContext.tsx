import React from 'react';

export const ModalContext = React.createContext({
    isModalOpen: false,
    openModal: () => {
        console.log('openModal');
    },
    closeModal: () => {
        console.log('closeModal');
    },
});
