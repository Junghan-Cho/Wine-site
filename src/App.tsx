import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import VarietalList from './pages/VarietalList'
import VarietalDetail from './pages/VarietalDetail'
import Recommend from './pages/Recommend'
import RecommendResult from './pages/RecommendResult'
import RecommendBlend from './pages/RecommendBlend'
import Map from './pages/Map'
import WineryDetail from './pages/WineryDetail'
import WineDetail from './pages/WineDetail'
import Glossary from './pages/Glossary'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Nav />
      <main
        style={{
          padding: 'var(--main-padding)',
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/varietals" element={<VarietalList />} />
          <Route path="/varietals/:slug" element={<VarietalDetail />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/recommend/blend" element={<RecommendBlend />} />
          <Route path="/recommend/:type/:slug" element={<RecommendResult />} />
          <Route path="/map" element={<Map />} />
          <Route path="/wineries/:slug" element={<WineryDetail />} />
          <Route path="/wines/:slug" element={<WineDetail />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
