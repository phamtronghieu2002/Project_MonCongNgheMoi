import configs from "../configs"
import { Messenger,Login,Phonebook } from "../pages"
const PublicRoutes=[
  {
    path:configs.paths.login,
    element:<Login/>
  }
]

const PrivateRoutes=[

  {
    path:configs.paths.phonebook,
    element:<Phonebook/>
  },
  {
    path:configs.paths.messenger,
    element:<Messenger/>
  },
]


export {PublicRoutes,PrivateRoutes}