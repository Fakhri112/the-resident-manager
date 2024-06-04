import React from "react";

export const NavbarMenu = () => {
	return (
		<nav className="bg-blue-700 md:hidden">
			<ul className="flex justify-between px-3 py-1">
				<li className="mt-2">
					<a
						href="/"
						className="text-md hover:underline hover:underline-offset-4 text-slate-200">
						Penghuni
					</a>
				</li>
				<li className="mt-2">
					<a
						href="/house"
						className="text-md hover:underline hover:underline-offset-4 text-slate-200">
						Rumah
					</a>
				</li>
				<li className="mt-2">
					<a
						href="/payment"
						className="text-md hover:underline hover:underline-offset-4 text-slate-200">
						Pembayaran
					</a>
				</li>
			</ul>
		</nav>
	);
};
