// Removed useState and useEffect as they are not directly used in this file
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './pages/Home';
import DesignStudio from './pages/DesignStudio';
import Preview3D from './pages/Preview3D';
import Auth from './pages/Auth';
import Order from './pages/Order';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DesignProvider } from './contexts/DesignContext';

function AppContent() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
          <Route path="/design" element={user ? <DesignStudio /> : <Navigate to="/auth" />} />
          <Route path="/preview" element={user ? <Preview3D /> : <Navigate to="/auth" />} />
          <Route path="/order" element={user ? <Order /> : <Navigate to="/auth" />} />
          <Route path="/payment" element={user ? <Payment /> : <Navigate to="/auth" />} />
          <Route path="/confirmation" element={user ? <Confirmation /> : <Navigate to="/auth" />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DesignProvider>
        <Router>
          <AppContent />
        </Router>
      </DesignProvider>
    </AuthProvider>
  );
}

export default App;