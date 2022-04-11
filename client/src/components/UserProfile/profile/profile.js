import "./profile.css";

const Profile = (props) => {
  return (
    <>
      <div className="profile-info">
        <div>
          <h1>{props.name}</h1>
          <h5>{props.about}</h5>
          <p>{props.location}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
