import React, { useState, Fragment, useCallback } from "react";
import { Button, Input, Label } from "../../base-components/BaseComponents";
import Modal from "../../base-components/Modal";
import { useMemo } from "react";
import Form, { Field } from "rc-field-form";
import Select from "../../base-components/Select";

export interface PretretmentFormData {
  id: string;
  pretretments: Array<string>;
}

interface CreatePretretmentDialogProps {
  onOk: (config: PretretmentFormData) => void;
}

const CreatePretretmentDialog: React.FC<CreatePretretmentDialogProps> = (
  props
) => {
  const { onOk } = props;
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
      onOk(value);
      close();
      setShow(false);
    });
  }, []);

  return (
    <div className=" mt-2">
      <Button onClick={open}>Add Data Pretretment</Button>
      <Modal
        title="Add Data Pretretment"
        show={show}
        onClose={close}
        onOk={save}
      >
        <Form
          form={form}
          onValuesChange={(_, values) => {
            console.log("values:", values);
          }}
        >
          <Label htmlFor="id" classtype="middle">
            id
          </Label>
          <Field name="id">
            <Input placeholder="unique id" type="text" />
          </Field>
          <Form.List name="pretretments" initialValue={[]}>
            {(fields, { add, remove }, { errors }) => {
              return (
                <div className=" mt-2">
                  {fields.map((field, index) => {
                    return (
                      <Field name={field.name} key={field.key}>
                        {(control) => (
                          <div className=" relative flex justify-between items-center">
                            <Select
                              {...control}
                              options={[
                                {
                                  title: "JSON.parse",
                                  value: "JSON.parse",
                                },
                              ]}
                            />
                            <a onClick={() => remove(index)}>remove</a>
                          </div>
                        )}
                      </Field>
                    );
                  })}
                  <Button className=" mt-2" onClick={add}>
                    add
                  </Button>
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePretretmentDialog;
