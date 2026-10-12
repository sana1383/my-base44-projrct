import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Properties from './pages/Properties.jsx'
import PropertyDetail from './pages/PropertyDetail.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:slug" element={<PropertyDetail />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
