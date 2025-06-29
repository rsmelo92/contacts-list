import React from 'react'

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-6">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="plusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          
          {/* Main background circle */}
          <circle cx="100" cy="100" r="90" fill="url(#bgGradient)" stroke="#cbd5e1" strokeWidth="2" />
          
          {/* Phone icon */}
          <rect x="70" y="60" width="60" height="100" rx="8" fill="url(#phoneGradient)" />
          <rect x="75" y="65" width="50" height="70" rx="4" fill="#ffffff" opacity="0.9" />
          
          {/* Phone screen content */}
          <rect x="80" y="75" width="40" height="25" rx="2" fill="#f1f5f9" />
          <rect x="85" y="80" width="30" height="3" rx="1" fill="#94a3b8" />
          <rect x="85" y="85" width="20" height="3" rx="1" fill="#94a3b8" />
          <rect x="85" y="90" width="25" height="3" rx="1" fill="#94a3b8" />
          
          
          {/* Plus sign for adding contacts */}
          <g transform="translate(130, 50)">
            <circle cx="0" cy="0" r="20" fill="url(#plusGradient)" />
            <rect x="-2" y="-8" width="4" height="16" rx="2" fill="#ffffff" />
            <rect x="-8" y="-2" width="16" height="4" rx="2" fill="#ffffff" />
          </g>
          
          {/* Floating contact cards */}
          <g transform="translate(40, 80)">
            <rect x="0" y="0" width="25" height="35" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" opacity="0.7" />
            <circle cx="12.5" cy="10" r="3" fill="#94a3b8" />
            <rect x="8" y="16" width="9" height="2" rx="1" fill="#94a3b8" />
            <rect x="6" y="20" width="13" height="2" rx="1" fill="#94a3b8" />
          </g>
          
          <g transform="translate(150, 110)">
            <rect x="0" y="0" width="25" height="35" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
            <circle cx="12.5" cy="10" r="3" fill="#94a3b8" />
            <rect x="8" y="16" width="9" height="2" rx="1" fill="#94a3b8" />
            <rect x="6" y="20" width="13" height="2" rx="1" fill="#94a3b8" />
          </g>
          
          {/* Decorative dots */}
          <circle cx="50" cy="40" r="3" fill="#cbd5e1" opacity="0.6" />
          <circle cx="160" cy="80" r="2" fill="#cbd5e1" opacity="0.6" />
          <circle cx="45" cy="160" r="2" fill="#cbd5e1" opacity="0.6" />
          <circle cx="170" cy="170" r="3" fill="#cbd5e1" opacity="0.6" />
        </svg>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No contacts yet
      </h3>
      <p className="text-gray-600 mb-4 max-w-sm">
        Start building your contacts list by adding your first contact. 
        It&apos;s easy to get started!
      </p>
    </div>
  )
}
