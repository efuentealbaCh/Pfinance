import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import BudgetsPage from './pages/BudgetsPage';
import SavingsGoalsPage from './pages/SavingsGoalsPage';
import ProfilePage from './pages/ProfilePage';
import GroupsList from './pages/GroupsList';
import GroupDetail from './pages/GroupDetail';
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './components/AppLayout';

export default function App() {
  return (
    <Routes>
      {/* Landing page pública */}
      <Route path="/" element={<LandingPage />} />

      {/* Rutas públicas de autenticación */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas con layout compartido */}
      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/savings" element={<SavingsGoalsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/groups" element={<GroupsList />} />
        <Route path="/groups/:id" element={<GroupDetail />} />
      </Route>

      {/* Redirigir rutas desconocidas a la landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
