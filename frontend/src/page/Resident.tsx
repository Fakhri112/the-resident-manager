import {
	ChangeEvent,
	SyntheticEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import SidebarMenu from "../components/SidebarMenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IResidentModal, IResident } from "../type/resident";
import { NavbarMenu } from "../components/NavbarMenu";
import AddResident from "../components/modal/resident/AddResident";
import EditResident from "../components/modal/resident/EditResident";
import DeleteResident from "../components/modal/resident/DeleteResident";
import { initialModalData, intialResidentData } from "../state/resident";
import ResidentList from "../components/main-section/resident/ResidentList";
import { Spinner } from "../components/Spinner";

const Resident = () => {
	const [modal, SetModal] = useState<IResidentModal>(initialModalData);
	const [residentData, SetResidentData] =
		useState<IResident[]>(intialResidentData);
	const [selectedData, SetSelectedData] = useState<IResident>();
	const [submitting, SetSubmitting] = useState<boolean>(false);
	const [fetchingData, SetFetchingData] = useState<boolean>(false);
	const formAddRef = useRef<HTMLFormElement>(null);
	const formEditRef = useRef<HTMLFormElement>(null);

	const fetchData = async () => {
		SetFetchingData(true);
		let response = await axios.get("http://localhost:8000/api/resident");
		SetResidentData(response.data);
		SetFetchingData(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleCloseModal = () => {
		SetModal({
			addResident: false,
			editResident: false,
			deleteResident: false,
		});
	};

	const handleSubmitNewData = (e: SyntheticEvent) => {
		e.preventDefault();
		SetSubmitting(true);
		const data = new FormData(formAddRef.current as HTMLFormElement);
		axios
			.post("http://localhost:8000/api/resident", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				SetSubmitting(false);
				toast.success(res.data.message as string);
				handleCloseModal();
				fetchData();
			})
			.catch((err) => {
				SetSubmitting(false);
				let errors: Record<string, string> = err.response.data.errors;
				let toArray = Object.values(errors);
				toArray.forEach((element) => {
					toast.error(element[0]);
				});
			});
	};

	const handleOpenDetailModal = (index: number) => {
		SetSelectedData(residentData[index]);
		SetModal({ ...modal, editResident: !modal.editResident });
	};

	const handleEditImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			SetSelectedData({
				...(selectedData as IResident),
				ktp_photo: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleUpdateData = (e: SyntheticEvent) => {
		e.preventDefault();
		SetSubmitting(true);
		const data = new FormData(formEditRef.current as HTMLFormElement);
		axios
			.post("http://localhost:8000/api/resident/" + selectedData?.id, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				SetSubmitting(false);
				toast.success(res.data.message as string);
				handleCloseModal();
				fetchData();
			})
			.catch((err) => {
				SetSubmitting(false);
				let errors: Record<string, string> = err.response.data.errors;
				let toArray = Object.values(errors);
				toArray.forEach((element) => {
					toast.error(element[0]);
				});
			});
	};

	const handleOpenDeleteConfirm = (index: number) => {
		SetSelectedData(residentData[index]);
		SetModal({ ...modal, deleteResident: !modal.deleteResident });
	};

	const handleDeleteResident = () => {
		SetSubmitting(true);
		axios
			.delete("http://localhost:8000/api/resident/" + selectedData?.id)
			.then((res) => {
				SetSubmitting(false);
				if (res.data.status == 422) toast.error(res.data.message as string);
				else toast.success(res.data.message as string);
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
			<EditResident
				submitting={submitting}
				ref={formEditRef}
				modal={modal}
				handleCloseModal={handleCloseModal}
				handleEditImage={handleEditImage}
				handleUpdateData={handleUpdateData}
				selectedData={selectedData as IResident}
				passPropMarital={(prop) => {
					SetSelectedData({
						...(selectedData as IResident),
						marital_status: prop,
					});
				}}
				passPropResidency={(prop) => {
					SetSelectedData({
						...(selectedData as IResident),
						residency_status: prop,
					});
				}}
			/>
			<AddResident
				submitting={submitting}
				handleSubmitNewData={handleSubmitNewData}
				handleCloseModal={handleCloseModal}
				modal={modal}
				ref={formAddRef}
			/>
			<DeleteResident
				submitting={submitting}
				modal={modal}
				handleCloseModal={handleCloseModal}
				handleDeleteResident={handleDeleteResident}
			/>
			<main className="flex md:flex-row flex-col h-screen">
				<SidebarMenu />
				<NavbarMenu />
				<section className="p-10 w-full flex flex-col">
					<div>
						<button
							className="btn btn-primary mb-8"
							onClick={() =>
								SetModal({ ...modal, addResident: !modal.addResident })
							}>
							Tambah Data Penguni
						</button>
					</div>
					{!fetchingData ? (
						<ResidentList
							residentData={residentData}
							handleOpenDeleteConfirm={handleOpenDeleteConfirm}
							handleOpenDetailModal={handleOpenDetailModal}
						/>
					) : (
						<div className="h-full w-full grid place-items-center">
							<Spinner classname="w-8 fill-white" />
						</div>
					)}
				</section>
			</main>
		</>
	);
};

export default Resident;
