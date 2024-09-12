import { useEffect, useState } from "react";
import { IHouse } from "../../../type/house";
import {
	formatDate,
	formatMonthYear,
	getMonthDifference,
} from "../../../utils/dateUtils";

interface IPaymentHistory {
	handlePaidOff: (ids: number[]) => void;
	selectedData: IHouse;
	viewReportList: boolean;
	handleUpdateBill: (
		ids: number[],
		prices: [number, number],
		new_bill_date: string,
	) => void;
}

const PaymentHistory = ({
	viewReportList,
	selectedData,
	handlePaidOff,
	handleUpdateBill,
}: IPaymentHistory) => {
	const [payment, SetPaymentData] = useState(selectedData.payment[0]);
	const [editBill, SetEditBill] = useState({
		numberIncrement: 0,
		monthDifference: 12,
		satpam: 100000,
		kebersihan: 15000,
		initialPrice: selectedData.payment[0].amount_paid,
	});

	useEffect(() => {
		const { satpam, kebersihan, numberIncrement, initialPrice } = editBill;
		if (numberIncrement == 0)
			return SetPaymentData({ ...payment, amount_paid: initialPrice });
		SetPaymentData({
			...payment,
			amount_paid: initialPrice + (satpam + kebersihan) * numberIncrement,
		});
	}, [editBill]);

	const counter = (type: "increment" | "decrement") => {
		let originDateParse = new Date(selectedData.payment[0].new_bill_date);
		let dateParse = new Date(payment.new_bill_date);
		originDateParse.setMonth(originDateParse.getMonth() - 11);
		let operator = type == "increment" ? 1 : -1;
		let countNumber =
			type == "increment"
				? editBill.numberIncrement + 1
				: editBill.numberIncrement - 1;
		dateParse.setMonth(dateParse.getMonth() + operator);
		if (originDateParse > dateParse || countNumber > 0) return;
		let monthDifference = getMonthDifference(
			new Date(selectedData.payment[0].start_bill_date),
			new Date(payment.new_bill_date),
		);
		SetEditBill({
			...editBill,
			monthDifference,
			numberIncrement: countNumber,
		});

		SetPaymentData({ ...payment, new_bill_date: formatDate(dateParse) });
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
							} mb-5 w-full border`}>
							<div className="flex justify-between">
								<div className="">
									<p className=" text-xl font-semibold">
										Total Iuran: {data.amount_paid}
									</p>
									<p className=" text-sm">
										{data.payment_status == "Belum Lunas"
											? "Iuran untuk Bulan: "
											: "Iuran Selanjutnya: "}
										<b>
											{data.payment_status == "Belum Lunas"
												? formatMonthYear(data.start_bill_date)
												: formatMonthYear(data.new_bill_date)}
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
							</div>
							<div
								className={`${
									index != 0 ||
									getMonthDifference(
										new Date(selectedData.payment[0].start_bill_date),
										new Date(selectedData.payment[0].new_bill_date),
									) == 1
										? "hidden"
										: "bg-base-200 collapse rounded-md text-white"
								}`}>
								<input type="checkbox" className="!min-h-0 peer" />
								<button className="!min-h-0 p-1 collapse-title m-0 hover:underline hover:underline-offset-4">
									<b>Edit Iuran Tahunan</b>
								</button>
								<div className="collapse-content bg-neutral-700 w-full flex justify-between">
									<div className="w-full">
										<div className="mt-2 flex items-center justify-between mb-2">
											<div className="flex gap-x-2">
												<button
													onClick={() => counter("increment")}
													className="hover:bg-neutral-600 text-xl font-bold bg-neutral-500 rounded-sm px-2">
													+
												</button>
												<button
													onClick={() => counter("decrement")}
													className="hover:bg-neutral-600 text-xl font-bold bg-neutral-500 rounded-sm px-2">
													-
												</button>
											</div>
											<button
												onClick={() =>
													handleUpdateBill(
														payment.ids,
														[
															editBill.kebersihan * editBill.monthDifference,
															editBill.satpam * editBill.monthDifference,
														],
														payment.new_bill_date,
													)
												}
												className="btn-primary btn !min-h-1 h-8">
												Save
											</button>
										</div>
										<div>
											<div className="flex flex-col sm:flex-row gap-x-12 mb-1">
												<label htmlFor="satpam">Iuran Satpam Bulanan</label>
												<input
													onChange={(e) =>
														SetEditBill({
															...editBill,
															satpam: parseInt(e.target.value) as number,
														})
													}
													value={editBill.satpam}
													className="border rounded px-2 border-neutral-400"
													type="number"
													id="satpam"
												/>
											</div>
											<div className="flex flex-col sm:flex-row gap-x-6 mb-2">
												<label htmlFor="kebersihan">
													Iuran Kebersihan Bulanan
												</label>
												<input
													onChange={(e) =>
														SetEditBill({
															...editBill,
															kebersihan: parseInt(e.target.value) as number,
														})
													}
													value={editBill.kebersihan}
													className=" border rounded px-2 border-neutral-400"
													type="number"
													id="kebersihan"
												/>
											</div>
										</div>
										<div className="flex justify-between px-2 rounded border">
											<div>
												<p>Iuran Selanjutnya</p>
												<b>{formatMonthYear(payment.new_bill_date)}</b>
											</div>
											<div className="text-center">
												<p>Cashback Pengguna</p>
												<b>
													{parseInt(selectedData.payment[0].amount_paid) -
														parseInt(payment.amount_paid)}
												</b>
											</div>
											<div className="text-end">
												<p> Total Iuran</p>
												<b>{payment.amount_paid}</b>
											</div>
										</div>
									</div>
									<div></div>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default PaymentHistory;
