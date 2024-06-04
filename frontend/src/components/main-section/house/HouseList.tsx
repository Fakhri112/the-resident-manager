import { IHouse } from "../../../type/house";

interface IHouseListComp {
	houseData: IHouse[];
	handleDetailHouse: (idx: number) => void;
	handleOpenDeleteConfirm: (idx: number) => void;
	isOccupied: boolean;
}

const HouseList = ({
	houseData,
	handleDetailHouse,
	handleOpenDeleteConfirm,
	isOccupied,
}: IHouseListComp) => {
	return (
		<>
			<ul className="overflow-auto h-full">
				{houseData[0]?.id != 0 ? (
					houseData.map((data, index) => (
						<li
							key={index}
							className="px-3 bg-base-200 py-2 border rounded flex sm:flex-row flex-col sm:items-center sm:justify-between mb-2">
							<div className="flex items-center gap-x-4">
								<p className="text-3xl font-bold w-14 text-slate-200">
									{data.number}
								</p>
								<div>
									<p>{data.address}</p>
									{isOccupied ? (
										data.payment.every(
											(person) => person.payment_status === "Lunas",
										) && data.payment.length > 0 ? (
											<div className="me-3 flex border bg-success text-white px-2">
												<p>
													Status Iuran Saat Ini: <b>Lunas</b>
												</p>
											</div>
										) : data.payment.length > 0 ? (
											<div className="me-3 flex border bg-error text-accent-content px-2">
												<p>
													Status Iuran: <b>Belum Lunas</b>
												</p>
											</div>
										) : (
											<div className="me-3 flex border bg-warning text-accent-content px-2">
												<p>Iuran dikirimkan bulan depan</p>
											</div>
										)
									) : (
										<></>
									)}
								</div>
							</div>
							<div className="sm:ms-0 ms-[70px] sm:mt-0 mt-2 flex gap-x-4">
								<button
									onClick={() => handleDetailHouse(index)}
									className="px-3 btn btn-sm btn-outline btn-success">
									Detail
								</button>
								<button
									onClick={() => handleOpenDeleteConfirm(index)}
									className="px-3 btn btn-sm btn-outline btn-error">
									Delete
								</button>
							</div>
						</li>
					))
				) : (
					<></>
				)}
			</ul>
		</>
	);
};

export default HouseList;
