import React, { SyntheticEvent, forwardRef } from "react";
import { IPaymentModal } from "../../../type/payment";
import ReactModal from "react-modal";
import { Spinner } from "../../Spinner";

interface ISendBill {
	modal: IPaymentModal;
	handleCloseModal: () => void;
	handleSendBill: (e: SyntheticEvent) => void;
	submitting: boolean;
}

const Sendbill = forwardRef<HTMLFormElement, ISendBill>(
	({ modal, submitting, handleCloseModal, handleSendBill }, ref) => {
		return (
			<ReactModal
				isOpen={modal.sendBill}
				shouldCloseOnOverlayClick={true}
				ariaHideApp={false}
				onRequestClose={handleCloseModal}
				className="relative rounded md:w-[40%] w-[80%] p-3 bg-white flex flex-col h-[50%]"
				overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center">
				<div className="w-full flex items-center justify-between mb-5">
					<h1 className="text-accent-content font-semibold text-2xl">
						Buat Iuran Bulanan
					</h1>
					{submitting ? <Spinner classname={"w-5 "} /> : <></>}
				</div>
				<form
					ref={ref}
					onSubmit={handleSendBill}
					className="flex w-full h-full justify-between flex-col items-center">
					<div className="flex flex-col w-full">
						<div className="flex flex-col mb-2">
							<label
								htmlFor="month"
								className="text-accent-content font-semibold">
								Simulasi Bulan Saat Ini
							</label>
							<input
								type="month"
								name="simulate_date_now"
								id="month"
								className="h-8 text-slate-100 px-1 rounded-md border"
							/>
						</div>
						<div className="flex w-full gap-x-6">
							<div className="flex flex-col mb-2 w-full">
								<label
									htmlFor="address"
									className="text-accent-content font-semibold">
									Iuran Satpam
								</label>
								<input
									defaultValue={100000}
									type="text"
									name="satpam"
									id="address"
									className="h-8 w-full text-slate-900 px-1 bg-white rounded-md border-black border"
								/>
							</div>
							<div className="flex flex-col mb-2 w-full">
								<label
									htmlFor="payment_type"
									className="text-accent-content font-semibold">
									Iuran Kebersihan
								</label>
								<input
									defaultValue={15000}
									type="text"
									name="kebersihan"
									id="address"
									className="h-8 w-full text-slate-900 px-1 bg-white rounded-md border-black border"
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-x-3 mt-10">
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

export default Sendbill;
