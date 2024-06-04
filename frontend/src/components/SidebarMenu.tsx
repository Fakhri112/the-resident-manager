import React from "react";

const SidebarMenu = () => {
	return (
		<aside className="md:block hidden bg-blue-700 px-5 py-5">
			<h1 className="text-4xl w-60 font-semibold text-white">
				The Resident Manager
			</h1>
			<ul className="mt-10">
				<li className="mt-2">
					<a
						href="/"
						className="text-xl hover:underline hover:underline-offset-4 text-slate-200">
						Penghuni
					</a>
				</li>
				<li className="mt-2">
					<a
						href="/house"
						className="text-xl hover:underline hover:underline-offset-4 text-slate-200">
						Rumah
					</a>
				</li>
				<li className="mt-2">
					<a
						href="/payment"
						className="text-xl hover:underline hover:underline-offset-4 text-slate-200">
						Pembayaran
					</a>
				</li>
			</ul>
		</aside>
	);
};

export default SidebarMenu;
