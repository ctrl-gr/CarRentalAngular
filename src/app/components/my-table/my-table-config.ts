export interface MyHeaders {
  key: string
  label: string
}

export interface MyTableConfig {
  headers: MyHeaders[]
  order: MyOrder
  search: MySearch
  pagination: MyPagination
  actions: MyAction[]
}

export interface MyOrder {
  defaultColumn: string
  orderType: string
}

export interface MySearch {
  columns: string[]
}

export interface MyPagination {
  itemPerPage: number
  itemPerPageOptions: number[]
}

export enum MyTableActionEnum {
  EDIT = 'edit',
  DELETE = 'delete',
  APPROVE = 'approve',
  NEW_ROW = 'new-row'
}

export interface MyAction {
  text: string
  cssClass: string
  actionType: MyTableActionEnum
  icon?: string
  onTop: boolean

}

