import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import { IProductItem, IProductSearch } from "./store/types";
import { Link, useSearchParams } from 'react-router-dom';
import { useActions } from './store/useActions';
import './style.css';
import classNames from 'classnames';
import qs from 'qs';
import { useFormik } from "formik";
const HomePage = () => {

    const { list, count_pages, current_page, total } = useTypedSelector(store => store.product);
    const dispatch = useDispatch();
    const { DeleteProduct, GetProductList } = useActions();
    const [searchParams, setSearchParams] = useSearchParams();
    const [Search, setSearch] = useState<IProductSearch>({
        name: searchParams.get("name") || "",
        page: searchParams.get("page") || 1,
        pagination: searchParams.get("pagination") || 2,
    });
    useEffect(() => {

        GetProductList(Search);


    }, [Search]);
    function filterNonNull(obj: IProductSearch) {
        return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
    }
    const Content = list.map(product => (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.detail}</td>
            <td><button onClick={async () => {
                DeleteProduct(product.id);
                GetProductList(Search);

            }}>Delete</button></td>
        </tr>
    ));
    const onSubmit = (values: IProductSearch) => {
        const filter = { ...values, page: 1 };
        setSearchParams(qs.stringify(filterNonNull(filter)));
        setSearch(filter);
    }
    const formik = useFormik({
        initialValues: Search,
        onSubmit: onSubmit,
    });

    const { handleSubmit, values, handleChange } = formik;
    return (

        <>

            <h1 className="text-center">Головна сторінка</h1>
            <div className='d-flex'>
                <Link to="/add-product" className='col-6'>
                    <button className='btn btn-primary'>
                        Create Product
                    </button>
                </Link>
                <div className=' col-4'>
                    <select className="form-select" defaultValue={2} onChange={(e) => { setSearch({ ...Search, pagination: e.target.value }); }} aria-label="Default select example">

                        <option value="1">2</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>

            </div>
            <div >

                <form className='col-12 d-flex' onSubmit={handleSubmit}>
                    <div className="col-8">

                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder='Write here'
                            onChange={handleChange}
                            value={values.name}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary h-50 col-4">
                        Пошук
                    </button>
                </form>
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
                    {Content
                    }
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {(() => {
                        let data = [];

                        for (let i = 1; i <= count_pages; i++) {
                            data.push(<li key={i} className="page-item">
                                <Link
                                    className={classNames("page-link", { active: current_page === i })}
                                    onClick={() => setSearch({ ...Search, page: i })}
                                    to={"?" + qs.stringify(filterNonNull({ ...Search, page: i }))}
                                >
                                    {i}
                                </Link>
                            </li>);
                        }
                        return data;
                    })()}


                </ul>
            </nav>
        </>
    );
}

export default HomePage;