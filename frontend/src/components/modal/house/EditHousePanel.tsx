import React, { SyntheticEvent, forwardRef } from "react";
import { IChoosedResident, IHouse } from "../../../type/house";

interface IEditHousePanel {
	handleCloseModal: () => void;
	handleUpdateData: (e: SyntheticEvent) => void;
	handleOpenResidentList: (e: SyntheticEvent) => void;
	selectedData: IHouse;
	choosedResident: IChoosedResident;
	viewReportList: boolean;
	occupy: boolean;
	passPropSelectedDataOccupancy: (string: string) => void;
	passPropSelectedDataPaymentType: (string: string) => void;
	passPropOccupy: (bool: boolean) => void;
}

const EditHousePanel = forwardRef<HTMLFormElement, IEditHousePanel>(
	(
		{
			handleCloseModal,
			handleOpenResidentList,
			handleUpdateData,
			choosedResident,
			selectedData,
			passPropOccupy,
			passPropSelectedDataOccupancy,
			passPropSelectedDataPaymentType,
			occupy,
			viewReportList,
		},
		ref,
	) => {
		return (
			<form
				ref={ref}
				onSubmit={handleUpdateData}
				className={`overflow-y-auto flex w-full h-full  justify-between flex-col items-center ${
					!viewReportList ? "" : "hidden"
				}`}>
				<div className="flex flex-col w-full">
					<div className="flex flex-col mb-2">
						<label
							htmlFor="number "
							className="text-accent-content font-semibold">
							Nomor Rumah
						</label>
						<input
							defaultValue={selectedData?.number}
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
							defaultValue={selectedData?.address}
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
							value={selectedData?.payment_type}
							onChange={(e) => passPropSelectedDataPaymentType(e.target.value)}
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
									checked={selectedData?.occupancy_status == "Occupied"}
									type="radio"
									name="occupancy_status"
									className="radio"
									id="Occupied"
									value="Occupied"
									onChange={(e) => {
										passPropSelectedDataOccupancy(e.target.value);
										passPropOccupy(true);
									}}
								/>
								<label
									htmlFor="Occupied"
									className="text-accent-content font-semibold">
									Dihuni
								</label>
							</div>
							<div className="flex gap-x-2">
								<input
									checked={selectedData?.occupancy_status == "Unoccupied"}
									type="radio"
									data-theme="light"
									className="radio"
									name="occupancy_status"
									id="Unoccupied"
									value="Unoccupied"
									onChange={(e) => {
										passPropSelectedDataOccupancy(e.target.value);
										passPropOccupy(false);
									}}
								/>
								<label
									htmlFor="Unoccupied"
									className="text-accent-content font-semibold">
									Tidak Dihuni
								</label>
							</div>
						</div>
					</div>
					<div className=" mb-3">
						<input
							type="text"
							className="hidden"
							name="resident_id"
							readOnly
							value={
								occupy && selectedData?.full_name && !choosedResident.full_name
									? selectedData?.resident_id
									: occupy && choosedResident.full_name
									? choosedResident.id
									: ""
							}
						/>
						<p className="text-accent-content font-semibold">Penghuni Rumah</p>
						<div className="flex gap-x-4 md:items-end md:flex-row flex-col gap-y-2">
							{choosedResident.full_name.length == 0 &&
							selectedData?.full_name ? (
								<div
									className={`px-2 flex flex-col rounded-md border border-accent-content text-accent-content w-full ${
										occupy ? "" : "min-h-8 bg-slate-500 border-slate-200"
									}`}>
									<b
										className={`${
											occupy && selectedData?.full_name ? "" : "hidden"
										}`}>
										{selectedData?.full_name}
									</b>
									<p
										className={`${
											occupy && selectedData?.full_name ? "" : "hidden"
										}`}>
										Status Perkawinan: {selectedData?.marital_status}
									</p>
									<p
										className={`${
											occupy && selectedData?.full_name ? "" : "hidden"
										}`}>
										Status Kependudukan: {selectedData?.residency_status}
									</p>
									<p
										className={`${
											occupy && selectedData?.full_name ? "" : "hidden"
										}`}>
										Nomor Telepon: {selectedData?.phone_number}
									</p>
								</div>
							) : (
								<p
									className={`px-2 h-8 flex items-center rounded-md border border-accent-content text-accent-content w-full ${
										occupy ? "" : " bg-slate-500 border-slate-200"
									}`}>
									{`${occupy ? choosedResident.full_name : ""}`}
								</p>
							)}
							<button
								onClick={handleOpenResidentList}
								className={`btn btn-sm ${
									occupy
										? " btn-primary "
										: " bg-slate-500 border-white hover:bg-slate-500 hover:border-white pointer-events-none"
								}`}>
								Ubah Penghuni
							</button>
						</div>
					</div>
				</div>
				<div className="flex gap-x-3">
					<button className="btn btn-primary btn-sm px-7">Edit</button>
					<button
						onClick={(e) => {
							e.preventDefault(), handleCloseModal();
						}}
						className="btn btn-sm px-7">
						Close
					</button>
				</div>
			</form>
		);
	},
);

export default EditHousePanel;
