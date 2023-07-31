// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, updateFavorite} = props
  const {title, date, id, isFavorite} = appointmentDetails

  const onClickFavorite = () => {
    updateFavorite(id)
  }

  const isFavoriteImg = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div className="flex">
        <h1 className="title-h1">{title}</h1>
        <img
          onClick={onClickFavorite}
          className="star"
          src={isFavoriteImg}
          alt="like"
        />
      </div>
      <p className="date-text">
        Date:{}
        {date}
      </p>
    </li>
  )
}
export default AppointmentItem
