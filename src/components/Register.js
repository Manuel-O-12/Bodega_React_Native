import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Register({ onNavigate, onRegisterSuccess }) {
  // Captura de datos mediante estados (useState)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistrar = () => {
    setError('');

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newUser = {
        name: name.trim(),
        email: email.trim(),
        password: password,
      };

      onRegisterSuccess(newUser);
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          {/* Encabezado con Icono y Títulos estilo BodegaApp */}
          <View style={styles.header}>
            <MaterialIcons name="store" size={80} color="#2979ff" />
            <Text style={styles.appTitle}>BodegaApp</Text>
            <Text style={styles.appSubtitle}>Crear Cuenta de Usuario</Text>
          </View>

          {/* Mensaje de error si la validación falla */}
          {Boolean(error) && (
            <View style={[styles.alertBox, styles.alertError]}>
              <MaterialIcons name="error-outline" size={18} color="#c62828" />
              <Text style={styles.alertErrorText}>{error}</Text>
            </View>
          )}

          {/* CustomTextField: Nombre completo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Juan Pérez"
              placeholderTextColor="#9e9e9e"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* CustomTextField: Correo electrónico */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.textInput}
              placeholder="ejemplo@bodega.com"
              placeholderTextColor="#9e9e9e"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* CustomTextField: Contraseña */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="••••••••"
                placeholderTextColor="#9e9e9e"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={22}
                  color="#757575"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* CustomTextField: Confirmar contraseña */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar contraseña</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="••••••••"
                placeholderTextColor="#9e9e9e"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                <MaterialIcons
                  name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                  size={22}
                  color="#757575"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón ElevatedButton: Registrarse */}
          <TouchableOpacity
            style={[styles.btnElevated, isLoading && styles.btnDisabled]}
            onPress={handleRegistrar}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.btnText}>Registrarse</Text>
            )}
          </TouchableOpacity>

          {/* Enlace para volver a Iniciar Sesión */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => onNavigate('login')}>
              <Text style={styles.switchLink}> Inicia sesión aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 36,
  },
  formContainer: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2979ff',
    marginTop: 12,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 6,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 18,
    gap: 8,
  },
  alertError: {
    backgroundColor: '#ffebee',
    borderColor: '#ffcdd2',
    borderWidth: 1,
  },
  alertErrorText: {
    color: '#c62828',
    fontSize: 13,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 6,
  },
  textInput: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#2979ff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#212121',
    backgroundColor: '#ffffff',
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
    padding: 6,
  },
  btnElevated: {
    height: 50,
    backgroundColor: '#2979ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    shadowColor: '#2979ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: {
    backgroundColor: '#90caf9',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  switchText: {
    fontSize: 14,
    color: '#757575',
  },
  switchLink: {
    fontSize: 14,
    color: '#2979ff',
    fontWeight: 'bold',
  },
});
