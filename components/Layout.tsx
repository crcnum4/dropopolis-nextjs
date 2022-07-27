import {FC, ReactNode, Fragment} from 'react'
import Navbar from "./Navigation/Navbar";

const Layout: FC<{children: ReactNode}> = ({children}) => {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  )
}

export default Layout;