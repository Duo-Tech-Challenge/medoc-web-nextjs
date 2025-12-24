'use client';

import { useState } from 'react';
import { Card, CardBody, Button, Input } from '@/components/atoms';
import { Save, User, Clock, MapPin, Bell } from 'lucide-react';

export default function PharmacySettingsPage() {
    // Basic settings state
    const [settings, setSettings] = useState({
        name: 'PharmaLife Central',
        email: 'contact@pharmalife.com',
        phone: '+1 234 567 8900',
        address: '123 Health Blvd',
        city: 'New York',
        zipCode: '10001',
        notifications: true,
        autoAccept: false,
    });

    const handleChange = (field: string, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your pharmacy profile and preferences</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
            <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Navigation/Sidebar for Settings */}
          <div className="md:col-span-1 space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium flex items-center gap-3">
                  <User size={18} /> General Info
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 font-medium flex items-center gap-3 transition-colors">
                  <Clock size={18} /> Operating Hours
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 font-medium flex items-center gap-3 transition-colors">
                  <Bell size={18} /> Notifications
              </button>
          </div>

          <div className="md:col-span-2 space-y-6">
              {/* General Info Section */}
              <Card>
                  <CardBody>
                      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                          General Information
                      </h2>
                      
                      <div className="space-y-4">
                          <Input 
                            label="Pharmacy Name" 
                            value={settings.name} 
                            onChange={(e) => handleChange('name', e.target.value)} 
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input 
                                label="Email Contact" 
                                type="email"
                                value={settings.email}
                                onChange={(e) => handleChange('email', e.target.value)} 
                              />
                              <Input 
                                label="Phone Number" 
                                value={settings.phone}
                                onChange={(e) => handleChange('phone', e.target.value)} 
                              />
                          </div>

                          <div className="pt-4">
                              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                  <MapPin size={16} /> Address
                              </h3>
                              <Input 
                                label="Street Address" 
                                value={settings.address}
                                onChange={(e) => handleChange('address', e.target.value)} 
                              />
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                  <Input 
                                    label="City" 
                                    value={settings.city}
                                    onChange={(e) => handleChange('city', e.target.value)} 
                                  />
                                   <Input 
                                    label="Zip Code" 
                                    value={settings.zipCode}
                                    onChange={(e) => handleChange('zipCode', e.target.value)} 
                                  />
                              </div>
                          </div>
                      </div>
                  </CardBody>
              </Card>

              <Card>
                  <CardBody>
                      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                          Preferences
                      </h2>
                      
                      <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                              <div>
                                  <p className="font-medium text-gray-900">Email Notifications</p>
                                  <p className="text-xs text-gray-500">Receive emails for new orders and alerts</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={settings.notifications} 
                                    onChange={(e) => handleChange('notifications', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                              <div>
                                  <p className="font-medium text-gray-900">Auto-Accept Orders</p>
                                  <p className="text-xs text-gray-500">Automatically accept orders during business hours</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={settings.autoAccept} 
                                    onChange={(e) => handleChange('autoAccept', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                          </div>
                      </div>
                  </CardBody>
              </Card>
          </div>
      </div>
    </div>
  );
}
