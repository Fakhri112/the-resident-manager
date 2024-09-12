interface IHouseModal {
	addHouse: boolean;
	editHouse: boolean;
	deleteHouse: boolean;
	residentList: boolean;
}

interface IPayment {
	ids: number[];
	bill_payer: string;
	amount_paid: string;
	payment_status: "Belum Lunas" | "Lunas" | string;
	new_bill_date: string;
	payment_name: string;
	start_bill_date: string;
	description: string;
	house_id: number;
	created_at: string;
	updated_at: string;
}

interface IHouse {
	id: number;
	house_id: number;
	resident_id?: number;
	address: string;
	number: string;
	payment_type: "Monthly" | "Yearly" | string;
	occupancy_status: "Occupied" | "Unoccupied" | string;
	created_at: string;
	updated_at: string;
	full_name?: string;
	ktp_photo?: string;
	residency_status?: "Permanent" | "Contract";
	phone_number?: string;
	marital_status?: "Married" | "Single";
	payment: IPayment[];
}

interface IResident {
	id: number;
	full_name: string;
	ktp_photo: string;
	residency_status: "Contract" | "Permanent" | string;
	phone_number: string;
	marital_status: "Single" | "Married" | string;
	created_at: string;
	updated_at: string;
}

interface IEditBill {
	numberIncrement: number;
	satpam: number;
	kebersihan: number;
	initialPrice: string;
}

interface IChoosedResident {
	id: number;
	full_name: string;
}

export type {
	IEditBill,
	IChoosedResident,
	IResident,
	IHouse,
	IHouseModal,
	IPayment,
};
