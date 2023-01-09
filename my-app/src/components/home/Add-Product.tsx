import axios from 'axios';
import React, { useState } from 'react'
import http from '../../http_common';
import { useActions } from './store/useActions';
import { Navigate, redirect } from 'react-router-dom';



const AddProduct = () => {
	const { CreateProduct } = useActions();
	const [name, setName] = useState('');
	const [detail, setDescr] = useState('');
	const [created, setCreated] = useState(false)
	const AddProduct = async () => {

		await CreateProduct({ name: name, detail: detail });
		setCreated(true);
	}
	if (created) {
		return (<Navigate to="/" />);
	}
	else {
		return (

			<>
				<div className="form-group m-2">
					<label htmlFor="name">Name</label>
					<input type="text" className="form-control" id="name" onChange={(e) => { setName(e.target.value) }} placeholder="Enter Name" />
				</div>
				<div className="form-group m-2">
					<label htmlFor="descr">Description</label>
					<input type="text" className="form-control" id="descr" onChange={(e) => { setDescr(e.target.value) }} placeholder="Enter description" />
				</div>

				<button onClick={() => { AddProduct(); }} className="btn btn-primary m-2">Submit</button>
			</>

		);
	}
}
export default AddProduct;