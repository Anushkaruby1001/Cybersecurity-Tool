import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Home from './components/Home';
import FirstTool from './components/FirstTool';
import MalwareTool from './components/MalwareTool';
import EmailTool from './pages/EmailTool';
import WebsiteSafetyChecker from './components/WebsiteSafetyChecker';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tool-1" element={<FirstTool />} />
        <Route path="/malware-tool" element={<MalwareTool />} />
        <Route path="/email-analyzer" element={<EmailTool />} />
        <Route path="/website-safety" element={<WebsiteSafetyChecker />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
