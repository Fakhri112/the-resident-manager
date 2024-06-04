import React, { ChangeEvent, SyntheticEvent, forwardRef } from "react";
import { IResident, IResidentModal } from "../../../type/resident";
import ReactModal from "react-modal";
import { Spinner } from "../../Spinner";

interface IEditResident {
	modal: IResidentModal;
	handleCloseModal: () => void;
	handleEditImage: (e: ChangeEvent<HTMLInputElement>) => void;
	handleUpdateData: (e: SyntheticEvent) => void;
	selectedData: IResident;
	submitting: boolean;
	passPropMarital: (prop: string) => void;
	passPropResidency: (prop: string) => void;
}

const EditResident = forwardRef<HTMLFormElement, IEditResident>(
	(
		{
			submitting,
			modal,
			passPropMarital,
			passPropResidency,
			handleCloseModal,
			handleEditImage,
			handleUpdateData,
			selectedData,
		},
		ref,
	) => {
		return (
			<ReactModal
				isOpen={modal.editResident}
				shouldCloseOnOverlayClick={true}
				ariaHideApp={false}
				onRequestClose={handleCloseModal}
				className="relative rounded md:w-[40%] w-[80%] p-3 bg-white flex flex-col h-[90%]"
				overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center">
				<div className="mb-5 flex items-center justify-between">
					<p className="text-accent-content font-semibold text-2xl">
						Detail Penghuni
					</p>
					{submitting ? <Spinner classname={"w-5 "} /> : <></>}
				</div>
				<form
					ref={ref}
					onSubmit={handleUpdateData}
					className="flex w-full h-full justify-between flex-col items-center">
					<input
						type="file"
						id="ktp_photo"
						className="hidden"
						name="ktp_photo"
						onChange={handleEditImage}
					/>
					<label
						htmlFor="ktp_photo"
						className="relative w-64 h-40 md:grid place-items-center hover:bg-blue-400 hover:cursor-pointer z-10">
						<div>
							<div
								className="hover:after:content-['Ganti_Foto_KTP'] hover:after:text-white hover:after:text-center
								w-64 h-36 hover:bg-blue-700/75  absolute after:absolute after:top-1/2 after:left-1/2 
								after:transform after:-translate-x-1/2 after:-translate-y-1/2 "></div>
							<img
								src={selectedData?.ktp_photo}
								alt=""
								className=" z-50 h-36"
							/>
						</div>
					</label>
					<div className="flex flex-col w-full">
						<div className="flex flex-col">
							<label
								htmlFor="full_name "
								className="text-accent-content font-semibold">
								Nama Lengkap
							</label>
							<input
								defaultValue={selectedData?.full_name}
								type="text"
								name="full_name"
								id="full_name"
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
							/>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="residency_status"
								className="text-accent-content font-semibold">
								Status Kependudukan
							</label>
							<select
								onChange={(e) =>
									// SetSelectedData({
									// 	...(selectedData as IResident),
									// 	residency_status: e.target.value,
									// })
									passPropResidency(e.target.value)
								}
								value={selectedData?.residency_status}
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
								name="residency_status"
								id="residency_status">
								<option value="Contract">Contract</option>
								<option value="Permanent">Permanent</option>
							</select>
						</div>

						<div className="flex flex-col">
							<label
								htmlFor="marital_status"
								className="text-accent-content font-semibold">
								Status Perkawinan
							</label>
							<select
								onChange={(e) =>
									// SetSelectedData({
									// 	...(selectedData as IResident),
									// 	marital_status: e.target.value,
									// })
									passPropMarital(e.target.value)
								}
								value={selectedData?.marital_status}
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
								name="marital_status"
								id="marital_status">
								<option value="Married">Married</option>
								<option value="Single">Single</option>
							</select>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="phone_number"
								className="text-accent-content font-semibold">
								Nomor Telepon
							</label>
							<input
								defaultValue={selectedData?.phone_number}
								type="number"
								name="phone_number"
								id="phone_number"
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
							/>
						</div>
					</div>
					<div className="flex gap-x-3">
						<button className="btn btn-primary btn-sm mt-8 px-7">Edit</button>
						<button
							onClick={(e) => {
								e.preventDefault(), handleCloseModal();
							}}
							className="btn btn-sm mt-8 px-7">
							Close
						</button>
					</div>
				</form>
			</ReactModal>
		);
	},
);

export default EditResident;
