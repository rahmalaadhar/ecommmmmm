import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import "../../style.css"

const Affichearticlecard = () => {

  const dispatch = useDispatch();
let navigate=useNavigate();//pour la redirection directe
const handleAddToCart = (art) => {
dispatch(addToCart(art));//dispatch car on a utiliser une methode du reducer
navigate("/cart");
};
   
    const {articles,isLoading,error} = useSelector((state)=>state.storearticles);
  return (
    <div className='card-container'>
      {isLoading ? (<h1><center>Loading ....</center></h1>)
:error ? (<h1><center>connexion Error </center></h1>): 
<>
{articles.map((article,ind)=>
<div className='card' key={ind}>
    {article.imageart && <img src={article.imageart} alt ={article.reference}/>}
    <div className='card-content'>
    <h1 className='card-title'>{article.reference}</h1>
    <p className='card-description'>{article.designation.substr(0,20)}</p>
    <h1 className='card-title'>Prix : {article.prix} TND</h1>
    <button className='card-button' disabled={article.qtestock<=1}
onClick={() => handleAddToCart(article)}><i className="fa-solid fa-cartshopping"></i>Add to card</button>
    </div>
      </div>
     
      )}
       </>
}
      </div>
)} 

export default Affichearticlecard
