import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Bienvenida from './src/components/Bienvenida';

export default function App() {
  // Manejo del estado global de navegación y usuario autenticado
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'register' | 'bienvenida'
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState('');

  // Acción al iniciar sesión correctamente
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setCurrentScreen('bienvenida');
    setNotification('');
  };

  // Acción al registrar un usuario exitosamente
  const handleRegisterSuccess = (newUserData) => {
    setNotification('¡Registro exitoso! Ya puedes iniciar sesión con tu cuenta.');
    setCurrentScreen('login');
  };

  // Acción al cerrar sesión
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setNotification('Has cerrado sesión exitosamente.');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {currentScreen === 'bienvenida' && currentUser ? (
        <Bienvenida user={currentUser} onLogout={handleLogout} />
      ) : currentScreen === 'register' ? (
        <Register
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            setNotification('');
          }}
          onRegisterSuccess={handleRegisterSuccess}
        />
      ) : (
        <Login
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            setNotification('');
          }}
          onLoginSuccess={handleLoginSuccess}
          message={notification}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
