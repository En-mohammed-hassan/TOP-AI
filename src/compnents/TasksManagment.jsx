import { useEffect, useState } from "react";
import { List, Button, Input, Modal, Form } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const TasksManagment = () => {
	const [tasks, setTasks] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentTask, setCurrentTask] = useState(null);
	const [form] = Form.useForm();

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

	useEffect(() => {
		fetchTasks();
	}, []);

	const handleAddTask = async (values) => {
		try {
			await fetch("http://react-test.mhd-hasan.com/api/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title: values.task }),
			});
			await fetchTasks(); // Fetch updated tasks list
		} catch (error) {
			console.error("Error adding task:", error);
		}
	};

	const handleDeleteTask = async (key) => {
		try {
			await fetch(`http://react-test.mhd-hasan.com/api/tasks/${key}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			await fetchTasks(); // Fetch updated tasks list
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	const handleEditTask = (task) => {
		setCurrentTask(task);
		form.setFieldsValue({ task: task.title });
		setIsModalVisible(true);
	};

	const handleUpdateTask = async (values) => {
		try {
			await fetch(
				`http://react-test.mhd-hasan.com/api/tasks/${currentTask.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ title: values.task }),
				}
			);
			setIsModalVisible(false);
			setCurrentTask(null);
			form.resetFields();
			await fetchTasks(); // Fetch updated tasks list
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	return (
		<div className="p-3 ">
			<Form form={form} layout="inline" onFinish={handleAddTask}>
				<Form.Item
					name="task"
					rules={[{ required: true, message: "Please input your task!" }]}
				>
					<Input placeholder="New task" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add Task
					</Button>
				</Form.Item>
			</Form>

			<List
				bordered
				dataSource={tasks}
				renderItem={(item) => (
					<List.Item
						actions={[
							<Button type="link" onClick={() => handleEditTask(item)}>
								Edit
							</Button>,
							<Button type="link" onClick={() => handleDeleteTask(item.id)}>
								Delete
							</Button>,
						]}
					>
						{item.title}
					</List.Item>
				)}
				style={{ marginTop: "20px" }}
			/>

			<Modal
				title="Edit Task"
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<Form form={form} layout="vertical" onFinish={handleUpdateTask}>
					<Form.Item
						name="task"
						rules={[{ required: true, message: "Please input your task!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Update
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default TasksManagment;
