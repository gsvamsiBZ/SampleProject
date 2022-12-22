import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Component/homepage";
import Adduser from "./Component/adduser";
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
	return (
		<div className="App">
			<MantineProvider withNormalizeCSS withGlobalStyles>
				<NotificationsProvider position="top-right" zIndex={2077}>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/add" element={<Adduser></Adduser>}></Route>
						</Routes>
					</BrowserRouter>
				</NotificationsProvider>
			</MantineProvider>
		</div>
	);
}

export default App;
