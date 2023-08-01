// Write your code here
import './index.css'
import {v4} from 'uuid'
import {format} from 'date-fns'
import {Component} from 'react'
import AppointmentsItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isFilterActive: false,
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
    const formattedData = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      title,
      date,
      isFavorite: false,
      id: v4(),
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: formattedData,
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

  onFilter = () => {
    const {isFavorite} = this.state
    this.setState({
      isFavorite: !isFavorite,
    })
  }

  getFilteredAppointments = () => {
    const {isFilterActive, appointmentList} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentList
  }

  render() {
    const {appointmentList} = this.state
    const {title, date, isFilterActive} = appointmentList
    const filterClassName = isFilterActive ? 'filled' : ''
    const filteredAppointment = this.getFilteredAppointments()

    return (
      <div className="bg-container">
        <div className="card-container">
          <div>
            <h1 className="heading">Add Appointment</h1>
            <form className="form" onSubmit={this.onAddAppointment}>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                id="title"
                value={title}
                type="text"
                className="text"
                placeholder="Title"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                id="date"
                type="date"
                value={date}
                className="date"
                onChange={this.onChangeDate}
              />

              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>

          <hr className="hr-line" />
          <div className="flex-container">
            <h1 className="result-heading">Appointments</h1>
            <button
              className={`favBtn ${filterClassName}`}
              type="button"
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="bottom-container">
            {filteredAppointment.map(each => (
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
