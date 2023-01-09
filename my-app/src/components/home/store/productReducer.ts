import { Action } from '@remix-run/router';
import { IProductState, ProductActionTypes } from './types';

const initialState: IProductState = {
    list: [],
    pages: 0
};

export const productReducer = (state = initialState, action: any): IProductState => {
    switch (action.type) {
        case ProductActionTypes.PRODUCT_LIST: {
            return {
                ...state,
                list: [...action.list],
                pages: action.pages
            }
        }
        case ProductActionTypes.PRODUCT_ADD: {
            return {
                ...state
            }
        }
        default:
            return state;
    }
}