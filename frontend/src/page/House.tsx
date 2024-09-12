import { SyntheticEvent, useEffect, useRef, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
	IChoosedResident,
	IHouseModal,
	IHouse,
	IResident,
} from "../type/house";
import { NavbarMenu } from "../components/NavbarMenu";
import {
	initialHouseData,
	initialChoosedResidentData,
	intialResidentData,
	houseModal,
} from "../state/house";
import AddHouse from "../components/modal/house/AddHouse";
import EditHouse from "../components/modal/house/EditHouse";
import ResidentList from "../components/modal/house/ResidentList";
import DeleteHouse from "../components/modal/house/DeleteHouse";
import HouseList from "../components/main-section/house/HouseList";
import { Spinner } from "../components/Spinner";

const House = () => {
	const [modal, SetModal] = useState<IHouseModal>(houseModal);
	const [viewOccupiedList, SetViewOccupiedList] = useState<boolean>(true);
	const [houseData, SetHouseData] = useState<IHouse[]>(initialHouseData);
	const [selectedData, SetSelectedData] = useState<IHouse>();
	const [residentData, SetResidentData] =
		useState<IResident[]>(intialResidentData);
	const [choosedResident, SetChoosedResident] = useState<IChoosedResident>(
		initialChoosedResidentData,
	);
	const [submitting, SetSubmitting] = useState<boolean>(false);
	const [fetchingData, SetFetchingData] = useState<boolean>(false);
	const [viewReportList, SetViewReportList] = useState<boolean>(false);
	const [occupy, SetOccupy] = useState<boolean>(false);
	const formEditRef = useRef<HTMLFormElement>(null);
	const formAddRef = useRef<HTMLFormElement>(null);

	const fetchData = async () => {
		SetSubmitting(true);
		let endpoint = `http://localhost:8000/api/house/${
			viewOccupiedList ? "occupied" : "unoccupied"
		}`;
		let response = await axios.get(endpoint);
		SetHouseData(response.data);
		SetSubmitting(false);
	};

	const fetchResidentData = async () => {
		let endpoint = "http://localhost:8000/api/resident";
		let response = await axios.get(endpoint);
		SetResidentData(response.data);
	};

	useEffect(() => {
		fetchData();
	}, [viewOccupiedList]);

	const toggleViewOccupiedHouse = (bool: boolean) => {
		if (bool && viewOccupiedList) return;
		if (!bool && !viewOccupiedList) return;
		SetViewOccupiedList(bool);
		SetHouseData([]);
	};

	const handleCloseModal = () => {
		SetChoosedResident(initialChoosedResidentData);
		SetViewReportList(false);
		SetModal(houseModal);
	};

	const handleOpenResidentList = (e: SyntheticEvent) => {
		e.preventDefault();
		SetModal({ ...modal, residentList: !modal.residentList });
		fetchResidentData();
	};

	const handleChooseResident = (name: string, id: number) => {
		SetChoosedResident({
			full_name: name,
			id: id,
		});
		SetModal({ ...modal, residentList: !modal.residentList });
	};

	const handleUpdateData = (e: SyntheticEvent) => {
		e.preventDefault();
		const data = new FormData(formEditRef.current as HTMLFormElement);
		const resident_id = data.get("resident_id") as string;
		if ((resident_id == "0" || resident_id == "") && occupy) {
			return toast.error("Kolom penghuni rumah harus terisi jika dihuni");
		}
		SetSubmitting(true);
		axios
			.post("http://localhost:8000/api/house/" + selectedData?.house_id, data)
			.then((res) => {
				if (res.data.status == 422) toast.error(res.data.message as string);
				else toast.success(res.data.message as string);
				handleCloseModal();
				SetSubmitting(false);
				fetchData();
			})
			.catch((err) => {
				let errors: Record<string, string> = err.response.data.errors;
				let toArray = Object.values(errors);
				toArray.forEach((element) => {
					toast.error(element[0]);
				});
				SetSubmitting(false);
			});
	};

	const handleDetailHouse = (index: number) => {
		SetSelectedData(houseData[index]);
		SetOccupy(houseData[index].occupancy_status == "Occupied");
		SetModal({ ...modal, editHouse: !modal.editHouse });
	};

	const handleOpenDeleteConfirm = (index: number) => {
		SetSelectedData(houseData[index]);
		SetModal({ ...modal, deleteHouse: !modal.deleteHouse });
	};

	const handleSubmitNewData = (e: SyntheticEvent) => {
		e.preventDefault();
		const data = new FormData(formAddRef.current as HTMLFormElement);
		const resident_id = data.get("resident_id") as string;
		if (resident_id == "0" || resident_id == "") {
			return toast.error("Kolom penghuni rumah harus terisi jika dihuni");
		}
		SetSubmitting(true);
		axios
			.post("http://localhost:8000/api/house", data)
			.then((res) => {
				toast.success(res.data.message as string);
				handleCloseModal();
				SetSubmitting(false);
				fetchData();
			})
			.catch((err) => {
				let errors: Record<string, string> = err.response.data.errors;
				let toArray = Object.values(errors);
				toArray.forEach((element) => {
					toast.error(element[0]);
				});
				SetSubmitting(false);
			});
	};

	const handlePaidOff = async (ids: number[]) => {
		try {
			SetSubmitting(true);
			let msg: string = "";
			for (let index = 0; index < ids.length; index++) {
				let response = await axios.post(
					"http://localhost:8000/api/paidoff/" + ids[index],
				);
				msg = response.data.message as string;
			}
			let selectedDataCopy = JSON.parse(JSON.stringify(selectedData));
			const foundIndex: any = selectedData?.payment.findIndex(
				(item) =>
					item.ids.every((element) => ids.includes(element)) &&
					item.ids.length === ids.length,
			);
			fetchData();
			SetSubmitting(false);
			selectedDataCopy.payment[foundIndex].payment_status = "Lunas";
			SetSelectedData(selectedDataCopy);
			toast.success(msg);
		} catch (error) {
			SetSubmitting(false);
			toast.error("Terdapat Error 🥴");
		}
	};

	const handleDeleteHouse = () => {
		SetSubmitting(true);
		axios
			.delete("http://localhost:8000/api/house/" + selectedData?.house_id)
			.then((res) => {
				SetSubmitting(false);
				toast.success(res.data.message as string);
				handleCloseModal();
				fetchData();
			})
			.catch(() => {
				SetSubmitting(false);
				toast.error("Terdapat Error 🥴");
			});
	};

	const handleUpdateBill = (
		ids: number[],
		bills: [number, number],
		new_bill_date: string,
	) => {
		SetSubmitting(true);
		axios
			.patch("http://localhost:8000/api/editpayment", {
				ids,
				bills,
				new_bill_date,
			})
			.then((res) => {
				SetSubmitting(false);
				toast.success(res.data.message as string);
				handleCloseModal();
				fetchData();
			})
			.catch(() => {
				SetSubmitting(false);
				toast.error("Terdapat Error 🥴");
			});
	};

	return (
		<>
			<Toaster />
			<AddHouse
				submitting={submitting}
				ref={formAddRef}
				modal={modal}
				handleCloseModal={handleCloseModal}
				handleOpenResidentList={handleOpenResidentList}
				handleSubmitNewData={handleSubmitNewData}
				choosedResident={choosedResident}
				occupy={occupy}
				passPropOccupy={(prop) => SetOccupy(prop)}
			/>
			<EditHouse
				submitting={submitting}
				ref={formEditRef}
				modal={modal}
				handleCloseModal={handleCloseModal}
				handleOpenResidentList={handleOpenResidentList}
				handlePaidOff={handlePaidOff}
				handleUpdateData={handleUpdateData}
				handleUpdateBill={handleUpdateBill}
				selectedData={selectedData as IHouse}
				choosedResident={choosedResident}
				viewReportList={viewReportList}
				occupy={occupy}
				passPropOccupy={(prop) => SetOccupy(prop)}
				passPropSelectedDataOccupancy={(prop) =>
					SetSelectedData({
						...(selectedData as IHouse),
						occupancy_status: prop,
					})
				}
				passPropSelectedDataPaymentType={(prop) =>
					SetSelectedData({
						...(selectedData as IHouse),
						payment_type: prop,
					})
				}
				passPropViewReportList={(prop) => SetViewReportList(prop)}
			/>
			<ResidentList
				modal={modal}
				handleChooseResident={handleChooseResident}
				residentData={residentData}
				passPropModal={(bool) => SetModal({ ...modal, residentList: bool })}
			/>
			<DeleteHouse
				submitting={submitting}
				modal={modal}
				handleCloseModal={handleCloseModal}
				handleDeleteHouse={handleDeleteHouse}
			/>
			<main className="flex md:flex-row flex-col h-screen">
				<SidebarMenu />
				<NavbarMenu />
				<section className="p-10 w-full flex-col flex">
					<div className="md:flex justify-between items-center mb-8">
						<button
							className="btn btn-primary "
							onClick={() => {
								SetOccupy(false),
									SetModal({ ...modal, addHouse: !modal.addHouse });
							}}>
							Tambah Data Rumah
						</button>
						<div className="flex gap-x-3 mt-4 md:mt-0">
							<button
								onClick={() => toggleViewOccupiedHouse(true)}
								className={`btn btn-sm md:btn-md btn-outline ${
									viewOccupiedList ? "btn-active" : ""
								}`}>
								Data Dihuni
							</button>
							<button
								onClick={() => toggleViewOccupiedHouse(false)}
								className={`btn btn-sm md:btn-md btn-outline ${
									!viewOccupiedList ? "btn-active" : ""
								}`}>
								Data Tidak Dihuni
							</button>
						</div>
					</div>
					{viewOccupiedList && !fetchingData ? (
						<HouseList
							houseData={houseData}
							handleDetailHouse={handleDetailHouse}
							handleOpenDeleteConfirm={handleOpenDeleteConfirm}
							isOccupied={true}
						/>
					) : !viewOccupiedList && !fetchingData ? (
						<HouseList
							houseData={houseData}
							handleDetailHouse={handleDetailHouse}
							handleOpenDeleteConfirm={handleOpenDeleteConfirm}
							isOccupied={false}
						/>
					) : (
						<div className="grid place-items-center h-full w-full">
							<Spinner classname="fill-white w-7" />
						</div>
					)}
				</section>
			</main>
		</>
	);
};

export default House;
