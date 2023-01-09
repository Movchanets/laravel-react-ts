
import { Dispatch } from "redux";
import { ProductActionTypes, ProductActions } from './types';
import http from '../../../http_common';



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
					type: ProductActionTypes.CREATE_SUCCESS,
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