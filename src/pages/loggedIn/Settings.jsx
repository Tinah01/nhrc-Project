import { InputSwitch } from 'primereact/inputswitch';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom/UserAtom';

export default function Settings() {
    const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
    const user = useRecoilValue(userState);
    const [email, setEmail] = useState(user?.email);
    const [username, setUsername] = useState(user.name);
  
    const handleNotificationToggle = () => {
      setNotificationsEnabled((prev) => !prev);
    };
  
    const handleSave = () => {
      alert('Settings Saved!');
    };
  
    return (
      <div className="flex h-fit w-full">
      
  
        {/* Main Content */}
        <div className="flex-1 bg-gray-50 p-3 lg:p-10">
          <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>
  
          <div className="space-y-8">
            {/* Account Settings Form */}
            <div className="space-y-4 bg-white lg:p-6 rounded-lg shadow-md shadow-gray-100">
              <h2 className="text-xl font-semibold">Update Your Information</h2>
              
              <div>
                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className=" input"
                  placeholder="Enter your username"
                />
              </div>
  
              <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className='input'
                />
              </div>
            </div>
  
            {/* Notification Settings */}
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-md shadow-gray-100">
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
              <div className="flex items-center justify-between">
                <label className="text-gray-700">Email Notifications</label>
                <InputSwitch value={isNotificationsEnabled} onChange={handleNotificationToggle}/>
              </div>
            </div>
  
            {/* Save Button */}
            <div className="text-right">
              <button
                onClick={handleSave}
                className="btn__pri"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
