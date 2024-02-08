import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

function Songs() {

  const navigate = useNavigate()
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    if(!localStorage.getItem("spotifyToken")){
      navigate('/')
    }
  }, [])

  async function searchArtist(event){
    event.preventDefault()
    const spotifyToken = localStorage.getItem('spotifyToken')
    // const {data} = await axios.get('https://api.spotify.com/v1/search', {
    //   headers : {
    //     Authorization: `Bearer ${spotifyToken}`
    //   },
    //   params : {
    //     q : searchKey,
    //     type : "artist"
    //   }
    // })
    const url = `https://api.spotify.com/v1/search?q=${searchKey}&type="artist"`

    await fetch(url, {
      headers : {
        Authorization: `Bearer ${spotifyToken}`
      }
    }).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    

    // console.log(data)
  }

  return (
    <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <form>
              <div class="input-group">
                <div class="form-outline" data-mdb-input-init>
                  <input type="search" id="form1" class="form-control" />
                  <label class="form-label" for="form1">
                    Search
                  </label>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-mdb-ripple-init
                  onChange={event => setSearchKey(event.target.value)}
                  onClick={searchArtist}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Songs
