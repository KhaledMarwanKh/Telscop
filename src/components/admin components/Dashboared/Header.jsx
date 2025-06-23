import React from 'react'
import { FiChevronDown, FiHome, FiLogOut, FiShield } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Header = (
    {
        setIsProfileMenuOpen,
        admin,
        isProfileMenuOpen
    }
) => {
  return (
      <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                      <Link to="/" className="flex items-center space-x-2 space-x-reverse ml-8">
                          <span className="text-2xl">🔭</span>
                          <span className="text-xl font-bold text-blue-600">تلسكوب</span>
                      </Link>
                      <div className="flex items-center space-x-2 space-x-reverse">
                          <FiShield className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-700 font-medium">لوحة تحكم الإدارة</span>
                      </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse">
                      {/* Profile Dropdown */}
                      <div className="relative">
                          <button
                              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                              className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                              <img
                                  src={admin.image}
                                  alt={admin.name}
                                  className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="text-right">
                                  <p className="text-sm font-medium text-gray-700">{admin.name}</p>
                                  <p className="text-xs text-gray-500">{admin.role}</p>
                              </div>
                              <FiChevronDown className="w-4 h-4 text-gray-500" />
                          </button>

                          {/* Dropdown Menu */}
                          {isProfileMenuOpen && (
                              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                  <div className="px-4 py-3 border-b border-gray-100">
                                      <p className="text-sm font-medium text-gray-800">{admin.name}</p>
                                      <p className="text-xs text-gray-500">{admin.email}</p>
                                  </div>

                                  <div className="border-t border-gray-100 mt-2">
                                      <Link
                                          to="/"
                                          className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                          onClick={() => setIsProfileMenuOpen(false)}
                                      >
                                          <FiHome className="w-4 h-4 text-gray-500" />
                                          <span>الموقع الرئيسي</span>
                                      </Link>

                                      <Link
                                          to="/admin/login"
                                          className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                          onClick={() => setIsProfileMenuOpen(false)}
                                      >
                                          <FiLogOut className="w-4 h-4 text-red-500" />
                                          <span>تسجيل الخروج</span>
                                      </Link>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </header>

  )
}

export default Header