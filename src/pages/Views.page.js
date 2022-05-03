import { Route,Routes } from 'react-router-dom';
import { LoginSignup } from './Public/LoginSignup.page';
import "./Views.css";
export const Views = () => {

    return (
        <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/login" element={<LoginSignup />} />
        </Routes>
    )
}