// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, id, updateFavorite} = props
  const {isFavorite, title, date} = appointmentDetails

  const onClickFavorite = () => {
    updateFavorite(id)
  }

  const isFavoriteImg = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div className="flex">
        <p className="title-h1">{title}</p>
        <button
          className="star-btn"
          type="button"
          data-testid="star"
          onClick={onClickFavorite}
        >
          <img className="star" src={isFavoriteImg} alt="star" />
        </button>
      </div>
      <p className="date-text">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
