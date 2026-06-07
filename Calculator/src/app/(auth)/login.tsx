import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { enviarRegistroBD } from '@/services/authServices';

const Registro: React.FC = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState<string>('');
  const [usuario, setUsuario] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(false);

  const handleRegistro = async () => {
    if (!nombre || !usuario || !correo || !contrasena) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    setCargando(true);

    const datos = {
      username: usuario,
      full_name: nombre,
      email: correo,
      password_hash: contrasena, 
    };

    const resultado = await enviarRegistroBD(datos);
    setCargando(false);

    if (resultado.exito) {
      Alert.alert('¡Éxito!', resultado.mensaje, [
        { text: 'Ir al Login', onPress: () => router.replace('/login') }
      ]);
    } else {
      Alert.alert('Error al registrar', resultado.mensaje);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Únete a ProFinder y encuentra expertos</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>NOMBRE COMPLETO</Text>
          <TextInput
            style={styles.input}
            placeholder="Juan Pérez"
            placeholderTextColor="#A0A0A0"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>NOMBRE DE USUARIO</Text>
          <TextInput
            style={styles.input}
            placeholder="juanperez123"
            placeholderTextColor="#A0A0A0"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#A0A0A0"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>CONTRASEÑA</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••••"
            placeholderTextColor="#A0A0A0"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, cargando && { opacity: 0.7 }]} 
          onPress={handleRegistro}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>¡REGISTRARME!</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5A3FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 400,
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B0764',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#701A75',
    marginBottom: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6B21A8',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#F3E8FF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000000',
  },
  button: {
    width: '100%',
    backgroundColor: '#A855F7',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#7E22CE',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default Registro;