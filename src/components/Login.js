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

export default function Login({ onNavigate, onLoginSuccess, message }) {
  // Captura de datos mediante estados (useState)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleIngresar = () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Validación básica o acceso con cuenta demo
      if (email.toLowerCase().trim() === 'demo@ejemplo.com' && password === '123456') {
        onLoginSuccess({
          name: 'Usuario Demo',
          email: 'demo@ejemplo.com',
        });
      } else {
        // Permitir inicio de sesión con el email ingresado
        onLoginSuccess({
          name: email.split('@')[0],
          email: email.trim(),
        });
      }
    }, 500);
  };

  const handleUseDemo = () => {
    setEmail('demo@ejemplo.com');
    setPassword('123456');
    setError('');
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
            <Text style={styles.appSubtitle}>Gestión de Inventario</Text>
          </View>

          {/* Mensaje de notificación o éxito */}
          {Boolean(message) && (
            <View style={[styles.alertBox, styles.alertSuccess]}>
              <MaterialIcons name="check-circle" size={18} color="#2e7d32" />
              <Text style={styles.alertSuccessText}>{message}</Text>
            </View>
          )}

          {/* Mensaje de error */}
          {Boolean(error) && (
            <View style={[styles.alertBox, styles.alertError]}>
              <MaterialIcons name="error-outline" size={18} color="#c62828" />
              <Text style={styles.alertErrorText}>{error}</Text>
            </View>
          )}

          {/* CustomTextField: Correo Electrónico */}
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

          {/* Botón ElevatedButton: Ingresar */}
          <TouchableOpacity
            style={[styles.btnElevated, isLoading && styles.btnDisabled]}
            onPress={handleIngresar}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.btnText}>Ingresar</Text>
            )}
          </TouchableOpacity>

          {/* Botón de llenado rápido de prueba demo */}
          <TouchableOpacity
            style={styles.btnDemo}
            onPress={handleUseDemo}
            activeOpacity={0.7}
          >
            <MaterialIcons name="auto-awesome" size={16} color="#2979ff" />
            <Text style={styles.btnDemoText}>Rellenar con usuario demo</Text>
          </TouchableOpacity>

          {/* Enlace para ir a Registro */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => onNavigate('register')}>
              <Text style={styles.switchLink}> Regístrate aquí</Text>
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
    marginBottom: 32,
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
  alertSuccess: {
    backgroundColor: '#e8f5e9',
    borderColor: '#c8e6c9',
    borderWidth: 1,
  },
  alertSuccessText: {
    color: '#2e7d32',
    fontSize: 13,
    flex: 1,
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
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 8,
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
    marginTop: 12,
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
  btnDemo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2979ff',
    borderRadius: 12,
    gap: 6,
  },
  btnDemoText: {
    color: '#2979ff',
    fontSize: 13,
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
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
