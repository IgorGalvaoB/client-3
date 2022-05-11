import { Route,Routes } from 'react-router-dom';
import { LoginSignup } from './Public/LoginSignup.page';
import { ChatPage } from './Private/Chat.page';
import{ ProfilePage }   from './Private/Profile.page';
import "./Views.css";
import Finder from './Private/Finder.page';
export const Views = () => {

    return (
        <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/messages/" element={<ChatPage/>} /> 
            <Route path="/:username" element={<ProfilePage/>} />
            <Route path="/finder/:query" element={<Finder/>} />
        </Routes>
    )
}