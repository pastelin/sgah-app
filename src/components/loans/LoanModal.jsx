import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { useSgahPrestamoStore } from '../../hooks';
import { FormNewPrestamo } from '../forms';

export const LoanModal = () => {
    const { isModalShown, setModalVisibility } =
        useSgahPrestamoStore();

    return (
        <>
            <div className="fixed right-5 bottom-5 flex items-center justify-center">
                <button type="button" onClick={() => setModalVisibility(true)}>
                    <PlusCircleIcon className="w-16 h-16 text-blue rounded-full" />
                </button>
            </div>

            <Transition appear show={isModalShown} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => {
                        setModalVisibility(false);
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
                                    <FormNewPrestamo />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
