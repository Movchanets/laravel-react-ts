
import { Dispatch } from "redux";
import { ProductActionTypes, ProductActions, IProductResponse, IProductSearch } from './types';
import http from '../../../http_common';

export const GetProductList = (search: IProductSearch) => async (dispatch: Dispatch<ProductActions>) => {
	try {
		const resp = await http.get<IProductResponse>("/api/products", { params: search });
		const { data } = resp;
		console.log(data);
		dispatch({
			type: ProductActionTypes.PRODUCT_LIST,
			payload: {
				list: data.data,
				count_pages: data.last_page,
				current_page: data.current_page,
				total: data.total
			}
		});
	} catch (error) {
		dispatch({
			type: ProductActionTypes.SERVER_USER_ERROR,
			payload: "Unknown error",
		});
	}
}
// export const LoadProducts = (name: string = '', page: number = 1) => {
// 	return async (dispatch: Dispatch<ProductActions>) => {
// 		try {

// 			dispatch({ type: ProductActionTypes.PRODUCT_ADD });

// 			const data = v
// 			dispatch({
// 				type: ProductActionTypes.PRODUCT_LIST,
// 				list: data.data.data,
// 				pages: data.data.last_page
// 			});
// 		}
// 		catch (e) {
// 			
// 		}
// 	};
// };
export const CreateProduct = (post: any) => {
	return async (dispatch: Dispatch<ProductActions>) => {
		try {

			dispatch({ type: ProductActionTypes.PRODUCT_ADD });
			console.log("post", post)
			const data = await http.post("/api/add", post)
			console.log(data.data);


			if (!data.data.success) {
				dispatch({
					type: ProductActionTypes.ERROR_MSG,
					payload: data.data.message,
				});

			} else {
				dispatch({
					type: ProductActionTypes.PRODUCT_ADD_SUCCESS,
					payload: data.data.message,

				});


			}
		} catch (e) {
			dispatch({
				type: ProductActionTypes.SERVER_USER_ERROR,
				payload: "Unknown error",
			});
		}
	};
};
export const DeleteProduct = (id: number | null) => {
	return async (dispatch: Dispatch<ProductActions>) => {
		try {
			dispatch({ type: ProductActionTypes.PRODUCT_DELETE });

			const data = await http.delete('api/delete/' + id);


			if (!data.data.success) {
				dispatch({
					type: ProductActionTypes.ERROR_MSG,
					payload: data.data.message,
				});

			} else {
				dispatch({
					type: ProductActionTypes.DELETE_SUCCESS,
					message: data.data.message,


				});



			}
		} catch (e) {
			dispatch({
				type: ProductActionTypes.SERVER_USER_ERROR,
				payload: "Unknown error",
			});
		}
	};
};