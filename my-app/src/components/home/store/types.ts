
export interface IProductItem {
    id: number | null,
    name: string,
    detail: string
}

export interface IProductState {
    list: Array<IProductItem>,
    total: number,
    count_pages: number,
    current_page: number,

}
export interface IProductResponse {
    data: Array<IProductItem>,
    current_page: number,
    total: number,
    last_page: number
}
export interface IProductSearch {
    name?: string,
    page?: number | string | null
    pagination?: number | string | null
}
export enum ProductActionTypes {
    PRODUCT_LIST = "PRODUCT_LIST",
    PRODUCT_ADD = "PRODUCT_ADD",
    PRODUCT_ADD_SUCCESS = "PRODUCT_ADD_SUCCESS",
    PRODUCT_DELETE = "PRODUCT_DELETE",

    CREATE_SUCCESS = "CREATE_SUCCESS",
    DELETE_SUCCESS = "DELETE_SUCCESS",
    ERROR_MSG = "ERROR_MSG",
    SERVER_USER_ERROR = "SERVER_USER_ERROR"
}

interface Error_MSG {
    type: ProductActionTypes.ERROR_MSG,
    payload: any
}
interface GetProductAction {
    type: ProductActionTypes.PRODUCT_LIST
    payload: IProductState
}


interface ServerUserErrorAction {
    type: ProductActionTypes.SERVER_USER_ERROR,
    payload: any
}
interface ProductADDAction {
    type: ProductActionTypes.CREATE_SUCCESS,
    payload: any,

}

interface CreateProductActionSuccess {
    type: ProductActionTypes.PRODUCT_ADD,


}
interface DeleteProductActionSuccess {
    type: ProductActionTypes.DELETE_SUCCESS,
    message: string
}
interface PRODUCT_ADD_SUCCESS {
    type: ProductActionTypes.PRODUCT_ADD_SUCCESS,
    payload: string
}
interface DeleteProductAction {
    type: ProductActionTypes.PRODUCT_DELETE,

}
export type ProductActions = Error_MSG
    | ServerUserErrorAction
    | CreateProductActionSuccess
    | ProductADDAction
    | DeleteProductActionSuccess
    | DeleteProductAction
    | PRODUCT_ADD_SUCCESS
    | GetProductAction
