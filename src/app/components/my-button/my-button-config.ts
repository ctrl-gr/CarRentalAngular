export interface MyButtonConfig {
  customCssClass: string
  text?: string
  icon?: string
  type?: string
  isDisabled?: boolean
}


export const ArrowUpButton: MyButtonConfig = {
  customCssClass: 'primary',
  icon: 'arrow_upward'
}

export const ArrowDownButton: MyButtonConfig = {
  customCssClass: 'primary',
  icon: 'arrow_downward'
}

export const ArrowBackButton: MyButtonConfig = {
  customCssClass: 'primary',
  icon: 'arrow_back'
}

export const ArrowForwardButton: MyButtonConfig = {
  customCssClass: 'primary',
  icon: 'arrow_forward'
}

