import React from 'react'

import ProfileShow from './ProfileShow'
import { getUserProfile } from '../../lib/api'


class UserProfile extends React.Component{
  state = {
    userId: ''
  }

  componentDidMount = async () => {
    try {
      const user = await getUserProfile()
      this.setState({ userId: user.data.id })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { userId } = this.state

    if (!userId) return <div>...loading profile...</div>
    
    return (
      <ProfileShow userId={userId} />
    )
  }
}

export default UserProfile