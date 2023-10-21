import { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Profile() {
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  // Load profile data from localStorage if available
  useEffect(() => {
    const cachedProfileData = JSON.parse(localStorage.getItem('profileData'));
    if (cachedProfileData) {
      setProfileImage(cachedProfileData.image || '');
      setDisplayName(cachedProfileData.name || '');
    } else if (session) {
      // Fetch profile data only when there's a session (user is logged in)
      fetch('/api/profile')
        .then((response) => response.json())
        .then((data) => {
          setProfileImage(data.image || '');
          setDisplayName(data.name || '');

          // Cache the profile data in localStorage
          localStorage.setItem('profileData', JSON.stringify(data));
        });
    }
  }, [session]);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    
    // Upload the image file to the server
    const formData = new FormData();
    formData.append('image', imageFile);
  
    fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      // Update the image URL in state and persist it in the profile data
      setProfileImage(data.imageUrl);
      updateProfileData({ name: displayName, imageUrl: data.imageUrl });
    })
    .catch((error) => {
      console.error('Error uploading image:', error);
    });
  };

  const handleNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleSaveName = () => {
    updateProfileData({ name: displayName });
    setIsEditingName(false);
  };

  const updateProfileData = (dataToUpdate) => {
    fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Success message from the API

        // Update the cached profile data in localStorage
        const updatedProfileData = { ...JSON.parse(localStorage.getItem('profileData')), ...dataToUpdate };
        localStorage.setItem('profileData', JSON.stringify(updatedProfileData));
      })
      .catch((error) => {
        console.error('Error updating profile data:', error);
      });
  };
  return (
    <>
      <div className="mar-left">
        <Link href="/myblog" className="prof">
          <h4>My Blogs</h4>
        </Link>
        <div className="pro-form">
          <div className="profile-content">
            <div className="profile-image-box">
              <label htmlFor="profileImage" className="profile-image-label">
                <div
                  className="profile-image-circle"
                  style={{
                    backgroundImage: `url(${profileImage || '/default-profile-image.png'})`,
                  }}
                  onClick={() => document.getElementById('profileImageInput').click()}
                >
                  {session.user.image ? 'Update Profile Picture' : ''}
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImageInput"
                className="profile-image-input"
                onChange={handleImageChange}
              />
            </div>
            <div className="profile-name">
              {isEditingName ? (
                <div className="name-edit">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="profile-name-input"
                    value={displayName}
                    onChange={handleNameChange}
                  />
                  <button className="save-button btn btn-primary bt" onClick={handleSaveName}>
                    Save
                  </button>
                </div>
              ) : (
                <div className="name-display">
                  {displayName ? (
                    <>
                      <h3>{displayName}</h3>
                      <button
                        className="edit-button btn btn-primary bt"
                        onClick={() => setIsEditingName(true)}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <button
                      className="edit-button btn btn-primary bt"
                      onClick={() => setIsEditingName(true)}
                    >
                      Add Name
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
