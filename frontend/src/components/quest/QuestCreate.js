import React from 'react'

import QuestForm from './QuestForm'
import StopForm from './StopForm'
import StopList from './StopList'
import Map from '../map/Map'
import BgMap from '../map/BgMap'
import { createQuest, updateQuest, reverseGeoCode } from '../../lib/api'

class QuestCreate extends React.Component{

  state = {
    questFormData: {
      name: '',
      description: '',
      location: '',
      estTime: '',
      theme: 'theme',
      timer: false
    },
    stopFormData: {
      name: '',
      clue: '',
      answerType: 'Answer',
      answer: '',
      hint: '',
      location: {
        latitude: '',
        longitude: ''
      }
    },
    stops: [],
    stopToEdit: 0,
    flyTo: null,
    tabShow: 'info',
    geocoderValue: null,
    geocoderKey: 0,
    markers: []
  }

  themes = ['Food & Drink', 'Sightseeing', 'Adventure', 'Speed']
  
  bgLatLng = [
    (Math.random() * 180) - 90,
    (Math.random() * 360) - 180
  ]

  componentDidMount = () => {
    if (this.props.questToEdit) {
      const questToEdit = (this.props.questToEdit)
      const questFormData = { ...questToEdit, stops: [] }
      const stops = [ ...questToEdit.stops ]
      this.setState({ questFormData, stops })
    }

  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.tabShow === 'stops' && this.state.stops.length === 0) this.selectTab('addStop')
    // Dont fire the below if the first if block is fired
    else if (prevState.tabShow !== this.state.tabShow) this.getMarkers()
  }

  getMarkers = () => {
    const showingEditTab = this.state.tabShow === 'addStop'
    
    let markers = showingEditTab
      // Display one marker
      ? [{ location: this.state.stopFormData.location }]
      // Display all stops on route
      : this.state.stops.map(stop => {
        return { location: stop.location }
      })
    // Handle null value on edit single stop
    if (showingEditTab && !markers[0].location.latitude) markers = []
    this.setState({ markers })
  }

  refreshGeocoder = () => {
    const geocoderKey = (this.state.geocoderKey + 1) % 2
    this.setState({ geocoderKey })
  }

  handleQuestFormChange = event => {
    // TODO error display to user
    if (event.target.name === 'theme' && this.state.stops.length > 0) {
      console.log('changing theme illegally')
      return
    }

    const type = event.target.type
    const questFormData = {
      ...this.state.questFormData,
      [event.target.name]: type === 'checkbox' ? event.target.checked : event.target.value
    }
    this.setState({ questFormData })
  }

  handleStopFormChange = event => {
    const stopFormData = {
      ...this.state.stopFormData,
      [event.target.id]: event.target.value
    }
    this.setState({ stopFormData })
  }

  handleQuestSubmit = async () => {
    try {
      const location = this.state.stops[0].location
      const newQuestData = { ...this.state.questFormData, stops: [...this.state.stops], location }
      console.log(newQuestData)
      let response
      if (this.props.questToEdit) {
        response  = await updateQuest(newQuestData, this.props.questId)
      } else {
        response = await createQuest(newQuestData)
      }
      if (response.status === 201) this.props.history.push(`/quests/${response.data._id}`)
      if (response.status === 202) this.props.redirect()
    } catch (err) {
      console.log(err)
    }
  }

  submitStop = () => {
    const stops = [ ...this.state.stops ]
    const stopData = { ...this.state.stopFormData }

    if (stopData.answer === '') stopData.answer = 'tour'
    console.log(stopData)

    // New Stop
    if (this.state.stopToEdit === this.state.stops.length) stops.push(stopData)
    // Edit stop
    else stops[this.state.stopToEdit] = stopData
    
    this.setState({ stops })
    this.selectTab('stops')
  }

  deleteStop = (stopNum) => {
    const stops = this.state.stops.filter((stop, i) => i !== stopNum)
    this.setState({ stops, geocoderValue: '' }, this.refreshGeocoder)
  }

  // Fires on picking a result from the geocoder suggestions
  selectLocation = (location, { place_name: geocoderValue }) => {
    const { latitude, longitude } = location
    const flyTo = { latitude, longitude }
    const stopFormData = { ...this.state.stopFormData, location: flyTo }
    const markers = [{ location: flyTo }]
    this.setState({ flyTo, stopFormData, geocoderValue, markers }, () => this.setState({ flyTo: null }))
  }

  selectTab = (tabShow, stopNum) => {
    this.setState({ tabShow }, () => {
      // Call after setState so that other functions can read tabShow value
      if (tabShow === 'addStop') this.initStopForm(stopNum)
    })
  }

  initStopForm = (stopToEdit = this.state.stops.length) => {
    const isEdit = stopToEdit < this.state.stops.length

    const stopFormData = isEdit
      ? { ...this.state.stops[stopToEdit] }
      : {
        name: '',
        clue: '',
        answerType: 'Answer',
        answer: '',
        hint: '',
        location: { latitude: '', longitude: '' }
      }
    
    this.setState({ stopFormData, stopToEdit })
      
    // Set geocoder to correct value
    if (!isEdit) {
      this.setState({ geocoderValue: '' }, this.refreshGeocoder)
    } else {
      this.pickLocationFromMap(stopFormData.location)
      this.setState({ flyTo: stopFormData.location }, () => this.setState({ flyTo: null }))
    }
  }

  pickLocationFromMap = async (location) => {
    if (this.state.tabShow !== 'addStop') return
    const geoData = await reverseGeoCode(location)
    if (!geoData.data.features[0]) return
    const geocoderValue = geoData.data.features[0].place_name
    const stopFormData = { ...this.state.stopFormData, location }
    this.setState({ stopFormData, geocoderValue })
    this.getMarkers()
    this.refreshGeocoder()
  }

  render() {

    const {
      questFormData,
      stopFormData,
      stops,
      stopToEdit,
      flyTo,
      tabShow,
      geocoderValue,
      geocoderKey,
      markers
    } = this.state

    const tabStyles = {
      info: { display: tabShow === 'info' ? 'block' : 'none' },
      stops: { display: tabShow === 'stops' ? 'block' : 'none' },
      addStop: { display: tabShow === 'addStop' ? 'block' : 'none' }
    }

    const stopFormProps = {
      stopFormData,
      geocoderValue,
      geocoderKey,
      handleChange: this.handleStopFormChange,
      submitStop: this.submitStop,
      selectLocation: this.selectLocation,
      selectTab: this.selectTab,
      isNew: stopToEdit === stops.length,
      isTour: questFormData.theme === 'Sightseeing' || questFormData.theme === 'Food & Drink'
    }

    const questFormProps = {
      questFormData: questFormData,
      handleQuestFormChange: this.handleQuestFormChange,
      handleQuestSubmit: this.handleQuestSubmit,
      themes: this.themes,
      stops: stops.length
    }

    return (
      <div className="create-quest">
        <BgMap latLng={this.bgLatLng} />
        {this.props.questToEdit ? <h3>Edit Quest</h3> : <h3>Create a New Quest</h3>}
        <div className="create-container">
          <div className="create-info">
            <div className="show-tabs">
              <button value={'info'} onClick={() => this.selectTab('info')} className={`tab ${tabShow === 'info' ? '' : 'inactive'}`} >INFO</button>
              <button value={'stops'} onClick={() => this.selectTab('stops')} className={`tab ${tabShow === 'stops' || tabShow === 'addStop' ? '' : 'inactive'}`} >STOPS</button>
            </div>
            {/* Info tab */}
            <div className="create-tab" style={tabStyles.info}>
              <QuestForm {...questFormProps} />
            </div>
            {/* Stop Form */}
            <div className="create-tab" style={tabStyles.addStop}>
              <StopForm {...stopFormProps} />
            </div>
            {/* Stop List */}
            <div className="create-tab" style={tabStyles.stops}>
              <StopList stops={stops} changeTab={this.selectTab} deleteStop={this.deleteStop} />
            </div>
          </div>
          <div className="create-map">
            <Map
              flyTo={flyTo}
              getLocation={this.pickLocationFromMap}
              results={markers ? markers : null}
              clickMarker={() => null} // TODO deal with this
            />
          </div>
        </div>
      </div>
    )
  }
}

export default QuestCreate