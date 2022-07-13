import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component.jsx'
import Navigation from './routes/navigation/navigation.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx'


const Shop = () => {
  return (
    <h1>The shop page</h1>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App;
