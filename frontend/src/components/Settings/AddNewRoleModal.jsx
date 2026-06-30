/* src/components/Settings/AddNewRoleModal.jsx */
import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'

export default function AddNewRoleModal({ open, onClose, onSave }) {
  const [role, setRole] = useState('')
  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    if (!role.trim()) return
    onSave?.(role.trim())
    setRole('')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-white/30 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-lg shadow-xl
                   pt-8 pb-10 px-6 sm:px-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-center text-xl font-medium text-gray-800 dark:text-gray-100 mb-8">
          New Role
        </h2>

        <form onSubmit={submit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Role
            </label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter Role"
              className="w-full rounded-md border border-gray-300 dark:border-slate-700 px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white
                       font-medium hover:bg-blue-700 focus:outline-none
                       focus:ring-2 focus:ring-blue-500"
          >
            Save New Role
          </button>
        </form>
      </div>
    </div>
  )
}
