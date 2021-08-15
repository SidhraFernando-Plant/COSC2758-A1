import avatar from '../img/avatar.svg'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
function MyProfile(props) {
    function deleteProfile() {
        alert('deleting');
    }
    function editProfile() {
        alert('editing');
    }
    return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <h2 className="m-0 mr-2">{props.username}'s profile</h2>
        <img src={edit} className="profile-actions" onClick={editProfile}></img>
        <img src={trash} className="profile-actions" onClick={deleteProfile}></img>
      </div>
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