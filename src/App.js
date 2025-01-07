import React, { useEffect, useState } from 'react'
import { getProfiles, saveProfiles } from './utils/localStorageUtils';
import ProfileCard from './components/ProfileCard'
import ProfileForm from './components/ProfileForm'

const App = () => {
  // declaring variables
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({
    id: null,
    name: '',
    email: '',
    std: '',
    dob: '',
    phone: '',
    profilePicture: '',
    skills: []
  });
  const [currentSkill, setCurrentSkill] = useState({
    name: '',
    category: 'Technical',
    level: 'Beginner',
    selected: false
  });
  const [showProfileForm, setShowProfileForm] = useState(false);

  // loading profile from ls
  useEffect(() => {
    const storedProfiles = getProfiles();
    setProfiles(storedProfiles);
  }, []);

  //handler to save form
  const saveProfile = () => {
    if (currentProfile.name && currentProfile.email) {
      let updatedProfiles = [...profiles];
      if (currentProfile.id != null) {
        //update
        updatedProfiles = updatedProfiles.map((p) =>
          p.id === currentProfile.id ? currentProfile : p);
      }
      else {
        //add
        const newProfile = { ...currentProfile, id: Date.now(), skills: [] };
        updatedProfiles.push(newProfile);
      }

      //render and save the changes
      setProfiles(updatedProfiles);
      saveProfiles(updatedProfiles);
      setCurrentProfile({
        id: null,
        name: '',
        email: '',
        std: '',
        dob: '',
        phone: '',
        profilePicture: '',
        skills: []
      });
      setShowProfileForm(false);
    }
  };


  const deleteProfile = (id) => {
    const updatedProfiles = profiles.filter((p) => p.id !== id);
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
  };

  const editProfile = (profile) => {
    setCurrentProfile(profile);
    setShowProfileForm(true);
  };

  const addSkill = () => {
    if (currentSkill.name) {
      const updatedSkills = [...(currentProfile.skills || []), currentSkill];
      setCurrentProfile({ ...currentProfile, skills: updatedSkills });
      setCurrentSkill({ name: '', category: 'Technical', level: 'Beginner', selected: false });
    };
  };

  const deleteSelectedSkills = () => {
    if (!currentProfile.skills) {
      console.warn('No skills to delete');
      return;
    }
    const updatedSkills = currentProfile.skills.filter(skill => !skill.selected);
    setCurrentProfile({ ...currentProfile, skills: updatedSkills });
  };



  return (
    <>
      <header className='bg-blue-950 text-white text-center py-4'>
        <h1 className=' text-xl sm:text-3xl font-bold'>Student Profile Management System</h1>
      </header>

      <div className="m-5">
        <button onClick={() => setShowProfileForm(true)} className='px-5 py-2 bg-amber-500 rounded-xl text-white font-semibold text-xl'>Create Profile</button>
      </div>

      <ProfileCard
        profiles={profiles}
        editProfile={editProfile}
        deleteProfile={deleteProfile}
      />

      {showProfileForm && (
        <ProfileForm
          currentProfile={currentProfile}
          setCurrentProfile={setCurrentProfile}
          currentSkill={currentSkill}
          setCurrentSkill={setCurrentSkill}
          saveProfile={saveProfile}
          addSkill={addSkill}
          deleteSelectedSkills={deleteSelectedSkills}
        />
      )}


    </>
  );








































  // return (
  //   <div>
  //     <header className='bg-gray-700 text-white text-center py-3'>
  //       <h1 className=' text-xl sm:text-3xl font-bold'>Student Profile Management System</h1>
  //     </header>
  //     <div className="m-5">
  //       <button className='px-5 py-2 bg-blue-950 rounded-lg text-white font-semibold text-xl'>Create Profile</button>
  //     </div>

  //     <ProfileCard />

  //     <ProfileForm />
  //   </div>
  // )
};

export default App
