import React, { useState } from 'react';

const ProfileForm = ({
    currentProfile,
    setCurrentProfile,
    currentSkill,
    setCurrentSkill,
    saveProfile,
    addSkill,
    deleteSelectedSkills }) => {

    const skills = Array.isArray(currentProfile?.skills) ? currentProfile.skills : [];

    const toggleSkillSelection = (index) => {
        const updatedSkills = currentProfile.skills.map((s, idx) => idx === index ? { ...s, selected: !s.selected } : s);
        setCurrentProfile((prevProfile) => ({
            ...prevProfile,
            skills: updatedSkills,
        }));
    };

    return (
        <>
            <div className="mb-8 m-5 p-5 rounded-2xl bg-gray-200 max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-5xl mx-auto shadow-2xl">
                <h2 className="text-2xl text-center font-semibold mb-2 tracking-wide">Profile Form</h2>
                <div className='space-y-2'>
                    <label className='p-2 tracking-wider'>Name</label>
                    <input
                        type="text"
                        // placeholder="Name"
                        value={currentProfile.name}
                        onChange={(e) =>
                            setCurrentProfile({ ...currentProfile, name: e.target.value })
                        }
                        className="border border-black p-2 w-full bg-transparent"
                    />
                    <label className='p-2 tracking-wider'>Email</label>
                    <input
                        type="email"
                        // placeholder="Email"
                        value={currentProfile.email}
                        onChange={(e) =>
                            setCurrentProfile({ ...currentProfile, email: e.target.value })
                        }
                        className="border border-black p-2 w-full bg-transparent"
                    />
                    <label className='p-2 tracking-wider'>Standard</label>
                    <select
                        value={currentProfile.standard}
                        onChange={(e) =>
                            setCurrentProfile({ ...currentProfile, standard: e.target.value })
                        }
                        className="border border-black p-2 w-full bg-transparent"
                    >
                        {[...Array(10).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                                {num + 1}
                            </option>
                        ))}
                    </select>
                    <label className='p-2 tracking-wider'>Date of Birth</label>
                    <input
                        type="date"
                        value={currentProfile.dob}
                        onChange={(e) =>
                            setCurrentProfile({ ...currentProfile, dob: e.target.value })
                        }
                        className="border border-black p-2 w-full bg-transparent"
                    />
                    <label className='p-2 tracking-wider'>Phone Number</label>
                    <input
                        type="text"
                        // placeholder="Phone Number"
                        value={currentProfile.phone}
                        onChange={(e) =>
                            setCurrentProfile({ ...currentProfile, phone: e.target.value })
                        }
                        className="border border-black p-2 w-full bg-transparent"
                    />
                    <label className='p-2 tracking-wider'>Profile Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setCurrentProfile({
                                ...currentProfile,
                                profilePicture: URL.createObjectURL(e.target.files[0]),
                            })
                        }
                        className="border border-black p-2 w-full bg-transparent"
                    />
                </div>
                <button
                    onClick={saveProfile}
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                >
                    Save Profile
                </button>

                <div className="mt-4">
                    <h3 className="text-lg font-medium">Skills</h3>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <input
                            type="text"
                            placeholder="Skill Name"
                            value={currentSkill.name}
                            onChange={(e) =>
                                setCurrentSkill({ ...currentSkill, name: e.target.value })
                            }
                            className="border border-black p-2 w-full bg-transparent flex-1"
                        />
                        <select
                            value={currentSkill.category}
                            onChange={(e) =>
                                setCurrentSkill({ ...currentSkill, category: e.target.value })
                            }
                            className="border border-black p-2 w-full bg-transparent flex-1"
                        >
                            <option>Technical</option>
                            <option>Soft Skills</option>
                            <option>Others</option>
                        </select>
                        <select
                            value={currentSkill.level}
                            onChange={(e) =>
                                setCurrentSkill({ ...currentSkill, level: e.target.value })
                            }
                            className="border border-black p-2 w-full bg-transparent flex-1"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                    </div>
                    <div className="buttons mt-2 space-x-5">
                        <button
                            onClick={addSkill}
                            className="bg-green-500 text-white px-4 py-2 rounded flex-1 sm:flex-none"
                        >
                            Add Skill
                        </button>
                        <button
                            onClick={deleteSelectedSkills}
                            className="bg-red-500 text-white px-4 py-2 rounded flex-1 sm:flex-none"
                        >
                            Delete Skills
                        </button>
                    </div>
                    <div className="mt-4">
                        <h4 className="text-md font-medium">Added Skills</h4>
                        <ul className="list-disc ml-6">
                            {skills.map((skill, index) => (
                                <li key={index} className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        checked={skill?.selected || false}
                                        onChange={() => toggleSkillSelection(index)}
                                        className="mr-2"
                                    />
                                    {skill.name} - {skill.category} - ({skill.level})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileForm;
