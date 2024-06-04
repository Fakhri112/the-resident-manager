import React from "react";
import ReactModal from "react-modal";
import { IHouseModal } from "../../../type/house";
import { Spinner } from "../../Spinner";

interface IDeleteHouse {
	modal: IHouseModal;
	handleCloseModal: () => void;
	handleDeleteHouse: () => void;
	submitting: boolean;
}

const DeleteHouse = ({
	modal,
	submitting,
	handleCloseModal,
	handleDeleteHouse,
}: IDeleteHouse) => {
	return (
		<ReactModal
			isOpen={modal.deleteHouse}
			shouldCloseOnOverlayClick={true}
			ariaHideApp={false}
			onRequestClose={handleCloseModal}
			className="relative rounded  md:w-[40%] w-[80%]  p-3 bg-white flex flex-col"
			overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center">
			<div className="flex items-center justify-between mb-1">
				<h1 className="text-accent-content font-semibold text-2xl">Hapus</h1>
				{submitting ? <Spinner classname={"w-5 "} /> : <></>}
			</div>
			<p className=" text-lg text-accent-content">
				Apakah Anda Yakin Mau Menghapus Data Ini?
			</p>
			<div className="flex mt-2 justify-center gap-x-2 items-center">
				<button className="btn btn-error " onClick={handleDeleteHouse}>
					Hapus
				</button>
				<button className="btn btn-neutral " onClick={handleCloseModal}>
					Cancel
				</button>
			</div>
		</ReactModal>
	);
};

export default DeleteHouse;
