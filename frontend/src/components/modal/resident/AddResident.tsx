import React, { SyntheticEvent, forwardRef } from "react";
import { IResidentModal } from "../../../type/resident";
import ReactModal from "react-modal";
import { Spinner } from "../../Spinner";

interface IAddResident {
	modal: IResidentModal;
	handleCloseModal: () => void;
	handleSubmitNewData: (e: SyntheticEvent) => void;
	submitting: boolean;
}

const AddResident = forwardRef<HTMLFormElement, IAddResident>(
	({ modal, handleCloseModal, handleSubmitNewData, submitting }, ref) => {
		return (
			<ReactModal
				isOpen={modal.addResident}
				shouldCloseOnOverlayClick={true}
				ariaHideApp={false}
				onRequestClose={handleCloseModal}
				className="relative rounded md:w-[40%] w-[80%] p-3 bg-white flex flex-col h-[77%]"
				overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center">
				<div className="mb-5 flex items-center justify-between">
					<p className="text-accent-content font-semibold text-2xl">
						Tambah Data Penghuni
					</p>
					{submitting ? <Spinner classname={"w-5 "} /> : <></>}
				</div>
				<form
					ref={ref}
					onSubmit={handleSubmitNewData}
					className="flex w-full h-full flex-col items-center justify-between">
					<div className="flex flex-col w-full">
						<div className="flex flex-col mb-2">
							<label
								htmlFor="full_name "
								className="text-accent-content font-semibold">
								Nama Lengkap
							</label>
							<input
								type="text"
								name="full_name"
								id="full_name"
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
							/>
						</div>
						<div className="flex flex-col mb-2">
							<label
								htmlFor="residency_status"
								className="text-accent-content font-semibold">
								Status Kependudukan
							</label>
							<select
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
								name="residency_status"
								id="marital_status">
								<option value="Contract">Contract</option>
								<option value="Permanent">Permanent</option>
							</select>
						</div>

						<div className="flex flex-col mb-2">
							<label
								htmlFor="marital_status"
								className="text-accent-content font-semibold">
								Status Perkawinan
							</label>
							<select
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
								name="marital_status"
								id="marital_status">
								<option value="Married">Married</option>
								<option value="Single">Single</option>
							</select>
						</div>
						<div className="flex flex-col mb-2">
							<label
								htmlFor="phone_number"
								className="text-accent-content font-semibold">
								Nomor Telepon
							</label>
							<input
								type="number"
								name="phone_number"
								id="phone_number"
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
							/>
						</div>
						<div className="flex flex-col mb-2">
							<label
								htmlFor="ktp_photo"
								className="text-accent-content font-semibold">
								Upload Foto KTP
							</label>
							<input
								type="file"
								name="ktp_photo"
								id="ktp_photo"
								className="h-8 text-slate-900 bg-white rounded-md"
							/>
						</div>
					</div>
					<div className="flex gap-x-3 mt-5">
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

export default AddResident;
