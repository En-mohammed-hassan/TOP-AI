import { Layout } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const { Footer } = Layout;

const Foot = () => {
	return (
		<Footer className="text-center">
			<div>
				<span>&copy; 2024 MHD HASSAN</span>
				<span className="mx-3">|</span>
				<a
					style={{ textDecoration: "none" }}
					href="https://github.com/En-mohammed-hassan"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				<span className="mx-3">|</span>
				<a
					style={{ textDecoration: "none" }}
					href="https://portfolio.mhd-hasan.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Portfolio
				</a>
			</div>
		</Footer>
	);
};

export default Foot;
