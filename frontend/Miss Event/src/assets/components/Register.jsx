import React from 'react'
import { Camera, Shield, Zap, Headphones, Building, Link, Megaphone } from 'lucide-react';

const InputField = ({label, type='text', placeholder, value, onchange, name, maxLength, className = ''})=>(
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onchange}
            maxLength={maxLength}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
        />
    </div>
);


const FeatureItem = ({icon: Icon, text})=>(
    <div className="flex items-center">
        <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
        <Icon className="text-white" size={20} />
        </div>
    <span>{text}</span>
    </div>
);

const AvatarUpload = ({preview, onImageChange, alt = 'Avater'})=>(
    <div className="text-center mb-6">
        <div className="relative inline-block">
            <img
                src={preview}
                alt={alt}
                className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <label className="absolute bottom-0 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
                <Camera className="text-black" size={16} />
                <input type="file" accept="image/*" onChange={onImageChange} className="hidden"/>
            </label>
        </div>
  </div>
);


const LeftPanel = ({ isOrganization }) => {
  const userFeatures = [
    { icon: Shield, text: "Secure and encrypted data" },
    { icon: Zap, text: "Fast and easy registration" },
    { icon: Headphones, text: "24/7 customer support" }
  ];

  const orgFeatures = [
    { icon: Building, text: "Professional organization profiles" },
    { icon: Link, text: "Link your organization's website" },
    { icon: Megaphone, text: "Promote your services and events" }
  ];

  return (
    <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-black to-gray-800 p-10 text-white">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
          <p className="mb-8">
            {isOrganization 
              ? "Register your organization to access exclusive features and content."
              : "Create an account to access exclusive features and content."
            }
          </p>
        </div>
        <div className="space-y-4">
          {(isOrganization ? orgFeatures : userFeatures).map((feature, index) => (
            <FeatureItem key={index} icon={feature.icon} text={feature.text} />
          ))}
        </div>
      </div>
    </div>
  );
};


const UserForm = ({formData, onChange, onSubmit, onImageChange, avatarPreview})=>(
    <div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Register Yourself
        </h2>

        <AvatarUpload preview={avatarPreview} onImageChange={onImageChange} alt="User Avatar"/>

        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="First Name" name="firstName" placeholder="John" value={formData.firstName} onChange={onChange}/>
                <InputField label="Last Name" name="lastName" placeholder="Doe" value={formData.lastName} onChange={onChange}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Username" name="username" placeholder="johndoe" value={formData.username} onChange={onChange}/>
                <InputField label="Email" type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={onChange}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Phone Number" type="tel" name="phoneNumber" placeholder="123-456-7890" value={formData.phoneNumber} onChange={onChange} maxLength={11}/>
                <InputField label="Address" name="address" placeholder="123 Main St, City" value={formData.address} onChange={onChange}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={onChange}/>
                <InputField label="Confirm Password" type="password" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={onChange}/>
            </div>

            <div className="flex items-start">
                <input
                id="userTerms" type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={onChange} className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-500"/>
                <label htmlFor="userTerms" className="ml-3 text-sm font-light text-gray-700">
                I accept the{' '}
                <a href="#" className="text-black hover:underline">Terms and Conditions</a>
                </label>
            </div>

            <button type="button" onClick={onSubmit} className="w-full py-3.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-300 shadow-lg">Create Account</button>

            <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <a href="#" className="font-medium text-black hover:underline">Sign in</a>
            </div>
        </div>
    </div>
)

const Register = () => {
  return (
    <div>
        <p>THis is register page</p>
    </div>
  )
}

export default Register