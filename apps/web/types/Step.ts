import type { TextFieldProps } from "@repo/shared-components";
import type { FieldErrors } from "react-hook-form";
import type { FormType } from "./form";

export type Step = Pick<TextFieldProps<FormType>, "control"> & {
  errors: FieldErrors<FormType>;
  checked?: string[];
};

export type CurrentStepType = 1 | 2 | 3 | 4;

export type TriggerComponent = {
  [key in CurrentStepType]: {
    title: string;
    field: any;
    component: React.ReactNode;
  };
};
