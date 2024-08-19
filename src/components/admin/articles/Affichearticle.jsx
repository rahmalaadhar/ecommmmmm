import React from 'react'
import '../../../style.css'
import {  useSelector } from "react-redux";

 const Affichearticle = () => {
    const {articles,isLoading,error} = useSelector((state)=>state.storearticles);
  return (
    <div className="table-container">
      {isLoading ? (
                <div className="loading-message">Chargement en cours...</div>
            ) : error ? (
                <div className="error-message">Erreur : {error}</div>
            ) : (
    <table >
    
    <thead>
    <tr>
        <th >Image</th>
        <th>Référence</th>
        <th>Désignation</th>
        <th>Marque</th>
        <th>Quanité</th>
        <th>Prix</th>
        <th>Modifier</th>
        <th>Supprimer</th>
    </tr>
    </thead>
    <tbody>
        {
            articles.map((art,index)=>
            <tr key={index}>
                <td><img src ={art.imageart} width={80} height={80} /></td>
                <td>{art.reference}</td>
                <td>{art.designation}</td>
                <td>{art.marque}</td>
                <td>{art.qtestock}</td>
                <td>{art.prix}</td>
                <td><button className='edit'>
                <i className="fa-solid fa-pen-to-square"></i>Update</button></td>
    
                <td><button className="delete" ><i class="fa-solid fa-trash"></i>Delete</button></td>
    
            </tr>
            )}
    
    </tbody>
    <tfoot>
                
            </tfoot>
    </table>
)}
    </div>    
  )
}

export default Affichearticle
