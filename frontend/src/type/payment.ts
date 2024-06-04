interface IPaymentModal {
	sendBill: boolean;
	expense: boolean;
}

interface IReportSummary {
	income_sum: number;
	expense_sum: number;
	balance: number;
	date: string;
	items: IReport[];
}

interface IReport {
	id: number;
	income_date: string;
	expense_date: string;
	income_description: string;
	expense_description: string;
	income_amount: string;
	expense_amount: string;
	created_at: string;
	updated_at: string;
}

export type { IPaymentModal, IReport, IReportSummary };
