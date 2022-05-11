import { useState } from 'react';
import { MessageModal } from "./Modal/MessageModal";


export function Row({ record, even }: { record: any, even: boolean }) {
  const [openMessages, setOpenMessages] = useState(false);
  return (
    <>
      <tr className={even ? undefined : 'bg-gray-50'}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {record.number}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {record.messages[0].body}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <a onPointerDown={() => setOpenMessages(true)} className="text-indigo-600 hover:text-indigo-900">
            All Messages({record.messages.length})<span className="sr-only"></span>
          </a>
        </td>
      </tr>
      <MessageModal open={openMessages} setOpen={setOpenMessages} messages={record.messages} />
    </>
  );
}
