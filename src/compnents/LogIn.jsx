import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, redirectDocument } from "react-router-dom";

const LogIn = ({ setToken }) => {
	// states for login info
	const [msg, setMsg] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// api request for authenticating
	const handleSubmit = async () => {
		const response = await fetch("http://react-test.mhd-hasan.com/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		try {
			if (response.ok) {
				const data = await response.json();
				setToken(data.token);
			} else {
				setMsg("login failed try again");
			}
		} catch (error) {
			setMsg("login failed try again");
		}
	};

	return (
		<div className=" d-flex justify-content-center align-items-center vh-100 bg-light">
			<Form
				name="login_form "
				className=""
				initialValues={{ remember: true }}
				onFinish={handleSubmit}
			>
				<Form.Item
					name="email"
					rules={[{ required: true, message: "Please input your  email!" }]}
				>
					<Input
						type="email"
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Item>
				<Form.Item>{msg}</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="me-5">
						Log in
					</Button>
					<Button type="primary" htmlType="submit" className="ms-5">
						<NavLink
							to="/sign"
							className=""
							style={{ "text-decoration": "none" }}
						>
							Register now!
						</NavLink>
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LogIn;
