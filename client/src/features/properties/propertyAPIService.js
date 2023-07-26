import axios from "axios";

//get properties
const getProperties = async () => {
	const response = await axios.get("/api/properties/all/");
	return response.data;
};

const propertyAPIService = { getProperties };

export default propertyAPIService;
