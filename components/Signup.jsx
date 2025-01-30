import React from 'react'
import { useState } from "react"
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"
import { Link } from 'react-router-dom';

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const Signup = async (e)  => {
    e.preventDefault()

      try {
        const response = await fetch("https://backend-envent-app.vercel.app/api/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
          throw new Error("Erreur lors de l'inscription");
        }
  
        const data = await response.json();
        setSuccess("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        setError("");
      } catch (err) {
        console.error(error); // Pour déboguer
        setError(error.message || "Une erreur s'est produite.");
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
              <input type="text" className="form-control" id="name" placeholder="Entrez votre nom" value={name} onChange={(e) => setName(e.target.value)} required/>
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
          <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
        </form>
        <p className="text-center mt-3">Vous avez déjà un compte ? <Link to="/">Connectez-vous</Link></p>
      </div>
    </div>
  )
}

export default Signup
