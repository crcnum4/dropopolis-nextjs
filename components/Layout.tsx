import {FC, ReactNode, Fragment} from 'react'
import Footer from './Home/Footer/Footer';
import Navbar from "./Navigation/Navbar";

const Layout: FC<{children: ReactNode}> = ({children}) => {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  )
}

export default Layout;