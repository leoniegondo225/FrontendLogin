import React from 'react'
import { useState } from "react"
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"
import { Link } from 'react-router-dom';

const Signup = () => {

  const [nom, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false)

  const Signup = async (e)  => {
    e.preventDefault()

      try {
        setLoad(true)
        const req = await fetch("https://backend-envent-app.vercel.app/api/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:5173"
          },
          body: JSON.stringify({ nom, email, password }),
        });

        const res = await req.json()
        if (res && res.message && res.message === "ok") {
          localStorage.setItem("data", JSON.stringify(res.data))
          setTimeout(() => {
            document.getElementById("redirecte").click()
          }, 100);
        }  else {
          setError(res || "Une erreur s'est produite.");
        }
        setLoad(false)
      } catch (err) {
        console.error(error); // Pour déboguer
        setError("Une erreur s'est produite.");
        setLoad(false)
      }
  
  }


  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">S'inscrire</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={Signup}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input type="text" className="form-control" id="name" placeholder="Entrez votre nom" value={nom} onChange={(e) => setName(e.target.value)} required/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input type="email" className="form-control" id="email" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
          </div>
          {!load ? <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
            : (
              <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span className="visually-hidden" role="status">Traitement...</span>
              </button>
            )
          }
          
        </form>
        <p className="text-center mt-3">Vous avez déjà un compte ? <Link to="/">Connectez-vous</Link></p>
      </div>
      <Link to="/envent-page" id="redirecte"></Link>
    </div>
  )
}

export default Signup
