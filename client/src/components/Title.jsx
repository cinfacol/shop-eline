import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Title = ({ title, description, keywords }) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Helmet>
		</HelmetProvider>

	);
};

Title.defaultProps = {
	title: "Welcome to Shop Eline",
	description: "We sell the best products in town",
	keywords: "product, shop eline, best value and quality",
};

export default Title;
