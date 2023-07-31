// Write your code here
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import AppointmentsItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      title,
      date,
      isFavorite: false,
      id: uuidv4(),
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  isFav = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  render() {
    const {appointmentList} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <form onSubmit={this.onAddAppointment}>
            <div>
              <p className="label">TITLE</p>
              <input
                type="text"
                className="text"
                placeholder="Title"
                onChange={this.onChangeTitle}
              />
              <p className="label">DATE</p>
              <input
                type="date"
                className="date"
                onChange={this.onChangeDate}
              />
            </div>

            <button className="button" type="submit">
              Add
            </button>
          </form>
          <hr className="hr-line" />
          <div className="flex-container">
            <h1 className="result-heading">Appointments</h1>
            <button className="favBtn" type="button">
              Starred
            </button>
          </div>
          <ul className="bottom-container">
            {appointmentList.map(each => (
              <AppointmentsItem
                key={each.id}
                updateFavorite={this.isFav}
                appointmentDetails={each}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
