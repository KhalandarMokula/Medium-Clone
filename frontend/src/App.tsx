import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { WriteBlog } from './pages/WriteBlog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div> Khalandar</div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path ="/blog/createblog" element = {<WriteBlog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
