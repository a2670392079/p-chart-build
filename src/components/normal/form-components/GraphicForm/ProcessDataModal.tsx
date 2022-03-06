import React, { useState, Fragment, useCallback } from "react";
import { Button, Input, Label } from "../../base-components/BaseComponents";
import Modal from "../../base-components/Modal";
import { useMemo } from "react";
import Form, { Field } from "rc-field-form";

interface ProcessDataModalProps {
  onOk: (config: any) => void;
  processID: string;
}

const ProcessDataModal: React.FC<ProcessDataModalProps> = (props) => {
  const { onOk, processID } = props;
  const [show, setShow] = useState(false);
  const [form] = Form.useForm();

  const [open, close] = useMemo(
    () => [
      () => setShow(true),
      () => {
        setShow(false);
        form.resetFields();
      },
    ],
    []
  );

  const save = useCallback(() => {
    form.validateFields().then((value) => {
      onOk({...value, process: processID});
      close();
    });
  }, [processID]);

  return (
    <>
      <Button onClick={open}>
        Process-<span style={{ color: "violet" }}>{processID}</span>
      </Button>
      <Modal title="create SVG" show={show} onClose={close} onOk={save}>
        <Form form={form}>
          <Label htmlFor="dataID" classtype="middle">
            data ID
          </Label>
          <Field name="dataID">
            <Input placeholder="" type="text" />
          </Field>
          <Label htmlFor="saveID" classtype="middle">
            save ID
          </Label>
          <Field name="saveID">
            <Input placeholder="" type="text" />
          </Field>
        </Form>
      </Modal>
    </>
  );
};

export default ProcessDataModal;
