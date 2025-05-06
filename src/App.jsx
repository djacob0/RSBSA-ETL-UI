import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { AppProvider } from './renderer/contexts/AppContext';
import Dashboard from './renderer/components/Dashboard';
import LogViewer from './renderer/components/LogViewer';
import Notification from './renderer/components/Notification';
import WindowControls from './renderer/components/WindowControls';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <div className="draggable">
          <WindowControls />
        </div>

        <div className="content flex h-full bg-gray-50">
          <Router>
            <nav className="bg-white border-r border-gray-200 w-64 flex-shrink-0 h-full shadow-sm">
              <div className="p-6">
                <div className="mb-12 flex items-center justify-center">
                  {/* <div className="bg-green-600 text-white rounded-full p-3 mr-2">
                    <i className="fas fa-leaf text-xl"></i>
                  </div> */}
                </div>
                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-green-600 text-white font-semibold shadow-md'
                            : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                        }`
                      }
                    >
                      <i className="fas fa-tachometer-alt mr-3"></i>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/logs"
                      className={({ isActive }) =>
                        `flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-green-600 text-white font-semibold shadow-md'
                            : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                        }`
                      }
                    >
                      <i className="fas fa-file-alt mr-3"></i>
                      Logs
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="flex flex-col flex-1">
              <Notification />
              <div className="flex-1 overflow-auto p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/logs" element={<LogViewer />} />
                </Routes>
              </div>
            </div>
          </Router>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;