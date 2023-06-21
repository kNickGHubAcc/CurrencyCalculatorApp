import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import NewPair from './components/create_pair/NewPair'
import UpdatePair from './components/update_pair/UpdatePair'
import ReadPairs from './components/read_pairs/ReadPairs'
import DeletePair from './components/delete_pair/DeletePair'
import RequireAuth from './components/require/RequireAuth'
import PersistLogin from './components/login/PersistLogin'


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/signup" element={<SignUp />} />
          <Route element={<PersistLogin />}>
            <Route exact path="/" element={<Home />}/>
            <Route element={<RequireAuth />}>
              <Route exact path="/create" element={<NewPair />} />
              <Route exact path="/read" element={<ReadPairs />} />
              <Route exact path="/update" element={<UpdatePair />} />
              <Route exact path="/delete" element={<DeletePair />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App