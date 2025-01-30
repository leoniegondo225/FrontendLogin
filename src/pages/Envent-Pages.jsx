import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import GetEnvent from '../components/GetEnvent'
import GetEvent from '../controllers/get.controller'

function EnventPages() {
    const [data, setData] = useState([])

    useEffect(() => {
        GetEvent(data, setData)
    }, [])

  return (
    <>
       <Navbar />
       <GetEnvent data={data} setData={setData}  />
    </>
  )
}

export default EnventPages
