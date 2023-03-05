import Layout from "../hocs/Layout";
import Banner from "../components/Banner";
import Title from "../components/Title";

const HomePage = () => {
	return (
		<Layout>
			<div className="text-blue-500">
				<Title />
				<Banner />
			</div>
		</Layout>
	);
};

export default HomePage;
