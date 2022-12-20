export class QuestionBase<T> {
  value: T | Date | number | undefined;
  key: string;
  label?: string;
  required: boolean;
  order?: number;
  controlType?: string;
  type?: string | Date | number;
  options?: { key: string, value: string }[];

  constructor(options: {
    value?: T | Date | number;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string | Date | number;
    options?: { key: string, value: string }[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type!;
    this.options = options.options || [];
  }
}
