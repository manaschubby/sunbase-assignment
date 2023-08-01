"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import styles from "./page.module.css";

export interface IAppProps {}

export default function App(props: IAppProps) {
	const router = useRouter();
	const [token, setToken] = React.useState<string>("");
	const [currentCustomer, setCurrentCustomer] = React.useState<any>({});
	const [customers, setCustomers] = React.useState<any[]>([]);
	const [addModal, setAddModal] = React.useState<boolean>(false);
	const [editModal, setEditModal] = React.useState<boolean>(false);
	const first_name = React.useRef<HTMLInputElement | null>(null);
	const last_name = React.useRef<HTMLInputElement | null>(null);
	const address = React.useRef<HTMLInputElement | null>(null);
	const street = React.useRef<HTMLInputElement | null>(null);
	const city = React.useRef<HTMLInputElement | null>(null);
	const state = React.useRef<HTMLInputElement | null>(null);
	const phone = React.useRef<HTMLInputElement | null>(null);
	const email = React.useRef<HTMLInputElement | null>(null);
	React.useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			router.push("/");
			return () => {};
		}
		setToken(token);
		axios
			.get("/api/customers", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setCustomers(response.data);
				return response;
			})
			.catch((error) => {
				console.log(error);
				return error;
			});
	}, []);

	React.useEffect(() => {
		if (editModal && currentCustomer) {
			first_name.current!.value = currentCustomer.first_name;
			last_name.current!.value = currentCustomer.last_name;
			address.current!.value = currentCustomer.address;
			street.current!.value = currentCustomer.street;
			city.current!.value = currentCustomer.city;
			state.current!.value = currentCustomer.state;
			phone.current!.value = currentCustomer.phone;
			email.current!.value = currentCustomer.email;
		}
	}, [editModal, currentCustomer]);

	const handleDelete = (uuid: string) => {
		axios
			.post("/api/customers", {
				token: token,
				cmd: "delete",
				data: {
					uuid: uuid,
				},
			})
			.then((response) => {
				console.log(response.data);
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};
	// Table of customers
	/*
        Example of a customer:
        "uuid": "test2d8b24d6e785421cbb4f4b9684da2ca0",
        "first_name": "Jane",
        "last_name": "Doe",
        "street": "Elvnu Street",
        "address": "H no 2 ",
        "city": "Delhi",
        "state": "Delhi",
        "email": "sam@gmail.com",
        "phone": "12345678"
    */
	return (
		<div className={styles.page}>
			{addModal && (
				<div className={styles.addModal}>
					<div className={styles.addModalHeader}>Add Customer</div>
					<form
						className={styles.addModalForm}
						onSubmit={(e) => {
							e.preventDefault();
							axios
								.post("/api/customers", {
									token: token,
									cmd: "create",
									data: {
										first_name: first_name.current?.value,
										last_name: last_name.current?.value,
										address: address.current?.value,
										street: street.current?.value,
										city: city.current?.value,
										state: state.current?.value,
										phone: phone.current?.value,
										email: email.current?.value,
									},
								})
								.then((response) => {
									console.log(response.data);
									window.location.reload();
									setAddModal(false);
								})
								.catch((error) => {
									console.log(error);
								});
						}}
					>
						<input
							ref={first_name}
							className={styles.addModalInput}
							title={"First Name is required"}
							required
							placeholder="First Name"
						/>
						<input
							ref={last_name}
							className={styles.addModalInput}
							required
							placeholder="Last Name"
						/>
						<input
							ref={address}
							required
							className={styles.addModalInput}
							placeholder="Address"
						/>
						<input
							ref={street}
							required
							className={styles.addModalInput}
							placeholder="Street"
						/>
						<input
							ref={city}
							required
							className={styles.addModalInput}
							placeholder="City"
						/>
						<input
							ref={state}
							required
							className={styles.addModalInput}
							placeholder="State"
						/>
						<input
							ref={phone}
							required
							className={styles.addModalInput}
							placeholder="Phone"
						/>
						<input
							ref={email}
							required
							className={styles.addModalInput}
							placeholder="Email"
						/>
						<button className={styles.addModalButton} type="submit">
							Add
						</button>
					</form>
					<div className={styles.addModalFooter}>
						<button
							className={styles.addModalButton}
							onClick={() => setAddModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
			{editModal && (
				<div className={styles.addModal}>
					<div className={styles.addModalHeader}>Edit Customer</div>
					<form
						className={styles.addModalForm}
						onSubmit={(e) => {
							e.preventDefault();
							axios
								.post("/api/customers", {
									token: token,
									cmd: "update",
									data: {
										uuid: currentCustomer.uuid,
										first_name: first_name.current?.value,
										last_name: last_name.current?.value,
										address: address.current?.value,
										street: street.current?.value,
										city: city.current?.value,
										state: state.current?.value,
										phone: phone.current?.value,
										email: email.current?.value,
									},
								})
								.then((response) => {
									console.log(response.data);
									window.location.reload();
									setEditModal(false);
								})
								.catch((error) => {
									console.log(error);
								});
						}}
					>
						<input
							ref={first_name}
							className={styles.addModalInput}
							title={"First Name is required"}
							required
							placeholder="First Name"
						/>
						<input
							ref={last_name}
							className={styles.addModalInput}
							required
							placeholder="Last Name"
						/>
						<input
							ref={address}
							required
							className={styles.addModalInput}
							placeholder="Address"
						/>
						<input
							ref={street}
							required
							className={styles.addModalInput}
							placeholder="Street"
						/>
						<input
							ref={city}
							required
							className={styles.addModalInput}
							placeholder="City"
						/>
						<input
							ref={state}
							required
							className={styles.addModalInput}
							placeholder="State"
						/>
						<input
							ref={phone}
							required
							className={styles.addModalInput}
							placeholder="Phone"
						/>
						<input
							ref={email}
							required
							className={styles.addModalInput}
							placeholder="Email"
						/>
						<button className={styles.addModalButton} type="submit">
							Update
						</button>
					</form>
					<div className={styles.addModalFooter}>
						<button
							className={styles.addModalButton}
							onClick={() => setEditModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
			<div className={styles.header}>
				<button
					className={styles.headerButton}
					onClick={() => {
						setAddModal(true);
					}}
				>
					Add Customer
				</button>

				<div className={styles.headerTitle}>Customers</div>
			</div>
			<div className={styles.bodyTable}>
				<table>
					<thead>
						<tr>
							<th>Customer First Name</th>
							<th>Customer Last Name</th>
							<th>Customer Address</th>
							<th>Customer Street</th>
							<th>Customer City</th>
							<th>Customer State</th>
							<th>Customer Phone</th>
							<th>Customer Email</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{customers.map((customer, index) => {
							return (
								<tr key={index}>
									<td>{customer.first_name}</td>
									<td>{customer.last_name}</td>
									<td>{customer.address}</td>
									<td>{customer.street}</td>
									<td>{customer.city}</td>
									<td>{customer.state}</td>
									<td>{customer.phone}</td>
									<td>{customer.email}</td>
									<td>
										<button
											className={styles.tableButton}
											onClick={() => {
												setEditModal(true);
												setCurrentCustomer(customer);
											}}
										>
											Edit
										</button>
										<button
											className={styles.tableButton}
											onClick={() => {
												handleDelete(customer.uuid);
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
