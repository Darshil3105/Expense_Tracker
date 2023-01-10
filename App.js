import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { GlobalStyles } from './constants/styles';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import Icon from 'react-native-vector-icons/Ionicons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return(
    <BottomTabs.Navigator screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => { navigation.navigate('ManageExpense') }} />,
    })}>
      <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({ color, size }) => {
          return <Icon name='hourglass' size={size} color={color} />
        },
      }} />
      <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={{
        title: "All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({ color, size }) => {
          return <Icon name='calendar' size={size} color={color} />
        },
      }} />
    </BottomTabs.Navigator>
  );
}

function App(){
  return(
    <>
      <StatusBar backgroundColor={GlobalStyles.colors.primary500} />
        <ExpensesContextProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}>
              <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{ headerShown: false }} />
              <Stack.Screen name='ManageExpense' component={ManageExpense} options={{
                presentation: 'modal',
              }} />
            </Stack.Navigator>
          </NavigationContainer>
        </ExpensesContextProvider>
    </>
  );
};

export default App;