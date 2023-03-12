import { createNativeStackNavigator } from '@react-navigation/native-stack';


const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { Schedule } from '../screens/Schedule';
import { Services } from '../screens/Services';
import { Barbers } from '../screens/Barbers';
import { MySchedule } from '../screens/MySchedule';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';

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




    </Navigator>
  )
}