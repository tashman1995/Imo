import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile: {
    bio,
    equipment,
    user: {name}
}}) => {
    return (
        <div>
            
        </div>
    )
}

ProfileAbout.propTypes = {
profile: PropTypes.object.isRequired,
}

export default ProfileAbout
