import React from 'react'

import ProfileShow from './ProfileShow'
import { getUserProfile } from '../../lib/api'


class UserProfile extends React.Component{
  state = {
    profileData: {}
  }

  componentDidMount = async () => {
    try {
      const profileData = await getUserProfile()
      this.setState({ profileData })
      console.log(profileData)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { profileData } = this.state
    if (!profileData) return <div>...loading profile...</div>
    
    return (
      <ProfileShow profileData={profileData} />
    )
  }
}

export default UserProfile