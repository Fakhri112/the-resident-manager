import React from "react";
import { IResident } from "../../../type/resident";

interface IResidentList {
	residentData: IResident[];
	handleOpenDetailModal: (idx: number) => void;
	handleOpenDeleteConfirm: (idx: number) => void;
}

const ResidentList = ({
	residentData,
	handleOpenDeleteConfirm,
	handleOpenDetailModal,
}: IResidentList) => {
	return (
		<ul>
			{residentData[0]?.id !== 0
				? residentData.map((data: IResident, index) => (
						<li
							key={index}
							className="px-3 py-2 mb-3 bg-base-300 border rounded flex justify-between items-center">
							<p className="font-semibold text-slate-200">{data.full_name}</p>
							<div className="flex gap-x-4">
								<button
									onClick={() => handleOpenDetailModal(index)}
									className="px-3 btn btn-sm btn-outline btn-success">
									Detail
								</button>
								<button
									onClick={() => handleOpenDeleteConfirm(index)}
									className="px-3 btn btn-sm btn-outline btn-error">
									Hapus
								</button>
							</div>
						</li>
				  ))
				: null}
		</ul>
	);
};

export default ResidentList;
