import Navbar from "./Component/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Component/homepage";
import Adduser from "./Component/addTruecallerUser";
import LoginandSignup from "./Component/loginsignup";
// import ForgotPassword from "./Component/forgotPassword";
// import ResetPassword from "./Component/resetPassword";
// import OtpVerification from "./Component/otpVerification";
// import UnVerifiedEmail from "./Component/unVerifiedEmail";
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  return (
    <div className="App">
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <NotificationsProvider position="top-right" zIndex={2077}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<Adduser></Adduser>}></Route>
              <Route path="/login" element={<LoginandSignup></LoginandSignup>}></Route>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/forgotPassword" element={<ForgotPassword />} />
							<Route path="/resetPassword" element={<ResetPassword />} />
							<Route path="/OtpVerification" element={<OtpVerification />} />
							<Route path="/UnVerifiedEmail" element={<UnVerifiedEmail />} /> */}
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
