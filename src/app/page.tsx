"use client";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";

export default function LoginPage() {
	const AuthAPI =
		"https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
	const API = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";
	const username = useRef<HTMLInputElement | null>(null);
	const password = useRef<HTMLInputElement | null>(null);
	const router = useRouter();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			router.push("/home");
		}
	}, []);
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			(username.current && !username.current.value) ||
			(password.current && !password.current.value)
		) {
			alert("Please fill in all fields");
			return;
		} else if (
			username.current &&
			username.current.value &&
			password.current &&
			password.current.value
		) {
			var myHeaders = new Headers();
			myHeaders.append("Accept", "*/*");
			myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
			myHeaders.append("Access-Control-Allow-Headers", "Content-Type");

			var raw = JSON.stringify({
				login_id: "test@sunbasedata.com",
				password: "Test@123",
			});

			fetch("/api", { method: "POST", headers: myHeaders, body: raw })
				.then((response) => response.json())
				.then((result) => {
					localStorage.setItem("token", result.access_token);
					window.location.reload();
				})
				.catch((error) => console.log("error", error));
		}
	};
	return (
		<div className={styles.loginPage}>
			<div className={styles.loginForm}>
				<div className={styles.loginFormHeader}>Login</div>

				<form className={styles.loginFormBody} onSubmit={handleSubmit}>
					<input
						ref={username}
						className={styles.loginFormInput}
						type="text"
						placeholder="Username"
					/>
					<input
						ref={password}
						className={styles.loginFormInput}
						type="password"
						placeholder="Password"
					/>
					<button className={styles.loginFormButton} type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
