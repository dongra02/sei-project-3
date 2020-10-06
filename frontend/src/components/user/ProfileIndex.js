import React from 'react'
import { Link } from 'react-router-dom'
import { getAllProfiles } from '../../lib/api'
import BgMap from '../map/BgMap'

class ProfileIndex extends React.Component {

  state = {
    allProfiles: null
  }

  bgLatLng = [
    (Math.random() * 180) - 90,
    (Math.random() * 360) - 180
  ]

  componentDidMount = async () => {
    const response = await getAllProfiles()
    this.setState({ allProfiles: response.data })
    console.log(response)
  }

  render() {
    if (!this.state.allProfiles) return null
    return (
      <>
        <BgMap latLng={this.bgLatLng} />
        <div>
        <h1>Create a New Quest</h1>
        <div>
        {this.state.allProfiles.map((user, i) => (
        <div key={i} className="container">
          <Link to={`/users/${user.id}`}>
            <div className="user-details">
              <div className="detail-name">{user.username}</div>
              <div className="detail-quests">{user.createdQuest.length}</div>
              <br />
            </div>
          </Link>
        </div>
      ))}
      </div>
    </div>
    </>
    )
  }
}

export default ProfileIndex