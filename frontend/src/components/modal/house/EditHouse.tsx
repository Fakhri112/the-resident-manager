import React, { SyntheticEvent, forwardRef } from "react";
import ReactModal from "react-modal";
import { IChoosedResident, IHouseModal, IHouse } from "../../../type/house";
import { Spinner } from "../../Spinner";
import EditHousePanel from "./EditHousePanel";
import PaymentHistory from "./PaymentHistory";

interface IEditHouse {
	modal: IHouseModal;
	handleCloseModal: () => void;
	handleUpdateData: (e: SyntheticEvent) => void;
	handleOpenResidentList: (e: SyntheticEvent) => void;
	handlePaidOff: (ids: number[]) => void;
	selectedData: IHouse;
	choosedResident: IChoosedResident;
	viewReportList: boolean;
	occupy: boolean;
	submitting: boolean;
	passPropViewReportList: (bool: boolean) => void;
	passPropSelectedDataOccupancy: (string: string) => void;
	passPropSelectedDataPaymentType: (string: string) => void;
	passPropOccupy: (bool: boolean) => void;
}

const EditHouse = forwardRef<HTMLFormElement, IEditHouse>(
	(
		{
			modal,
			handleCloseModal,
			handleOpenResidentList,
			handleUpdateData,
			handlePaidOff,
			selectedData,
			choosedResident,
			passPropOccupy,
			passPropViewReportList,
			passPropSelectedDataOccupancy,
			passPropSelectedDataPaymentType,
			viewReportList,
			occupy,
			submitting,
		},
		ref,
	) => {
		return (
			<ReactModal
				isOpen={modal.editHouse}
				shouldCloseOnOverlayClick={true}
				ariaHideApp={false}
				onRequestClose={handleCloseModal}
				className="relative rounded md:w-[50%] w-[80%] p-3 bg-white flex flex-col h-[90%]"
				overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[10] flex items-center justify-center">
				<div className="flex justify-between mb-5">
					<p className="text-accent-content font-semibold text-2xl ">
						Detail Rumah
					</p>
					<div className="flex gap-x-2">
						<button
							onClick={() => {
								passPropViewReportList(false);
							}}
							className={`btn btn-sm  btn-outline ${
								!viewReportList ? "btn-active" : ""
							}`}>
							Detail
						</button>
						<button
							onClick={() => {
								passPropViewReportList(true);
							}}
							className={`btn btn-sm btn-outline  ${
								viewReportList ? "btn-active" : ""
							}`}>
							Riwayat
						</button>
						{submitting ? <Spinner classname={"w-5 "} /> : <></>}
					</div>
				</div>
				<EditHousePanel
					ref={ref}
					handleCloseModal={handleCloseModal}
					handleOpenResidentList={handleOpenResidentList}
					handleUpdateData={handleUpdateData}
					choosedResident={choosedResident}
					selectedData={selectedData}
					occupy={occupy}
					viewReportList={viewReportList}
					passPropOccupy={(prop) => passPropOccupy(prop)}
					passPropSelectedDataOccupancy={(prop) =>
						passPropSelectedDataOccupancy(prop)
					}
					passPropSelectedDataPaymentType={(prop) =>
						passPropSelectedDataPaymentType(prop)
					}
				/>
				<PaymentHistory
					viewReportList={viewReportList}
					selectedData={selectedData}
					handlePaidOff={handlePaidOff}
				/>
			</ReactModal>
		);
	},
);

export default EditHouse;
