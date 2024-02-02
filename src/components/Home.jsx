import React, {useState, useEffect} from 'react'
import Form from './Form'
import Farmer from './Farmer'
import Footer from './Footer'
import Header from './Header'
import { Container } from 'react-bootstrap'
import ratingCalculator from './Rating'
import Dummy from './Dummy'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

function Home() {

  const [dummyData, setDummyData] = useState(null);
  const [avgRating, setAvgRating] = useState(0.0)

  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  useEffect(() => {
    Dummy().then((result) => setDummyData(result));
  }, []);

  const [farmers, setFarmers] = useState([])

  function addFarmer(farmer){
    setFarmers(prevFarmers => {
      var updatedFarmers = [...prevFarmers, farmer]
      setAvgRating(ratingCalculator(updatedFarmers))
      return updatedFarmers
    })
  }

  useEffect(() => {
    var size = farmers.length
    document.getElementById("ftitle").innerHTML = "Hello" + (size === 0 ? "!" : size === 1 ? " farmer!" : " farmers!")
  }, [farmers])

  return (
    <div>
      <Header />
      <h1 id="ftitle"></h1>
      <Form onSubmit={addFarmer} />
      {
        farmers.length ? 
        <Container style={{display:"flex", flexWrap:"wrap", }}>
          {farmers.map(farmer => {
          return <Farmer farmer = {farmer} />
          })}
        </Container>  :
        dummyData && <ul>{dummyData.map(data => <li key={data.name}>{data}</li>)}</ul>
      }
      <h2>Avg rating is {avgRating}</h2>
      <button onClick={handleLogout}>Log Out</button>
      <Footer />
    </div>
  )
}

export default Home
