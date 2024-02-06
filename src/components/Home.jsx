import React, {useState, useEffect} from 'react'
import Form from './Form'
import Farmers from './Farmers'
import Footer from './Footer'
import Header from './Header'
import ratingCalculator from '../Rating'
import Dummy from './Dummy'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { connect } from 'react-redux'

function Home(props) {

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

  useEffect(() => {
    var size = props.farmers.length
    document.getElementById("ftitle").innerHTML = "Hello" + 
                                                    (size === 0 ? "!" : 
                                                    size === 1 ? " farmer!" : 
                                                    " farmers!"
                                                    )
    setAvgRating(ratingCalculator(props.farmers))
  }, [props.farmers])

  return (
    <div>
      <Header />
      <h1 id="ftitle"></h1>
      <Form />
      {
        props.farmers.length ? 
        <Farmers /> :
        dummyData && <ul>{dummyData.map(data => <li key={data.name}>{data}</li>)}</ul>
      }
      <h2>Avg rating is {avgRating}</h2>
      <button onClick={handleLogout}>Log Out</button>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    farmers : state.farmers.farmers
  }
}

export default connect(mapStateToProps)(Home)
