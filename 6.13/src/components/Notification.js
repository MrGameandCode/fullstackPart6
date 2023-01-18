import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
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

export default Notification