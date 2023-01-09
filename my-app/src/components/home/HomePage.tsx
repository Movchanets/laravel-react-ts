import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import { IProductItem } from "./store/types";
import { Link } from 'react-router-dom';
import { useActions } from './store/useActions';
import './style.css';
const HomePage = () => {

    const { list, pages } = useTypedSelector(store => store.product);
    const dispatch = useDispatch();
    const { DeleteProduct, LoadProducts } = useActions();
    const [Input, setInput] = useState("");
    useEffect(() => {

        LoadProducts();


    }, []);

    const data = list.map(product => (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.detail}</td>
            <td><button onClick={async () => {
                DeleteProduct(product.id);
                LoadProducts();

            }}>Delete</button></td>
        </tr>
    ));

    return (

        <>

            <h1 className="text-center">Головна сторінка</h1>
            <div className='d-flex'>
                <Link to="/add-product" className='col-6'>
                    <button className='btn btn-primary'>
                        Create Product
                    </button>
                </Link>
                <div className="input-group col-6">
                    <div className="container">
                        <div className="search">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="search-1"> <i className='bx bx-search-alt'></i>
                                        <input type="text" placeholder="write here" onChange={(e) => { setInput(e.target.value); }} /> </div>
                                </div> <div className="col-md-6"> <div> <div className="search-2"> <i className='bx bxs-map' ></i>
                                    <button onClick={() => { LoadProducts(Input); console.log('s'); }} >Search</button> </div> </div> </div> </div> </div>
                    </div>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                    }
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {(() => {
                        let data = [];
                        for (let i = 1; i <= pages; i++) {
                            data.push(<li className="page-item" onClick={() => LoadProducts(Input, i)} key={i}><a className="page-link" key={i} href="#">{i}</a></li>);
                        }
                        return data;
                    })()}


                </ul>
            </nav>
        </>
    );
}

export default HomePage;