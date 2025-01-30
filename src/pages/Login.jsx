import React, { useEffect } from 'react'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaRegEnvelope } from "react-icons/fa"
import { FaLock } from "react-icons/fa";

const Login = () => {

  const redirecte = useNavigate() //permet de faire les redirections entre les pages

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loadPage, setLoadPage] = useState(true)

  const login = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const req = await fetch("https://backend-envent-app.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "http://localhost:5173"
        },
        body: JSON.stringify({ email, password }),
      });

      const res = await req.json()
      if (res && res.message && res.message === "ok") {
        localStorage.setItem("data", JSON.stringify(res.data))
        setTimeout(() => {
          document.getElementById("redirecte").click()
        }, 100);
      } else {
        setError(res || "Une erreur s'est produite.");
      }

    } catch (error) {
      console.error(error); // Utile pour déboguer
      setError("Impossible de se connecter. Veuillez réessayer plus tard.");
    }

  }

  useEffect(() => {
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("data")) || null
      if (data) redirecte("/envent-page")
      else setLoadPage(false)
    }, 2000);
  }, [])


  if (!loadPage) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center " >
          <div className="card p-4 m-5 shadow-lg border-0 rounded-3">
            <h3 className="text-center mb-4 text-primary">Se connecter</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={login}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text"><FaRegEnvelope /></span>
                  <input type="email" className="form-control" id="email" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="mb-4 ">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input type="password" className="form-control" placeholder="Entrez votre mot de passe" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Connexion</button>
            </form>
            <p className="text-center mt-4">Pas de compte? <Link to="/Signup">Inscrivez-vous</Link></p>
          </div>
        </div>
        <Link to="/envent-page" id="redirecte"></Link>
      </div>
    )
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center text-center" style={{ width: "100%", height: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border" role="status">
          </div>
          Chargement
        </div>
      </div>
    )
  }
}

export default Login
