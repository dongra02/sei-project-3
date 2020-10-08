import React from 'react'
import { Link } from 'react-router-dom'
import { getAllProfiles } from '../../lib/api'
import BgMap from '../map/BgMap'

class ProfileIndex extends React.Component {

  state = {
    allProfiles: null,
    formData: {
      filterSearch: '',
      filterOption: ''
    }
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

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }

    this.setState({ formData })
  }

  render() {
    if (!this.state.allProfiles) return null
    return (
      <>
      <BgMap latLng={this.bgLatLng} />
        <div className="profile-index">
          <h3>Profiles</h3>
          {/* <input type='text' id='filterNames' onChange={this.handleChange()} placeholder='Search' /> */}
          <div className="input-field">
          <input
            type="text"
            name="filterSearch"
            placeholder="Search..."
            value={this.state.formData.filterSearch}
            onChange={this.handleChange}
          />
          </div>
          <div className="filter-option">
        <label htmlFor="filterOption">Filter Options :</label>
        <select id="filterOption" value={this.state.formData.filterOption} onChange={this.handleChange} >
          <option value="questAmount">Quest amount</option>
          <option value="questRating">Quest rating</option>
        </select>
      </div>
          <div className='profile-list'>
            {this.state.allProfiles.map((user, i) => (
              <div key={i} className="profile-list-item">
                <Link to={`/users/${user.id}`}>
                  <div className="user-details">
                    <div className="detail-name">{user.username}</div>
                    <div className="detail-quests">
                <span>Created Quests: </span>
                <span>{user.createdQuest.length}</span>
                </div>
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