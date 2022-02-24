import { Transition, Dialog } from "@headlessui/react";
import { Button } from "./BaseComponents";
import React, { useState, Fragment, ReactNode, useCallback } from "react";
import { useEffect } from "react";

interface ModalProps {
  title: string | ReactNode;
  onClose?: () => void;
  onOk?: () => void;
  show?: boolean;
  okText?: string;
  cancleText?: string;
  footer?: ReactNode | Array<ReactNode>;
}
const Modal: React.FC<ModalProps> = (props) => {
  const {
    title,
    children,
    onOk,
    onClose,
    show,
    okText = "ok",
    cancleText = "cancle",
    footer,
  } = props;
  const [visible, setVisible] = useState(show ?? true);

  const handleClose = useCallback(() => {
    onClose && onClose();
    if (typeof show !== "boolean") {
      setVisible(false);
    }
  }, [onClose]);

  const handleOk = useCallback(() => {
    onOk && onOk();
    if (typeof show !== "boolean") {
      setVisible(false);
    }
  }, [onOk]);
  return (
    <Transition as={Fragment} show={show ?? visible}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">{children}</div>

              <div className="mt-4">
                <div className=" flex flex-row justify-between">
                  <Button onClick={handleClose}>{cancleText}</Button>
                  <Button onClick={handleOk}>{okText}</Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};


export default Modal;