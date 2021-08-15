import avatar from '../img/avatar.svg'
function MyProfile(props) {
    return (
    <div>
      <h2 className="text-center">{props.username}'s profile</h2>
      <div className="profile-details d-flex flex-column bg-light rounded mt-3 border justify-content-between">
        <div className="d-flex align-items-center">
            <img src={avatar} className="avatar"></img>
            <h2 className="ml-2">{props.username}</h2>
        </div>
        <span className="ml-2">Email: {props.email}</span>
        <span className="ml-2">Joined on: {props.dateJoined}</span>
      </div>
    </div>
    );
  }
export default MyProfile;