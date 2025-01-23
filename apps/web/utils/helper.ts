import type { FieldValues } from "react-hook-form";

export const filterChangedFormFields = <T extends FieldValues>(
  allFields: T,
  dirtyFields: Partial<Record<keyof T, boolean>>
): Partial<T> => {
  const changedFieldValues = Object.keys(dirtyFields).reduce(
    (acc, currentField) => {
      return {
        ...acc,
        [currentField]: allFields[currentField],
      };
    },
    {} as Partial<T>
  );

  return changedFieldValues;
};

export const Debounce_Delay = 500; //milliseconds

export const filterSearchParams = (searchText: string | null) => {
  if (searchText) {
    return {
      search: {
        filter: searchText,
      },
    };
  }

  return { search: {} };
};
