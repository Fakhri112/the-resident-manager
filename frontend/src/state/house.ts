const houseModal = {
	addHouse: false,
	editHouse: false,
	deleteHouse: false,
	residentList: false,
};

const intialResidentData = [
	{
		id: 0,
		full_name: "",
		ktp_photo: "",
		residency_status: "",
		phone_number: "",
		marital_status: "",
		created_at: "",
		updated_at: "",
	},
];

const initialHouseData = [
	{
		id: 0,
		house_id: 0,
		address: "",
		number: "",
		payment_type: "Monthly",
		occupancy_status: "Occupied",
		created_at: "",
		updated_at: "",
		payment: [],
	},
];

const initialChoosedResidentData = {
	id: 0,
	full_name: "",
};

export {
	initialChoosedResidentData,
	intialResidentData,
	initialHouseData,
	houseModal,
};
