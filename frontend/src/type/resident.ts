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
interface IResidentModal {
	addResident: boolean;
	editResident: boolean;
	deleteResident: boolean;
}

export type { IResident, IResidentModal };
