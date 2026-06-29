import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewSlimes from './pages/ViewSlimes'
import EditSlime from './pages/EditSlime'
import CreateSlime from './pages/CreateSlime'
import SlimeDetails from './pages/SlimeDetails'
import './App.css'

const App = () => {
  const shopName = 'LoveSlime'
  let element = useRoutes([
    {
      path: '/create',
      element: <CreateSlime title={`${shopName} | Create slime`} />
    },
    {
      path:'/slimes',
      element: <ViewSlimes title={`${shopName} | Custom Slimes`} />
    },
    {
      path: '/slimes/:id',
      element: <SlimeDetails title={`${shopName} | View`} />
    },
    {
      path: '/edit/:id',
      element: <EditSlime title={`${shopName} | Edit`} />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App