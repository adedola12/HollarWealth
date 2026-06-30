import React from 'react';

const ContactInfo = () => {
  return (
    <div className="w-full border-t bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-200 py-8 px-4 lg:px-20">
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Contact Information</h3>
      <p className="mb-2 text-sm text-gray-700 dark:text-gray-200">
        For any assistance or inquiries, feel free to reach out:
      </p>
      <p className="mb-1">
        <span className="font-semibold">Email:</span> ask@schoolinka.com
      </p>
      <p className="mb-1">
        <span className="font-semibold">WhatsApp:</span> +2349066040167
      </p>
      <p className="mb-1">
        <span className="font-semibold">Office Hours:</span> Monday to Friday, 9:00 AM to 5:00 PM (GMT)
      </p>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Our dedicated support team is here to help you every step of the way.
      </p>
    </div>
  );
};

export default ContactInfo;
