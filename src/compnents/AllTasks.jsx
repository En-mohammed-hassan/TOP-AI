import { Menu, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import ShowTasks from "./ShowTasks";

const AllTasks = () => {
	return (
		<div>
			<Menu theme="dark" mode="horizontal">
				<Menu.Item key="logout">Logout</Menu.Item>

				<Menu.Item key="show-tasks">
					<NavLink to="/" style={{ "text-decoration": "none" }}>
						Task Managment
					</NavLink>
				</Menu.Item>
			</Menu>
			<ShowTasks></ShowTasks>
		</div>
	);
};
export default AllTasks;
