import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { NavbarMenu } from "../components/NavbarMenu";
import { IPaymentModal, IReportSummary } from "../type/payment";
import Expense from "../components/modal/payment/Expense";
import Sendbill from "../components/modal/payment/Sendbill";
import ReportList from "../components/main-section/payment/ReportList";
import { options, initialPaymentModal } from "../state/payment";

const Payment = () => {
	const [modal, SetModal] = useState<IPaymentModal>(initialPaymentModal);
	const formBillRef = useRef<HTMLFormElement>(null);
	const formExpenseRef = useRef<HTMLFormElement>(null);
	const [submitting, SetSubmitting] = useState<boolean>(false);
	const [reportData, SetReportData] = useState<IReportSummary[]>();
	const [chart, SetChart] = useState<ChartData<"bar">>({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		SetChart({
			labels: reportData?.map((item) => item.date).slice(0, 12),
			datasets: [
				{
					label: "Pemasukan",
					data: getSubsetOfData(
						reportData?.map((item) => item.income_sum) as [number],
						12,
					),
					backgroundColor: "rgba(75, 192, 192, 0.2)",
					borderColor: "rgba(75, 192, 192, 1)",
					borderWidth: 1,
				},
				{
					label: "Pengeluaran",
					data: getSubsetOfData(
						reportData?.map((item) => item.expense_sum) as [number],
						12,
					),
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132, 1)",
					borderWidth: 1,
				},
			],
		});
	}, [reportData]);

	const getSubsetOfData = (dataArray: [number], limit: number): number[] => {
		if (Array.isArray(dataArray)) {
			const reversedArray = dataArray.slice();
			const startIdx = Math.max(reversedArray.length - limit, 0);
			return reversedArray.slice(startIdx);
		}
		return [];
	};

	const fetchData = async () => {
		let endpoint = `http://localhost:8000/api/report/`;
		let response = await axios.get(endpoint);
		SetReportData(response.data);
	};

	const handleCloseModal = () => {
		SetModal({ ...initialPaymentModal });
	};

	const handleSendBill = (e: SyntheticEvent) => {
		SetSubmitting(true);
		e.preventDefault();
		const data = new FormData(formBillRef.current as HTMLFormElement);

		axios
			.post("http://localhost:8000/api/sendbill", {
				simulate_date_now: data.get("simulate_date_now") + "-01",
				bill_detail: [
					parseInt(data.get("satpam") as string),
					parseInt(data.get("kebersihan") as string),
				],
			})
			.then((res) => {
				SetSubmitting(false);
				if (res.data.status == 422) toast.error(res.data.message as string);
				else toast.success(res.data.message as string);
				handleCloseModal();
			})
			.catch((err) => {
				SetSubmitting(false);
				let errors: Record<string, string> = err.response.data.errors;
				let toArray = Object.values(errors);
				toArray.forEach((element) => {
					toast.error(element[0]);
				});
			});
	};

	const handleInputExpense = (e: SyntheticEvent) => {
		SetSubmitting(true);
		e.preventDefault();
		const data = new FormData(formExpenseRef.current as HTMLFormElement);
		axios
			.post("http://localhost:8000/api/expense", data)
			.then((res) => {
				SetSubmitting(false);
				if (res.data.status == 422) toast.error(res.data.message as string);
				else toast.success(res.data.message as string);
				handleCloseModal();
				fetchData();
			})
			.catch((err) => {
				SetSubmitting(false);
				let errors: Record<string, string> = err.response.data.errors;
				let toArray = Object.values(errors);
				toArray.forEach((element) => {
					toast.error(element[0]);
				});
			});
	};

	return (
		<>
			<Toaster />
			<Sendbill
				submitting={submitting}
				ref={formBillRef}
				modal={modal}
				handleCloseModal={handleCloseModal}
				handleSendBill={handleSendBill}
			/>
			<Expense
				submitting={submitting}
				ref={formExpenseRef}
				modal={modal}
				handleCloseModal={handleCloseModal}
				handleInputExpense={handleInputExpense}
			/>
			<main className="!overflow-x-hidden flex md:flex-row flex-col h-screen md:overflow-auto overflow-hidden">
				<SidebarMenu />
				<NavbarMenu />
				<section className="h-full py-10 px-12 w-full flex-col flex">
					<div className="flex sm:flex-row flex-col-reverse sm:justify-between sm:items-center mb-8">
						<div className="flex gap-x-3 items-center">
							<button
								onClick={() =>
									SetModal({ ...modal, sendBill: !modal.sendBill })
								}
								className="btn btn-primary ">
								Buat Iuran Bulanan
							</button>
							<button
								onClick={() => SetModal({ ...modal, expense: !modal.expense })}
								className="btn btn-warning ">
								Buat Pengeluaran
							</button>
						</div>
						<div className="flex flex-col sm:items-end">
							<p>Total Saldo</p>
							<p className="text-3xl">
								{reportData?.reduce((n, { balance }) => n + balance, 0)}
							</p>
						</div>
					</div>

					<div className="text-slate-200 h-full overflow-x-hidden md:px-2 w-full overflow-y-auto">
						<div className="md:h-full h-[41vh]">
							<Bar options={options} data={chart} className="mb-3 " />
						</div>
						<ReportList
							reportData={reportData?.slice(0).reverse() as IReportSummary[]}
						/>
					</div>
				</section>
			</main>
		</>
	);
};

export default Payment;
