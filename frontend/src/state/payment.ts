const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			labels: {
				color: "rgb(226 232 240)",
			},
		},
	},
	scales: {
		y: {
			ticks: {
				color: "rgb(226 232 240)",
			},
		},
		x: {
			ticks: {
				color: "rgb(226 232 240)",
			},
		},
	},
};

const initialPaymentModal = {
	sendBill: false,
	expense: false,
};

export { initialPaymentModal, options };
