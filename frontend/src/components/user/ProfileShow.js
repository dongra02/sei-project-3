import React from 'react'
import { getSingleProfile } from '../../lib/api'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import BgMap from '../map/BgMap'

class ProfileShow extends React.Component {
  state = {
    profile: '',
    isUser: false
  }

  userId  = this.props.userId
  
  bgLatLng = [
    (Math.random() * 180) - 90,
    (Math.random() * 360) - 180
  ]

  componentDidMount = async () => {
    const profileId = this.userId ? this.userId : this.props.match.params.id
    const isUser = this.userId ? true : false
    const response = await getSingleProfile(profileId)
    this.setState (
      { profile: response.data, isUser }
    )
  }

  render() {
    if ( !this.state.profile ) return null
    return (
      <div className='profile'>
        <BgMap latLng={this.bgLatLng} />
        <table className='table'>
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Quests</th>
            </tr>
          </thead>
          </table>
        <h1 className='title-text'>{this.state.profile.username}</h1>
        <div><img src={this.state.profile.imageUrl} alt='Profile image' /></div>
        <h3>{this.state.profile.email}</h3>
        <h2>Created Quests:</h2>
        {this.state.profile.createdQuest.map((quest, i) => (
          <div key={i} className='container-quest'>
            <Link to={`/quests/${quest.id}`}>
              <div className="quest-details">
                <div className="detail-name">{quest.name}</div>
                <div className="detail-theme">{quest.theme}</div>
                <div className="detail-rating">{quest.avgRating}</div>
                <br />
              </div>
            </Link>
          </div>
        ))}
      </div>
    )
  }
} 

export default ProfileShow