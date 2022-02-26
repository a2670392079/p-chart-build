import React, { useContext, useReducer } from "react";
import { useMemo } from "react";

interface FormContextProps {
    form:FormController
}
export const FormContext = React.createContext<FormContextProps>({} as any);

interface ReducerAction {
  type: "update" | "mount" | "delete";
  payload: {
    name: string;
    value?: any;
  };
}

type FormReducer<T> = (state: Map<string, any>, action: T) => typeof state;

class FormController {
  public dispatch: React.Dispatch<ReducerAction>;
  formData: Map<string, any>;

  constructor(
    dispatch: React.Dispatch<ReducerAction>,
    formData: Map<string, any>
  ) {
    this.dispatch = dispatch;
    this.formData = formData;
  }

  public getFormValue() {
    const obj = Object.create(null);
    for (let [k, v] of this.formData) {
      obj[k] = v;
    }
    return obj;
  }

  public setFormValue(values: Record<string, any>) {
    const keys = Object.keys(values);
    for (let i = 0; i < keys.length; i++) {
      this.dispatch({
        type: "update",
        payload: {
          name: keys[i],
          value: values[keys[i]],
        },
      });
    }
  }

  public deleteFormValue(name: string) {
    return this.dispatch({
      type: "delete",
      payload: {
        name,
      },
    });
  }
}

const useForm = (initState: Record<string, any>) => {
  const [formData, dispatch] = useReducer<FormReducer<ReducerAction>>(
    (state, action) => {
      const {
        type,
        payload: { name, value },
      } = action;
      if (type === "update") {
        state.set(name, value);
      }
      if (state.has(name) && type === "delete") {
        state.delete(name);
      }

      if (state.has(name) && type === "mount") {
        throw Error(`${name} already exists in the form!`);
      }
      return state;
    },
    new Map()
  );

  const formController = useMemo(() => {
    const r = new FormController(dispatch, formData);
    r.setFormValue(initState);
    return r;
  }, []);
  return [formController];
};

interface FormProps {
  form?: FormController;
  initValue?: Record<string, any>;
}

const Form: React.FC<FormProps> = (props) => {
  const { form: outForm, initValue = {} } = props;
  const [inForm] = useForm(initValue);

  const form = useMemo(() => {
    if (outForm) {
      outForm.setFormValue(initValue);
      return outForm;
    }
    return inForm;
  }, []);


  return (
    <FormContext.Provider value={{
        form
    }}>
      <div></div>
    </FormContext.Provider>
  );
};
