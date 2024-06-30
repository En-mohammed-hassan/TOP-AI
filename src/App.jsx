import LogIn from "./compnents/LogIn";
import AllTasks from "./compnents/AllTasks";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./compnents/SignUp";
import Home from "./compnents/Home";
import Foot from "./compnents/Foot";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const [token, setToken] = useState(
		window.localStorage.getItem("token") !== null
			? window.localStorage.getItem("token")
			: 0
	);

	useEffect(() => {
		window.localStorage.setItem("token", token);
	}, [token]);

	return (
		<div className="bg-body-secondary container-fluid vh-100 ">
			<div>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								token == 0 ? (
									<LogIn setToken={setToken}></LogIn>
								) : (
									<Home setToken={setToken}></Home>
								)
							}
						></Route>
						<Route
							path="/all"
							element={
								token == 0 ? (
									<LogIn setToken={setToken}></LogIn>
								) : (
									<AllTasks></AllTasks>
								)
							}
						></Route>
						<Route
							path="/login"
							element={
								token == 0 ? (
									<LogIn setToken={setToken}></LogIn>
								) : (
									<Home setToken={setToken}></Home>
								)
							}
						></Route>
						<Route
							path="/sign"
							element={
								token == 0 ? (
									<SignUp setToken={setToken}></SignUp>
								) : (
									<Home setToken={setToken}></Home>
								)
							}
						></Route>
					</Routes>
				</BrowserRouter>
			</div>
			<div className="fixed-bottom">
				<Foot></Foot>
			</div>
		</div>
	);
};
export default App;
