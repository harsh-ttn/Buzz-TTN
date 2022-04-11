import './profile.css'




const Profile = (props) => {
    return (
        <>
           
            <div className="profile-details">
                <img src={props.cover} className="cover" />
                

            </div>
            <div className="profile-info">
            <img src={props.self} className="self" />
            <div>
                <h1>{props.name}</h1>
                <h5>{props.about}</h5>
                <p>{props.location}</p>
                </div>
            </div>

        </>
    )
}

export default Profile;