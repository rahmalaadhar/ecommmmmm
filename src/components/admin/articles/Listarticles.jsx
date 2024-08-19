import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Affichearticle from './Affichearticle'
import {setPage, setLimit, getArticlesPagination} from
"../../../features/articleSlice"
import "../../../style.css"
import Pagination from './Pagination'


const Listarticles = () => {
  const {page,limit,searchTerm} = useSelector((state)=>state.storearticles);
  const dispatch=useDispatch();

  const getProducts=async()=>{
    await dispatch(getArticlesPagination())
    }
    
  useEffect(()=>{
    getProducts()}, [dispatch,page,limit,searchTerm])

    const handleLimitChange = (event) => {
      dispatch(setLimit(parseInt(event.target.value, 10)));
      dispatch(setPage(1)); // Réinitialiser la page lorsque le nombre d'éléments par
      //page change
      };
      
  return (
    <div>
      <Affichearticle/>
      <div style={{ "display": "flex", "justifyContent": "right"}}>
<div className="limit-selector-container">
<label>
Afficher &nbsp;
<select
value={limit}
onChange={(event) => {handleLimitChange(event)}}
>
<option value={5}>5</option>
<option value={10}>10</option>
<option value={20}>20</option>
<option value={100}>100</option>
</select>
</label>
</div>
</div>
      <Pagination/>
    </div>
  )
}

export default Listarticles
