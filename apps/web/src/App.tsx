import { useEffect } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { CurrencyContextProvider, useCurrency } from '@/lib/currencyContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

import { HomePage } from '@/pages/HomePage';
import { MarketplacePage } from '@/pages/MarketplacePage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { SellersPage } from '@/pages/SellersPage';
import { AgentsPage } from '@/pages/AgentsPage';
import { CreatorsPage } from '@/pages/CreatorsPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { OwnerDashboardPage } from '@/pages/OwnerDashboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AppwriteDiagnosticPage } from '@/pages/__diagnostics/AppwriteDiagnosticPage';
import { VerifyEmailPage } from '@/pages/VerifyEmailPage';
import { OtpVerifyPage } from '@/pages/OtpVerifyPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function App() {
  return (
    <CurrencyContextProvider>
      <AuthProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="marketplace/products/:id" element={<ProductDetailPage />} />
            <Route path="sellers" element={<SellersPage />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="creators" element={<CreatorsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
            <Route path="verify-email/otp" element={<OtpVerifyPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route
              path="owner-dashboard"
              element={
                <ProtectedRoute>
                  <OwnerDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="logout" element={<LogoutRoute />} />
            {import.meta.env.DEV && (
              <Route path="__diagnostics/appwrite" element={<AppwriteDiagnosticPage />} />
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </CurrencyContextProvider>
  );
}

function RootLayout() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="min-h-screen bg-bg">
      <Header currency={currency} onCurrencyChange={setCurrency} />
      <main className="pt-4">{<Outlet />}</main>
      <Footer />
    </div>
  );
}

function LogoutRoute() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout().then(() => {
      navigate('/');
    });
  }, [logout, navigate]);

  return null;
}
