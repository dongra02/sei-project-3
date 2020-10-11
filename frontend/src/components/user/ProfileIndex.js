import React from 'react'
import { Link } from 'react-router-dom'
import { getAllProfiles } from '../../lib/api'
import BgMap from '../map/BgMap'

class ProfileIndex extends React.Component {

  state = {
    allProfiles: [],
    displayProfiles: [],
    filterSearch: ''
  }

  bgLatLng = [
    (Math.random() * 180) - 90,
    (Math.random() * 360) - 180
  ]

  componentDidMount = async () => {
    const response = await getAllProfiles()
    const sortedProfiles = [...response.data]
    sortedProfiles.sort((a, b) => a.username.localeCompare(b.username))
    this.setState({ allProfiles: sortedProfiles, displayProfiles: sortedProfiles })
  }

  handleChange = event => {
    const filterSearch = event.target.value
    const filteredProfile = this.state.allProfiles
      .filter(profile => {
        const regEx = new RegExp(filterSearch, 'i')
        return regEx.test(profile.username)
      })

    this.setState({ filterSearch, displayProfiles: filteredProfile })
  }

  render() {
    if (!this.state.allProfiles) return null
    return (
      <>
        <BgMap latLng={this.bgLatLng} />
        <div className="profile-index">
          <h3>Profiles</h3>
          <div className='container'>
            <div className="profile-search-field">
              <input
                className="form-control"
                type="text"
                name="filterSearch"
                placeholder="Search..."
                value={this.state.filterSearch}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='profile-list'>
            {this.state.displayProfiles.map((user) => (
              <div key={user.username} className="profile-list-item">
                <Link to={`/users/${user.id}`}>
                  <div className="user-details">
                    <div className="detail-name">{user.username}</div>
                    <div className="detail-quests">
                      <span>Created Quests: </span>
                      <span>{user.createdQuest.length}</span>
                    </div>
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