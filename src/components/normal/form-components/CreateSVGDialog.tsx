import React, { useState, Fragment } from "react";
import { Button, Input, Label } from "../base-components/BaseComponents";
import { SVGConfig } from "../../../utils/SVGUtils";
import Modal from "../base-components/Modal";
import { useMemo } from "react";
import Form, { Field } from "rc-field-form";

interface CreateSVGDialogProps {
  onOk: (config: SVGConfig) => void;
}

const CreateSVGDialog: React.FC<CreateSVGDialogProps> = (props) => {
  const { onOk } = props;
  const [show, setShow] = useState(false);
  const [form] = Form.useForm();

  const [open, close] = useMemo(
    () => [() => setShow(true), () => setShow(false)],
    []
  );

  return (
    <>
      <Button onClick={open}>create new SVG</Button>
      <Modal title="create SVG" show={show} onClose={close}>
        <Form form={form}>
          <Label htmlFor="id" classType="middle">
            id
          </Label>
          <Field name="id">
            <Input placeholder="unique id" type="text" />
          </Field>
          <div className=" grid-cols-2">
            <Label htmlFor="width" classType="middle">
              width
            </Label>
            <Field name="width">
              <Input type="number" placeholder="SVG element width(px)" />
            </Field>
            <Label htmlFor="id" classType="middle">
              height
            </Label>
            <Field name="height">
              <Input type="number" placeholder="SVG element height(px)" />
            </Field>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateSVGDialog;
