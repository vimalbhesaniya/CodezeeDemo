import type { ReactNode } from "react";

export type DialogTypes = "add" | "edit" | "delete";

export type DialogRenderer = { [key in DialogTypes]?: ReactNode };
