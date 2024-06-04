import { SyntheticEvent, forwardRef } from "react";
import { IPaymentModal } from "../../../type/payment";
import ReactModal from "react-modal";
import { Spinner } from "../../Spinner";

interface IExpense {
	modal: IPaymentModal;
	handleCloseModal: () => void;
	handleInputExpense: (e: SyntheticEvent) => void;
	submitting: boolean;
}

const Expense = forwardRef<HTMLFormElement, IExpense>(
	({ modal, submitting, handleCloseModal, handleInputExpense }, ref) => {
		return (
			<ReactModal
				isOpen={modal.expense}
				shouldCloseOnOverlayClick={true}
				ariaHideApp={false}
				onRequestClose={handleCloseModal}
				className="relative rounded md:w-[40%] w-[80%] p-3 bg-white flex flex-col h-[70%]"
				overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center">
				<div className="w-full flex items-center justify-between mb-5">
					<h1 className="text-accent-content font-semibold text-2xl">
						Buat Pengeluaran
					</h1>
					{submitting ? <Spinner classname={"w-5 "} /> : <></>}
				</div>
				<form
					ref={ref}
					onSubmit={handleInputExpense}
					className="h-full justify-between flex w-full  flex-col items-center">
					<div className=" flex flex-col w-full">
						<label
							htmlFor="payment_type"
							className="text-accent-content font-semibold">
							Bulan Pengeluaran
						</label>
						<input
							defaultValue={15000}
							type="month"
							name="expense_date"
							id="address"
							className="h-8 text-slate-100 px-1 rounded-md border"
						/>
						<label
							htmlFor="address"
							className="text-accent-content font-semibold">
							Jumlah Pengeluaran
						</label>
						<input
							defaultValue={0}
							type="number"
							name="expense_amount"
							id="address"
							className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
						/>
						<label htmlFor="desc" className="text-accent-content font-semibold">
							Deskripsi Pengeluaran
						</label>
						<textarea
							name="expense_description"
							id="desc"
							className="h-40 rounded-md p-1 bg-white border-accent-content text-accent-content border"></textarea>
					</div>
					<div className="flex gap-x-3 ">
						<button className="btn btn-primary btn-sm mt-2 px-7">Submit</button>
						<button
							onClick={(e) => {
								e.preventDefault(), handleCloseModal();
							}}
							className="btn btn-sm mt-2 px-7">
							Close
						</button>
					</div>
				</form>
			</ReactModal>
		);
	},
);

export default Expense;
