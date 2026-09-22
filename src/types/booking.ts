export type BookingFieldType = "text" | "email" | "tel" | "textarea" | "date" | "time" | "number" | "file";

export interface BookingField {
  name: string;
  label: string;
  type: BookingFieldType;
  required?: boolean;
  placeholder?: string;
  /** For file fields: shown as helper copy under the input. */
  helperText?: string;
  /** Textareas render taller with this many rows. */
  rows?: number;
}

export interface BookingFormConfig {
  id: "tattoo" | "airbrush" | "halloween";
  label: string;
  intro: string;
  fields: BookingField[];
}
