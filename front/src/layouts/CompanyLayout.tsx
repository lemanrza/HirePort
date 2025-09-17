import CompanyHeader from '../components/company/CompanyHeader'
import { Outlet } from 'react-router-dom'

const CompanyLayout = () => {
    return (
        <>
            <CompanyHeader />
            <Outlet />
        </>
    )
}

export default CompanyLayout