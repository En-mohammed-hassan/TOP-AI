import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, redirectDocument } from "react-router-dom";

const SignUp = ({ setToken }) => {
	const [msg, setMsg] = useState("");

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		const response = await fetch(
			"http://react-test.mhd-hasan.com/api/register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			}
		);
		try {
			if (response.ok) {
				const data = await response.json();
				setToken(data.token);
				redirectDocument("/");
			} else {
				setMsg("signup  failed try again");
			}
		} catch (error) {
			setMsg("signup  failed try again");
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
					name="name"
					rules={[{ required: true, message: "Please input your Username!" }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
						type="text"
						name="name"
						value={formData.username}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item
					name="email"
					rules={[{ required: true, message: "Please input your Username!" }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="email"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
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
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item
					name="confirmPassword"
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						name="password_confirmation"
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item>{msg}</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="me-5">
						Sign Up
					</Button>
					<Button type="primary" htmlType="submit" className="ms-5">
						<NavLink
							to="/login"
							className=""
							style={{ "text-decoration": "none" }}
						>
							Log in !
						</NavLink>
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default SignUp;
