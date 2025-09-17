import UserHeader from '../components/user/UserHeader'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <>
            <UserHeader />
            <Outlet />
        </>
    )
}

export default UserLayout