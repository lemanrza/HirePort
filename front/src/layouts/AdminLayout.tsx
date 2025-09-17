import AdminSidebar from '../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
      <AdminSidebar />
      <Outlet />
    </>
  )
}

export default AdminLayout