import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import { IProductItem } from "./store/types";
import { Link } from 'react-router-dom';
import { useActions } from './store/useActions';

const HomePage = () => {

    const { list } = useTypedSelector(store => store.product);
    const dispatch = useDispatch();
    const { DeleteProduct } = useActions();
    const getData = async () => {
        http.get<Array<IProductItem>>("/api/products")
            .then((resp) => {
                //console.log("Response data", resp);
                dispatch({ type: "PRODUCT_LIST", payload: resp.data });
            });
    }
    useEffect(() => {
        const fetchData = async () => {
            await getData()
        }
        fetchData()
    }, [list]);


    return (

        <>

            <h1 className="text-center">Головна сторінка</h1>
            <Link to="/add-product">
                <button className='btn btn-primary'>
                    Create Product
                </button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.detail}</td>
                            <td><button onClick={async () => { DeleteProduct(product.id); }}>Delete</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </>
    );
}

export default HomePage;