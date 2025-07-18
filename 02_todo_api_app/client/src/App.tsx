import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import TaskList from './components/TaskList';
import './App.css';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <TaskList /> : <AuthPage />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
