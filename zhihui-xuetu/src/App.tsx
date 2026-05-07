import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from 'antd';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Home from './pages/Home';
import Forum from './pages/Forum';
import Resources from './pages/Resources';
import Textbooks from './pages/Textbooks';
import Ebooks from './pages/Ebooks';
import Upload from './pages/Upload';
import Mall from './pages/Mall';

const pageMotion = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
};

function App() {
  const location = useLocation();

  return (
    <Layout className="app-shell">
      <div className="app-background" />
      <Header />
      <Layout.Content className="app-content">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} {...pageMotion}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/textbooks" element={<Textbooks />} />
              <Route path="/ebooks" element={<Ebooks />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/mall" element={<Mall />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Layout.Content>
    </Layout>
  );
}

export default App;
