import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ConfirmBox = ({
  successText,
  rejectText,
  onSuccess,
  open,
  onReject,
  title,
  subTitle,
  subTitleColor,
}) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-11/12 max-w-md p-4 overflow-hidden text-left align-middle transition-all transform rounded shadow-xl bg-gray-750">
                  <Dialog.Title className="text-base font-medium text-white ">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p
                      className="text-base"
                      style={{
                        color: subTitleColor ? subTitleColor : "#9FA0A7",
                      }}
                    >
                      {subTitle}
                    </p>
                  </div>

                  <div className="flex justify-end mt-6">
                    {rejectText && (
                      <button
                        type="button"
                        className="px-4 py-2 mr-2 text-sm font-medium text-white rounded hover:bg-gray-700 "
                        onClick={onReject}
                      >
                        {rejectText}
                      </button>
                    )}
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-transparent border border-white rounded hover:bg-gray-700"
                      onClick={onSuccess}
                    >
                      {successText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ConfirmBox;
