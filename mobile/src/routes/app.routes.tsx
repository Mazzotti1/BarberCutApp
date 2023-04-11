import { createNativeStackNavigator } from '@react-navigation/native-stack';


const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { Schedule } from '../screens/Schedule';
import { Services } from '../screens/Services';
import { Barbers } from '../screens/Barbers';
import { MySchedule } from '../screens/MySchedule';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';
import { MyData } from '../screens/MyData';
import { Address } from '../screens/Address';
import Availability from '../screens/Availability';
import { Faq } from '../screens/Faq';
import { ForgotPassword } from '../screens/ForgotPassword';
import { VerifyCode } from '../screens/VerifyCode';
import { ResetPassword } from '../screens/ResetPassword';
import { Admin } from '../screens/Admin';
import { Usuarios } from '../screens/Usuarios';
import { AdminBarbers } from '../screens/AdminBarbers';
import { AdminUsers } from '../screens/AdminUsers';



export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>

      <Screen

        name="home"
        component={Home}
      />

      <Screen
        name="schedule"
        component={Schedule}
      />

      <Screen
        name="services"
        component={Services}
      />

      <Screen
        name="barbers"
        component={Barbers}
      />

      <Screen
        name="myschedule"
        component={MySchedule}
      />

      <Screen
        name="register"
        component={Register}
      />

      <Screen
        name="login"
        component={Login}
      />
         <Screen
        name="mydata"
        component={MyData}
      />

      <Screen
        name="address"
        component={Address}
      />
       <Screen
        name="availability"
        component={Availability}
      />
        <Screen
        name="faq"
        component={Faq}
      />

        <Screen
        name="forgotpassword"
        component={ForgotPassword}
      />
        <Screen
        name="verifycode"
        component={VerifyCode}
      />
       <Screen
        name="resetpassword"
        component={ResetPassword}
      />
         <Screen
        name="admin"
        component={Admin}
      />
           <Screen
        name="usuarios"
        component={Usuarios}
      />
           <Screen
        name="adminbarbers"
        component={AdminBarbers}
      />
              <Screen
        name="adminusers"
        component={AdminUsers}
      />

    </Navigator>
  )
}