import { TextFieldProps } from "@repo/shared-components";
import { FieldErrors } from "react-hook-form";
import { FormType } from "./form";

export type Step = Pick<TextFieldProps<FormType>, "control"> & {
  errors: FieldErrors<FormType>;
};

export type CurrentStepType = 1 | 2 | 3;

export type TriggerComponent = {
  [key in CurrentStepType]: {
    title: string;
    field: any;
    component: React.ReactNode;
  };
};
