import React from "react";
import TasksManagment from "./TasksManagment";
import { Menu, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({ setToken }) => {
	const handleLogout = (event) => {
		setToken(0);
	};

	return (
		<div className="">
			<Menu theme="dark" mode="horizontal">
				<Menu.Item key="logout" onClick={handleLogout}>
					Logout
				</Menu.Item>

				<Menu.Item key="show-tasks">
					<NavLink to="/all" style={{ "text-decoration": "none" }}>
						All Tasks
					</NavLink>
				</Menu.Item>
			</Menu>
			<TasksManagment></TasksManagment>
		</div>
	);
};

export default Home;
