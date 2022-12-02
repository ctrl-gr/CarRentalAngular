export interface MyButtonConfig {
  customCssClass: string
  text: string
  icon?: string
  type?: string
  isDisabled?: boolean
}

export const SuccessButton: MyButtonConfig = {
  customCssClass: 'primary',
  text: 'Successo'
}
