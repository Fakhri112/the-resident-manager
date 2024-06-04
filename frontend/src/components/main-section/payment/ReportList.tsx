import React from "react";
import { IReportSummary } from "../../../type/payment";

interface IReportList {
	reportData: IReportSummary[];
}

const ReportList = ({ reportData }: IReportList) => {
	return (
		<>
			{reportData?.map((data, index) => (
				<div
					key={index}
					className="collapse collapse-arrow bg-base-300 border mb-3">
					<input type="radio" name="my-accordion-2" />
					<div className="collapse-title text-xl">
						<p className="font-bold text-slate-200">{data.date}</p>
						<p className="text-sm">
							Sisa Saldo: <b>{data.balance}</b>
						</p>
					</div>
					<div className="collapse-content">
						{data.items.map((item, index) => (
							<div
								key={index}
								className=" px-5 bg-base-200 items-center flex justify-between mb-2">
								<p className="text-xl">
									{item.hasOwnProperty("income_amount")
										? item.income_description
										: item.expense_description}
								</p>
								<p
									className={`text-2xl font-sembold ${
										item.hasOwnProperty("income_amount")
											? "text-success"
											: "text-error"
									}`}>
									{item.hasOwnProperty("income_amount")
										? "+" + item.income_amount
										: "-" + item.expense_amount}
								</p>
							</div>
						))}
					</div>
				</div>
			))}
		</>
	);
};

export default ReportList;
