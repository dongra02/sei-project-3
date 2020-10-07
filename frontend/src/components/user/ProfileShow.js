import React from 'react'
import { getSingleProfile } from '../../lib/api'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

class ProfileShow extends React.Component {
  state = {
    profile: ''
  }

  componentDidMount = async () => {
    console.log(this.props.match.params.id)
    const response = await getSingleProfile(this.props.match.params.id)
    this.setState (
      { profile: response.data }
    )
    console.log(this.state.profile)
  }

  render() {
    if ( !this.state.profile ) return null
    return (
      <div className='profile'>
        <table className='table'>
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Quests</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Email</th>
              <td>{this.state.profile.email}</td>
            </tr>
            <tr>
            <th>Username</th>
              <td>{this.state.profile.username}</td>
            </tr>
            <tr>
              <th>Created Quests</th>
              <td>{this.state.profile.createdQuest.length}</td>
              {this.state.profile.createdQuest.map((quest, i) => (
                <div key={i} className='container'>
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
            </tr>
        </tbody>
        </table>
      </div>
    )
  }
} 

export default ProfileShow