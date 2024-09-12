import { SyntheticEvent, forwardRef } from "react";
import { IChoosedResident, IHouseModal } from "../../../type/house";
import ReactModal from "react-modal";
import { Spinner } from "../../Spinner";

interface IAddHouse {
	modal: IHouseModal;
	handleCloseModal: () => void;
	handleOpenResidentList: (e: SyntheticEvent) => void;
	handleSubmitNewData: (e: SyntheticEvent) => void;
	choosedResident: IChoosedResident;
	passPropOccupy: (bool: boolean) => void;
	occupy: boolean;
	submitting: boolean;
}

const AddHouse = forwardRef<HTMLFormElement, IAddHouse>(
	(
		{
			modal,
			occupy,
			choosedResident,
			submitting,
			handleOpenResidentList,
			passPropOccupy,
			handleCloseModal,
			handleSubmitNewData,
		},
		ref,
	) => {
		return (
			<ReactModal
				isOpen={modal.addHouse}
				shouldCloseOnOverlayClick={true}
				ariaHideApp={false}
				onRequestClose={handleCloseModal}
				className="relative rounded md:w-[50%] w-[80%] p-3 bg-white flex flex-col h-[80%]"
				overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[10] flex items-center justify-center">
				<div className="mb-5 flex items-center justify-between">
					<p className="text-accent-content font-semibold text-2xl">
						Tambah Data Rumah
					</p>
					{submitting ? <Spinner classname={"w-5 "} /> : <></>}
				</div>
				<form
					ref={ref}
					onSubmit={handleSubmitNewData}
					className="flex w-full  flex-col items-center">
					<div className="flex flex-col w-full">
						<div className="flex flex-col mb-2">
							<label
								htmlFor="number "
								className="text-accent-content font-semibold">
								Nomor Rumah
							</label>
							<input
								type="text"
								name="number"
								id="number"
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
							/>
						</div>
						<div className="flex flex-col mb-2">
							<label
								htmlFor="address"
								className="text-accent-content font-semibold">
								Alamat Rumah
							</label>
							<input
								type="text"
								name="address"
								id="address"
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
							/>
						</div>
						<div className="flex flex-col mb-2">
							<label
								htmlFor="payment_type"
								className="text-accent-content font-semibold">
								Waktu Iuran
							</label>
							<select
								className="h-8 text-slate-900 px-1 bg-white rounded-md border-black border"
								name="payment_type"
								id="payment_type">
								<option value="Monthly">Bulanan</option>
								<option value="Yearly">Tahunan</option>
							</select>
						</div>

						<div className="flex flex-col mb-2">
							<p className="text-accent-content font-semibold">Status Hunian</p>
							<div className="flex gap-x-10">
								<div className="flex gap-x-2">
									<input
										data-theme="light"
										className="radio"
										type="radio"
										name="occupancy_status"
										id="Occupied"
										value="Occupied"
										onChange={() => passPropOccupy(true)}
									/>
									<label
										htmlFor="Occupied"
										className="text-accent-content font-semibold">
										Dihuni
									</label>
								</div>
								<div className="flex gap-x-2">
									<input
										data-theme="light"
										className="radio"
										defaultChecked
										type="radio"
										name="occupancy_status"
										id="Unoccupied"
										value="Unoccupied"
										onChange={() => passPropOccupy(false)}
									/>
									<label
										htmlFor="Unoccupied"
										className="text-accent-content font-semibold">
										Tidak Dihuni
									</label>
								</div>
							</div>
						</div>
						<div>
							<input
								type="text"
								className="hidden"
								name="resident_id"
								readOnly
								value={occupy ? choosedResident.id : ""}
							/>
							<p className="text-accent-content font-semibold">
								Penghuni Rumah
							</p>
							<div className="flex gap-x-4">
								<div
									className={`px-2 min-h-8 flex items-center rounded-md border border-accent-content text-accent-content w-full ${
										occupy ? "" : " bg-slate-500 border-slate-200"
									}`}>
									<p className={`${occupy ? "" : "hidden"}`}>
										{choosedResident.full_name}
									</p>
								</div>
								<button
									onClick={handleOpenResidentList}
									className={`btn btn-sm ${
										occupy
											? " btn-primary "
											: " bg-slate-500 border-white hover:bg-slate-500 hover:border-white pointer-events-none"
									}`}>
									Tambah Penghuni
								</button>
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

export default AddHouse;
