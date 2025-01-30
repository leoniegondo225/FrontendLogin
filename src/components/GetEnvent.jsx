import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

function GetEnvent({data, setData}) {

    console.log(data)

  return (
    <div className='py-5'>
      <div className="container">
        <div className="row text-center align-items-center">
            {data && data.length > 0 ? (
                <>
                    <p className="h2 fw-bold mb-4">Evénements à la une</p>
                    {data && data.length > 0 && data.map(item => (
                        <div className="col-6 col-md-3 mb-3" key={item._id}>
                           <div className="card">
                            <img src={item.photo && item.photo !== "dfdfdfdff" ? item.photo : "/img/i1.jpg"} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.titre}</h5>
                                <p className="card-text">{item?.description}</p>
                                <p>Prix: {item.prix}</p>
                                <Link to={`/details/${item._id}`} className="btn btn-primary">Details <FaArrowRight /></Link>
                            </div>
                            </div>
                        </div>
                    ))}
                </>
            ): (
                <p>Aucun événement</p>
            )}
           
        </div>
      </div>
    </div>
  )
}

export default GetEnvent
