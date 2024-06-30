import { useEffect, useState } from "react";
import { List, Button, Input, Modal, Form } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const ShowTasks = () => {
	// define state for tasks
	const [tasks, setTasks] = useState([]);
	// fetch tasks from API
	const fetchTasks = async () => {
		try {
			const response = await fetch("http://react-test.mhd-hasan.com/api/tasks");
			const data = await response.json();
			setTasks(data);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};
	// fetch api on evrey render
	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className="p-3">
			<List
				className=" mt-3"
				bordered
				dataSource={tasks}
				renderItem={(item) => <List.Item>{item.title}</List.Item>}
			/>
		</div>
	);
};

export default ShowTasks;
