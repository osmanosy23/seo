import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from "./pages/Signup"
import { AuthProvider } from './context/auth';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';


function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={
          <PrivateRoute><Home /> </PrivateRoute>
        } />
        <Route
          path='/signup'
          element={
            <PublicRoute> <Signup /></PublicRoute>
          }
        />
      </Routes>
    </AuthProvider>

  )
}

export default App












// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Signup from "./pages/Signup"
// // import PublicRoute from './routes/PublicRoute';
// // import PrivateRoute from './routes/PrivateRoute';
// import { AuthProvider } from './context/auth'; // Import the AuthProvider

// function App() {

//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path='/' element={
//           <PrivateRoute> <Home /> </PrivateRoute>
//         } />
//         <Route
//           path='/signup'
//           element={
//             <PublicRoute>
//               <Signup />
//             </PublicRoute>
//           }
//         />
//       </Routes>
//     </AuthProvider>

//   )
// }

// export default App
