import React, { useState, Fragment } from "react";
import { Button } from "../base-components/BaseComponents";
import { SVGConfig } from "../../../utils/SVGUtils";
import Modal from '../base-components/Modal'
import { useMemo } from "react";

interface CreateSVGDialogProps {
  onOk: (config: SVGConfig) => void;
}

const CreateSVGDialog: React.FC<CreateSVGDialogProps> = (props) => {
  const { onOk } = props;
  const [show, setShow] = useState(false);

  const [open, close] = useMemo(() => [() => setShow(true), () => setShow(false)], [])

  return (
    <>
      <Button onClick={open}>create new SVG</Button>
      <Modal title="create SVG" show={show} onClose={close}>
        headlessui
      </Modal>
    </>
  );
};

export default CreateSVGDialog;
