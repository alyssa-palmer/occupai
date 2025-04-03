import theme from '@/theming/Theme';
import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <PaperProvider theme={theme}>
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: theme.colors.primary }}>
      <Tabs.Screen
        name="home"
        options={{ 
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{ 
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="settings-outline" color={color} /> 
        }}
        
      />
    </Tabs>
    </PaperProvider>
    
  );
}