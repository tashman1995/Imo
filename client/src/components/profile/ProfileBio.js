import React from "react";
import ProfileTable from "./ProfileTable";

const ProfileBio = ({ profile: { bio } }) => {
  return (
    <ProfileTable title="User Biography">
      <tr >
        <td className="bio paragraph">{bio}</td>
      </tr>
    </ProfileTable>
  );
};

export default ProfileBio;
