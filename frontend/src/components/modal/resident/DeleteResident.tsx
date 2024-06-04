import React from "react";
import { IResident, IResidentModal } from "../../../type/resident";
import ReactModal from "react-modal";
import { Spinner } from "../../Spinner";

interface IDeleteResident {
	modal: IResidentModal;
	handleCloseModal: () => void;
	handleDeleteResident: () => void;
	submitting: boolean;
}

const DeleteResident = ({
	submitting,
	modal,
	handleCloseModal,
	handleDeleteResident,
}: IDeleteResident) => {
	return (
		<ReactModal
			isOpen={modal.deleteResident}
			shouldCloseOnOverlayClick={true}
			ariaHideApp={false}
			onRequestClose={handleCloseModal}
			className="relative rounded  md:w-[40%] w-[80%]  p-3 bg-white flex flex-col"
			overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center">
			<div className="w-full flex items-center justify-between mb-1">
				<h1 className="text-accent-content font-semibold text-2xl">Hapus</h1>
				{submitting ? <Spinner classname={"w-5 "} /> : <></>}
			</div>
			<p className=" text-lg text-accent-content">
				Apakah Anda Yakin Mau Menghapus Data Ini?
			</p>
			<div className="flex mt-2 justify-center gap-x-2 items-center">
				<button className="btn btn-error " onClick={handleDeleteResident}>
					Hapus
				</button>
				<button className="btn btn-neutral " onClick={handleCloseModal}>
					Cancel
				</button>
			</div>
		</ReactModal>
	);
};

export default DeleteResident;
