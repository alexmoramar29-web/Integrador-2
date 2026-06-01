import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      
      {/* SECCIÓN PRINCIPAL: GRADIENTE MORADO BAJITO */}
      <LinearGradient colors={['#f3e8ff', '#e9d5ff', '#c084fc']} style={styles.heroSection}>
        <View 
          style={styles.centerBox}
          // @ts-ignore
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Contenedor del Título Gigante */}
          <View style={[
            styles.titleContainer, 
            isHovered && styles.titleMovedUp
          ]}>
            <Text style={styles.mainTitle}>
              <Text style={styles.goldLetter}>P</Text>ro<Text style={styles.goldLetter}>F</Text>inder
            </Text>
          </View>

          {/* Botón Comenzar que se revela abajo */}
          <View style={[
            styles.buttonWrapper, 
            isHovered && styles.buttonVisible
          ]}>
            <TouchableOpacity 
              style={styles.btnComenzar} 
              onPress={() => router.push('/login-page')}
            >
              <Text style={styles.btnText}>COMENZAR</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.scrollIndicator}>Desliza hacia abajo para ver más ▼</Text>
        </View>
      </LinearGradient>

      {/* SECCIÓN DE INFORMACIÓN SIN CUADROS (CON LÍNEA DIVISORIA) */}
      <View style={styles.infoSection}>
        <View style={styles.columnsContainer}>
          
          {/* COLUMNA IZQUIERDA: SOBRE NOSOTROS Y COSAS IMPORTANTES */}
          <View style={styles.columnLeft}>
            <Text style={styles.sectionTitle}>Sobre Nosotros</Text>
            <Text style={styles.sectionText}>
              ProFinder es la plataforma definitiva diseñada para conectar a especialistas certificados 
              con personas que necesitan soluciones rápidas y de confianza. Nos aseguramos de que encuentres 
              exactamente al experto que necesitas sin rodeos.
            </Text>

            <View style={styles.spaceDivider} />

            <Text style={styles.sectionTitle}>Cosas Importantes</Text>
            <Text style={styles.bulletText}>
              • Verificación estricta de Cédulas Profesionales para tu total seguridad.
            </Text>
            <Text style={styles.bulletText}>
              • Trato directo con el profesionista, sin comisiones ocultas ni intermediarios.
            </Text>
            <Text style={styles.bulletText}>
              • Reseñas y calificaciones reales de clientes para tomar la mejor decisión.
            </Text>
          </View>

          {/* LÍNEA DIVISORIA EN EL MEDIO */}
          {Platform.OS === 'web' && <View style={styles.verticalLine} />}

          {/* COLUMNA DERECHA: INFO DE CONTACTO (MÁS JUNTITA) */}
          <View style={styles.columnRight}>
            <Text style={styles.sectionTitle}>Información de Contacto</Text>
            <Text style={styles.sectionText}>
              ¿Tienes dudas, comentarios o necesitas asistencia técnica? Nuestro equipo está disponible para atenderte.
            </Text>
            
            <View style={styles.contactContainer}>
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>Correo:</Text>
                <Text style={styles.contactValue}>soporte@profinder.com</Text>
              </View>
              
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>Teléfono:</Text>
                <Text style={styles.contactValue}>+52 (614) 123-4567</Text>
              </View>
              
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>Ubicación:</Text>
                <Text style={styles.contactValue}>Chihuahua, Chih., México</Text>
              </View>
            </View>
          </View>

        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 ProFinder. Todos los derechos reservados.</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heroSection: {
    height: Platform.OS === 'web' ? '100vh' as any : 750,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 300, 
    width: '100%',
  },
  titleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      },
    }),
  },
  titleMovedUp: {
    ...Platform.select({
      web: {
        transform: 'translateY(-65px)',
      },
    }),
  },
  mainTitle: {
    fontSize: 100,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -2,
    textShadowColor: 'rgba(59, 7, 100, 0.15)',
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 15,
  },
  goldLetter: {
    color: '#d4af37',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    opacity: Platform.OS === 'web' ? 0 : 1,
    ...Platform.select({
      web: {
        transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
        transform: 'translateY(20px)',
      },
    }),
  },
  buttonVisible: {
    opacity: 1,
    ...Platform.select({
      web: {
        transform: 'translateY(0px)',
      },
    }),
  },
  btnComenzar: {
    backgroundColor: '#3b0764',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 55,
    shadowColor: '#3b0764',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: -80,
    color: '#5b21b6',
    fontSize: 13,
    fontWeight: '700',
    opacity: 0.35,
  },
  infoSection: {
    paddingHorizontal: 40,
    paddingVertical: 80,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  columnsContainer: {
    width: '100%',
    maxWidth: 1050,
    flexDirection: Platform.OS === 'web' ? 'row' as any : 'column',
    gap: 40,
    alignItems: 'stretch',
  },
  columnLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  columnRight: {
    flex: 1,
    justifyContent: 'center',
  },
  verticalLine: {
    width: 1.5,
    backgroundColor: '#e9d5ff',
    marginHorizontal: 20,
  },
  spaceDivider: {
    height: 30,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#3b0764',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: '#5b21b6',
    lineHeight: 24,
  },
  bulletText: {
    fontSize: 15,
    color: '#5b21b6',
    lineHeight: 22,
    marginBottom: 8,
  },
  contactContainer: {
    marginTop: 20,
    gap: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#c084fc',
    marginRight: 8,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3b0764',
  },
  footer: {
    paddingVertical: 25,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#f3e8ff',
    backgroundColor: '#faf5ff',
  },
  footerText: {
    fontSize: 13,
    color: '#a78bfa',
    fontWeight: '600',
  },
});