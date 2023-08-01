import { API } from "@/API";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { token, cmd, data } = body;
	if (token && cmd && data) {
		if (cmd === "delete") {
			const response = await axios
				.post(
					API + "?cmd=" + cmd + "&uuid=" + data.uuid,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					return NextResponse.json(response.data);
				})
				.catch((error) => {
					console.log(error);
					return NextResponse.error();
				});
			return response;
		}
		if (cmd === "update") {
			const response = await axios
				.post(API + "?cmd=" + cmd + "&uuid=" + data.uuid, data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					return NextResponse.json(response.data);
				})
				.catch((error) => {
					console.log(error);
					return NextResponse.error();
				});
			return response;
		}

		const response = await axios
			.post(API + "?cmd=" + cmd, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				return NextResponse.json(response.data);
			})
			.catch((error) => {
				console.log(error);
				return NextResponse.error();
			});
		return response;
	}
}
export async function GET(req: NextRequest) {
	const token = req.headers.get("Authorization");
	const response = await axios
		.get(API + "?cmd=get_customer_list", {
			headers: {
				Authorization: token,
			},
		})
		.then((response) => {
			return NextResponse.json(response.data);
		})
		.catch((error) => {
			console.log(error);
			return NextResponse.redirect("/home");
		});
	return response;
}
