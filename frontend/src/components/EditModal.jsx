/*  src/components/EditModal.jsx  */
import React from "react";
import { FiX } from "react-icons/fi";

export default function EditModal({ title, children, onClose, onSave, busy }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.15)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        {/* body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>

        {/* footer */}
        <div className="px-6 py-4 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={busy}
            className={`px-6 py-2 rounded-lg text-white ${
              busy
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
