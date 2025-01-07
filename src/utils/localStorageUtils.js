export const getProfiles = () => {
  const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
  return profiles.map(profile => ({
      ...profile,
      skills: Array.isArray(profile.skills) ? profile.skills : [],
  }));
};


export const saveProfiles = (profile) => {
  localStorage.setItem("profiles", JSON.stringify(profile));
}
