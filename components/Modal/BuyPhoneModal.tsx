import { useEffect, useState } from 'react';
import Modal from '.';
import Select from '../Select';
import { Dialog } from '@headlessui/react';
import LoadingIcon from '../Loading';

export function BuyPhoneModal({ open, setOpen }: { open: boolean, setOpen: any }) {
    const [country, setCountry] = useState('US');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (open)
            setError('');
    }, [open]);

    const buyPhoneFromCountry = async (country: string) => {
        setLoading(true);
        setError('');
        const res = await fetch(`/api/sms/buy/${country}`);
        const { message } = await res.json();
        if (res.status == 200) {
            setOpen(false);
            setTimeout(() => setLoading(false), 500);
        } else {
            setLoading(false);
            setError(message);
        }
    };
    return (
        <Modal open={open} onClose={setOpen}>
            <div>
                <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Create new number
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 px-1">
                            These numbers cost about 1$ a month to maintain so please reuse numbers when possible
                        </p>
                    </div>
                </div>
                <br />
                <Select onSelect={v => setCountry(v)} label="country" value={country}>
                    <option value="US">United States</option>
                    <option value="IL">Israel</option>
                </Select>
            </div>

            <div className="mt-2 sm:mt-3">
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => buyPhoneFromCountry(country)}
                >
                    {loading ? <LoadingIcon /> : `Buy now(${country})`}

                </button>
                {error && error.length && <div className="mt-2 text-xs text-red-600 text-center">{error}</div>}
            </div>
        </Modal>
    );
}
