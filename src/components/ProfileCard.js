import React, { useEffect, useState } from 'react';
import { getProfiles } from '../utils/localStorageUtils';

const ProfileCard = ({ profiles, editProfile, deleteProfile }) => {

    const handleEdit = (profile) => {
        editProfile(profile);
    };

    return (

        <>
            <h2 className='m-5 text-2xl font-semibold'>Profiles</h2>
            <ul>
                {profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <li
                            key={profile.id}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-4 mt-2 gap-4 sm:gap-2 rounded-xl shadow-xl bg-white m-5"
                        >
                            <div className="flex items-start gap-4">
                                {profile.profilePicture && (
                                    <img
                                        src={profile.profilePicture}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                )}
                                <div>
                                    <span className="text-sm sm:text-base font-medium">Name: {profile.name}</span>
                                    <p className="text-sm sm:text-base font-medium">Email: {profile.email}</p>

                                    <div className="mt-2">
                                        <h3 className="text-md font-semibold">Skills</h3>
                                        {profile.skills?.length > 0 ? (
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {(profile.skills || []).map((skill, index) => (
                                                    <li key={index} className="mt-1">
                                                        <span className="font-medium">{skill.name}</span> - {skill.level} ({skill.category})
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-500">No skills added</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={() => handleEdit(profile)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteProfile(profile.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (<p className='m-5 text-lg'>No Profiles Available.</p>)};
            </ul>
        </>
    );
};

export default ProfileCard;
