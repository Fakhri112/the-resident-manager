import React from "react";
import ReactModal from "react-modal";
import { IHouseModal, IResident } from "../../../type/house";

interface IResidentList {
	modal: IHouseModal;
	handleChooseResident: (string: string, id: number) => void;
	residentData: IResident[];
	passPropModal: (bool: boolean) => void;
}

const ResidentList = ({
	modal,
	handleChooseResident,
	residentData,
	passPropModal,
}: IResidentList) => {
	return (
		<ReactModal
			isOpen={modal.residentList}
			shouldCloseOnOverlayClick={true}
			ariaHideApp={false}
			onRequestClose={() =>
				// SetModal({ ...modal, residentList: !modal.residentList })
				passPropModal(false)
			}
			className="relative rounded md:w-[50%] w-[80%] p-3 bg-white flex flex-col h-[80%]"
			overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center">
			<div className="mb-5 flex items-center justify-between">
				<p className="text-accent-content font-semibold text-2xl ">
					Tambah Penghuni
				</p>
				<button
					onClick={() =>
						// SetModal({ ...modal, residentList: !modal.residentList })
						passPropModal(false)
					}
					className="btn btn-sm ">
					Close
				</button>
			</div>
			<div className="border h-full overflow-auto">
				{residentData.map((data, index) => (
					<div
						key={index}
						className="mb-3 border border-slate-700 px-2 py-1 rounded-md flex items-center justify-between">
						<p className="text-accent-content text-xl">{data.full_name}</p>
						<button
							className="btn btn-primary btn-sm px-7"
							onClick={() => handleChooseResident(data.full_name, data.id)}>
							Pilih
						</button>
					</div>
				))}
			</div>
		</ReactModal>
	);
};

export default ResidentList;
