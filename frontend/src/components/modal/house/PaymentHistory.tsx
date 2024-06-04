import React from "react";
import { IHouse } from "../../../type/house";

interface IPaymentHistory {
	handlePaidOff: (ids: number[]) => void;
	selectedData: IHouse;
	viewReportList: boolean;
}

const PaymentHistory = ({
	viewReportList,
	selectedData,
	handlePaidOff,
}: IPaymentHistory) => {
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const month = date.toLocaleString("default", { month: "long" }); // Get full month name
		const year = date.getFullYear();
		return `${month} ${year}`;
	};
	return (
		<div
			className={`flex w-full overflow-auto flex-col items-center ${
				viewReportList ? "" : "hidden"
			}`}>
			<ul className="w-full">
				{selectedData?.payment.map((data, index) => {
					return (
						<li
							key={index}
							className={`items-center p-1 rounded ${
								data.payment_status == "Belum Lunas"
									? "bg-error text-accent-content"
									: "bg-success text-white"
							} mb-5 w-full border flex justify-between`}>
							<div className="">
								<p className=" text-xl font-semibold">
									Total Iuran: {data.amount_paid}
								</p>
								<p className=" text-sm">
									{data.payment_status == "Belum Lunas"
										? "Iuran Diberikan Pada: "
										: "Iuran Selanjutnya: "}
									<b>
										{data.payment_status == "Belum Lunas"
											? formatDate(data.start_bill_date)
											: formatDate(data.new_bill_date)}
									</b>
								</p>
								<p className=" text-sm">
									Dibayar Oleh: <b>{data.bill_payer}</b>
								</p>
							</div>
							<div>
								<p className="text-accent-content text-2xl font-semibold">
									{data.payment_status}
								</p>
								<button
									onClick={() => handlePaidOff(data.ids)}
									className={`btn btn-success text-white btn-sm w-full ${
										data.payment_status == "Belum Lunas" ? "" : "hidden"
									}`}>
									Lunas
								</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default PaymentHistory;
