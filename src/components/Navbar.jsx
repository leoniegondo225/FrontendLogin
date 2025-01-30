import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

    const redirecte = useNavigate()

    const [data, setData] = useState(null)

    const deconnection = () => {
        localStorage.removeItem("data")
        redirecte("/")
    }

  useEffect(() => {
    setTimeout(() => {
     setData(JSON.parse(localStorage.getItem("data")) || null)
    }, 100);
  }, [])

    return (
        <nav className="bg-light p-2 d-flex justify-content-between align-items-center">
            <div className="logo">
                EnventAPP
            </div>
            <div className="p-3 d-flex justify-content-between align-items-center">
                <div className="photo">

                </div>
                <div className="dropdown border-0">
                    <button className="btn btn-secondary dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       {data?.nom}
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/profil">Profil</Link></li>
                        <li><Link className="dropdown-item" to="/mes-envenement">Mes evenements</Link></li>
                        <li><a className="dropdown-item" href="#a" onClick={() => deconnection()}>Deconnexion</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
