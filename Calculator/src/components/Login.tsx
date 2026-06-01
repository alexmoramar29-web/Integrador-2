import React, { useState } from 'react';
import { router } from 'expo-router';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Login: React.FC = () => {
  const [tipoUsuario, setTipoUsuario] = useState<'cliente' | 'profesionista'>('cliente');
  const [usuario, setUsuario] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');

  // Estados exclusivo para profesionistas
  const [cedula, setCedula] = useState<string>('');
  const [tarifa, setTarifa] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [carrera, setCarrera] = useState<string>('');
  const [mostrarDropdown, setMostrarDropdown] = useState<boolean>(false);

  const opcionesCarrera = ['Abogado', 'Doctor', 'Ingeniero en Sistemas', 'Dentista', 'Arquitecto'];

  const handleSubmit = () => {
    if (!usuario || !correo || !contrasena) {
      mostrarAlerta('Error', 'Por favor llena los campos básicos');
      return;
    }
    if (tipoUsuario === 'profesionista' && (!carrera || !cedula || !tarifa || !descripcion)) {
      mostrarAlerta('Error', 'Por favor completa los datos profesionales');
      return;
    }
    
    // Redirección al Home al presionar el botón principal
    router.replace('/home');
  };

  const mostrarAlerta = (titulo: string, mensaje: string) => {
    if (Platform.OS === 'web') alert(`${titulo}: ${mensaje}`);
    else Alert.alert(titulo, mensaje);
  };

  return (
    <LinearGradient colors={['#f3e8ff', '#e9d5ff', '#c084fc']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* ENCABEZADO */}
        <View style={styles.headerContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>gg papa ff</Text>
          </View>
          <Text style={styles.title}>Profinder</Text>
          <Text style={styles.subtitle}>Encuentra especialistas de confianza</Text>
        </View>

        {/* TARJETA DE FORMULARIO */}
        <View style={styles.card}>
          
          {/* INTERFAZ DE PESTAÑAS (TABS) */}
          <View style={styles.tabBar}>
            <TouchableOpacity 
              style={[styles.tab, tipoUsuario === 'cliente' && styles.tabActive]}
              onPress={() => setTipoUsuario('cliente')}
            >
              <Text style={[styles.tabText, tipoUsuario === 'cliente' && styles.tabTextActive]}>Cliente</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tab, tipoUsuario === 'profesionista' && styles.tabActive]}
              onPress={() => setTipoUsuario('profesionista')}
            >
              <Text style={[styles.tabText, tipoUsuario === 'profesionista' && styles.tabTextActive]}>Profesionista</Text>
            </TouchableOpacity>
          </View>

          {/* CAMPOS BÁSICOS COMUNES */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de Usuario</Text>
            <TextInput style={styles.input} placeholder="Nombre de usuario" placeholderTextColor="#a78bfa" value={usuario} onChangeText={setUsuario} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput style={styles.input} placeholder="correo@ejemplo.com" placeholderTextColor="#a78bfa" value={correo} onChangeText={setCorreo} autoCapitalize="none" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput style={styles.input} placeholder="••••••••••••" placeholderTextColor="#a78bfa" secureTextEntry={true} value={contrasena} onChangeText={setContrasena} />
          </View>

          {/* FORMULARIO ADICIONAL EXCLUSIVO PARA PROFESIONISTAS */}
          {tipoUsuario === 'profesionista' && (
            <View>
              {/* Dropdown Desplegable */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Carrera / Servicio</Text>
                <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setMostrarDropdown(!mostrarDropdown)}>
                  <Text style={[styles.dropdownTriggerText, !carrera && {color: '#a78bfa'}]}>
                    {carrera || 'Selecciona tu profesión'}
                  </Text>
                  <Text style={{color: '#6b21a8', fontSize: 10}}>▼</Text>
                </TouchableOpacity>

                {mostrarDropdown && (
                  <View style={styles.dropdownContainer}>
                    {opcionesCarrera.map((opc, idx) => (
                      <TouchableOpacity key={idx} style={styles.dropdownItem} onPress={() => { setCarrera(opc); setMostrarDropdown(false); }}>
                        <Text style={styles.dropdownItemText}>{opc}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Número de Cédula Profesional</Text>
                <TextInput style={styles.input} placeholder="Ej. 12345678" placeholderTextColor="#a78bfa" value={cedula} onChangeText={setCedula} keyboardType="numeric" />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Costo por Consulta / Hora ($)</Text>
                <TextInput style={styles.input} placeholder="Ej. 500" placeholderTextColor="#a78bfa" value={tarifa} onChangeText={setTarifa} keyboardType="numeric" />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Resumen de tu Experiencia</Text>
                <TextInput style={[styles.input, styles.textArea]} placeholder="Breve biografía para tus clientes..." placeholderTextColor="#a78bfa" multiline={true} numberOfLines={3} value={descripcion} onChangeText={setDescripcion} />
              </View>

              {/* Selector de Archivos Multimedia */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Documentos y Títulos (Imágenes)</Text>
                <TouchableOpacity style={styles.imageBox} onPress={() => mostrarAlerta('Galería', 'Se abrirá el selector de archivos.')}>
                  <View style={styles.miniPlus}><Text style={{color:'#6b21a8', fontWeight:'bold', fontSize: 16}}>+</Text></View>
                  <Text style={{fontSize: 12, color: '#6b21a8', fontWeight: '600'}}>Subir título o identificación</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* BOTÓN PRINCIPAL */}
          <TouchableOpacity style={styles.buttonMain} onPress={handleSubmit}>
            <Text style={styles.buttonMainText}>¡COMENZAR!</Text>
          </TouchableOpacity>

          {/* SEPARADOR OAUTH */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>O ENTRAR CON</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* REDES SOCIALES */}
          <View style={styles.oauthContainer}>
            <TouchableOpacity style={styles.buttonOauth}><Text style={styles.buttonOauthText}>Google</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonOauth}><Text style={styles.buttonOauthText}>Outlook</Text></TouchableOpacity>
          </View>

        </View>
        <Text style={styles.footerText}>profinder.com</Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  scrollContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 40, 
    paddingHorizontal: 20, 
    minHeight: Platform.OS === 'web' ? '100vh' as any : undefined 
  },
  headerContainer: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  logoCircle: { 
    width: 85, 
    height: 85, 
    backgroundColor: '#a855f7', 
    borderRadius: 42.5, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 10 
  },
  logoText: { 
    color: '#fff', 
    fontSize: 26, 
    fontWeight: '900', 
    textAlign: 'center' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: '#3b0764' 
  },
  subtitle: { 
    fontSize: 13, 
    color: '#6b21a8', 
    fontWeight: '500', 
    marginTop: 2 
  },
  card: { 
    backgroundColor: '#ffffff', 
    width: '100%', 
    maxWidth: 380, 
    borderRadius: 40, 
    padding: 26, 
    shadowColor: '#7c3aed', 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 20 
  },
  tabBar: { 
    flexDirection: 'row', 
    backgroundColor: '#f3e8ff', 
    borderRadius: 20, 
    padding: 4, 
    marginBottom: 15 
  },
  tab: { 
    flex: 1, 
    paddingVertical: 10, 
    alignItems: 'center', 
    borderRadius: 16 
  },
  tabActive: { 
    backgroundColor: '#ffffff' 
  },
  tabText: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#a78bfa' 
  },
  tabTextActive: { 
    color: '#6b21a8' 
  },
  inputGroup: { 
    marginBottom: 14 
  },
  label: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: '#5b21b6', 
    marginBottom: 5, 
    textTransform: 'uppercase', 
    marginLeft: 10 
  },
  input: { 
    backgroundColor: '#f3e8ff', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    paddingVertical: 11, 
    fontSize: 14, 
    color: '#5b21b6' 
  },
  textArea: { 
    borderRadius: 15, 
    height: 65, 
    textAlignVertical: 'top', 
    paddingTop: 10 
  },
  dropdownTrigger: { 
    backgroundColor: '#f3e8ff', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  dropdownTriggerText: { 
    fontSize: 14, 
    color: '#5b21b6' 
  },
  dropdownContainer: { 
    backgroundColor: '#ffffff', 
    borderWidth: 1, 
    borderColor: '#e9d5ff', 
    borderRadius: 15, 
    marginTop: 5, 
    overflow: 'hidden' 
  },
  dropdownItem: { 
    paddingVertical: 10, 
    paddingHorizontal: 18, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f3e8ff' 
  },
  dropdownItemText: { 
    fontSize: 14, 
    color: '#5b21b6' 
  },
  imageBox: { 
    borderWidth: 1, 
    borderColor: '#c084fc', 
    borderStyle: 'dashed', 
    borderRadius: 20, 
    padding: 12, 
    backgroundColor: '#faf5ff', 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  miniPlus: { 
    width: 40, 
    height: 40, 
    backgroundColor: '#e9d5ff', 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  buttonMain: { 
    backgroundColor: '#c084fc', 
    borderRadius: 25, 
    paddingVertical: 13, 
    alignItems: 'center', 
    marginTop: 12 
  },
  buttonMainText: { 
    color: '#ffffff', 
    fontWeight: '800', 
    fontSize: 14 
  },
  separatorContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 16 
  },
  separatorLine: { 
    flex: 1, 
    height: 1, 
    backgroundColor: '#e9d5ff' 
  },
  separatorText: { 
    fontSize: 10, 
    color: '#a78bfa', 
    fontWeight: '700', 
    marginHorizontal: 10 
  },
  oauthContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  buttonOauth: { 
    flex: 0.47, 
    borderWidth: 1, 
    borderColor: '#e9d5ff', 
    borderRadius: 25, 
    paddingVertical: 10, 
    alignItems: 'center', 
    backgroundColor: '#faf5ff' 
  },
  buttonOauthText: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#6b21a8' 
  },
  footerText: { 
    fontSize: 12, 
    color: '#5b21b6', 
    fontWeight: '700', 
    marginTop: 20, 
    opacity: 0.3, 
    textAlign: 'center' 
  }
});

export default Login;