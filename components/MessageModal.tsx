import { useEffect, useState } from 'react';
import Modal from './Modal';
import { Dialog } from '@headlessui/react';


export function MessageModal({ open, setOpen, messages }: { open: boolean, setOpen: any, messages: [{ body: string, dateSent: string }] }) {
    const [country, setCountry] = useState('US');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (open)
            setError('');
    }, [open]);

    return (
        <Modal open={open} onClose={setOpen}>
            <div>
                <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Messages
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 px-1">
                            Refresh the page to get new messages
                        </p>
                    </div>
                </div>
                <br />

                {messages.map((message, i) => (
                    <div className={`p-1 text-sm text-gray-800 ${i % 2 == 0 ? 'bg-gray-100' : ''}`}>
                        <span>{message.body}</span>
                        <div className="float-right mt-1 text-xs text-gray-500">
                            {message.dateSent}
                        </div>
                    </div>

                ))}

            </div>
            <br />
            <div className="mt-2 sm:mt-3">
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                >
                    close
                </button>
            </div>
        </Modal>
    );
}
