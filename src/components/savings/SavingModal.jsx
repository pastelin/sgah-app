import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { useSgahAhorroStore } from '../../hooks';
import { ExpenseForm } from '../expense';
import { SavingForm } from './SavingForm';

export const SavingModal = () => {
    const { isSavingModalOpen, openSavingModal, closeSavingModal } =
        useSgahAhorroStore();

        console.log('isSavingModalOpen', isSavingModalOpen);
    return (
        <>
            {/* <div className="fixed right-5 bottom-5 flex items-center justify-center">
                <button type="button" onClick={() => openSavingModal(true)}>
                    <PlusCircleIcon className="w-16 h-16 text-blue rounded-full" />
                </button>
            </div> */}

            <Transition appear show={isSavingModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => {
                        closeSavingModal(false);
                    }}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black opacity-85" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <SavingForm />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
