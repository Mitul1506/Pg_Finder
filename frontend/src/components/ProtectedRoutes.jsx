import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ children, userRoles }) => {

    const [token, setToken] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = JSON.parse(localStorage.getItem("user"))

        setToken(storedToken)
        setRole(storedUser?.role) // ✅ FIXED
        setLoading(false)
    }, [])

    if (loading) {
        return <h1 className="text-center mt-10">Loading...</h1>
    }

    // ❌ Not logged in
    if (!token) {
        return <Navigate to="/login" />
    }

    // ❌ Role not allowed
    if (userRoles && !userRoles.includes(role)) {
        return <Navigate to="/login" />
    }

    // ✅ Allowed
    return children
}

export default ProtectedRoutes