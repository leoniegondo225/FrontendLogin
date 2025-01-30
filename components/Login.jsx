import React from 'react'
import { useState } from "react"
import { FaRegEnvelope } from "react-icons/fa"
import { FaLock } from "react-icons/fa";

const Login = ({LoginSuccess}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const login = async (e) => {
      e.preventDefault()

      if (!email || !password) {
        setError("Tous les champs doivent être remplis.");
        return;
      }

      try {
        const response = await fetch("https://backend-envent-app.vercel.app/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || "Identifiants invalides.";
          throw new Error(errorMessage);
        }

        const data = await response.json();
        LoginSuccess(data); // Appelle la fonction parent avec les données reçues
        
      } catch (error) {
        setError(error.message || "Une erreur s'est produite.")
    }

  }

    
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
                  <input type="email" className="form-control" id="email" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
              </div>
              <div className="mb-4 ">
                  <label htmlFor="password" className="form-label">Mot de passe</label>
                  <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input type="password" className="form-control" placeholder="Entrez votre mot de passe" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Connexion</button>
            </form>
            <p className="text-center mt-4">Pas de compte? <a href="#">Inscrivez-vous</a></p>
        </div>
        </div>

      </div>
    
  )
}

export default Login
