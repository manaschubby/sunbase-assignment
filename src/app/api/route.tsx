import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	if (body && body.login_id && body.password) {
		const response = await axios
			.post(
				"https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp",
				{
					login_id: body.login_id,
					password: body.password,
				}
			)
			.then((response) => {
				console.log(response);
				return NextResponse.json(response.data);
			})
			.catch((error) => {
				console.log(error);
				return NextResponse.redirect("/login");
			});

		return response;
	}
}
