import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resident from "./page/Resident";
import House from "./page/House";
import Payment from "./page/Payment";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Resident />} />
				<Route path="/house" element={<House />} />
				<Route path="/payment" element={<Payment />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
