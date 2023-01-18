import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification.length !== 0) {
    if (notification !== 'initial state') {
      return (
        <div style={style}>
          {notification}
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter,
  }
}


const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications