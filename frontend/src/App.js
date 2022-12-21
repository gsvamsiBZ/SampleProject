import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Component/homepage";
import Adduser from "./Component/adduser";
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/add" element={<Adduser></Adduser>}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
