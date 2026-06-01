import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Platform 
} from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      
      {/* NAVBAR SUPERIOR */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>ProFinder</Text>
        
        <View style={styles.searchBarContainer}>
          <TextInput 
            style={styles.navInput} 
            placeholder="Busca un Profesional" 
            placeholderTextColor="#c084fc" 
          />
          <View style={styles.navInputDivider} />
          <TextInput 
            style={styles.navInput} 
            placeholder="Busca una Categoría" 
            placeholderTextColor="#c084fc" 
          />
        </View>
      </View>

      {/* BOTONES DE FILTRO DEBAJO DEL NAVBAR */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Profesionistas sugeridos</Text>
        </TouchableOpacity>
      </View>

      {/* SECCIÓN: CÓMO FUNCIONA */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>¡Como Funciona!</Text>
        <Text style={styles.sectionSubtitle}>Empieza con 3 sencillos pasos!</Text>

        <View style={styles.cardsRow}>
          {/* PRIMERA TARJETA UNIFICADA */}
          <View style={styles.stepCard}>
            <View style={styles.stepCardTopBar} />
            <Text style={styles.stepCardText}>
              Busca a un profesional y su categoría basada en tu necesidad.
            </Text>
          </View>

          {/* SEGUNDA TARJETA */}
          <View style={styles.stepCard}>
            <View style={styles.stepCardTopBar} />
            <Text style={styles.stepCardText}>
              Selecciona la profesión y profesionista de tu preferencia.
            </Text>
          </View>

          {/* TERCERA TARJETA */}
          <View style={styles.stepCard}>
            <View style={styles.stepCardTopBar} />
            <Text style={styles.stepCardText}>
              Agenda una cita con el profesional que elegiste.
            </Text>
          </View>
        </View>
      </View>

      {/* SECCIÓN: PROFESIONISTAS POPULARES */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Profesionistas Populares</Text>

        <View style={styles.cardsRow}>
          {/* Tarjeta Profesional 1 */}
          <View style={styles.proCard}>
            <Text style={styles.proTitle}>Ingeniero</Text>
          </View>

          {/* Tarjeta Profesional 2 */}
          <View style={styles.proCard}>
            <Text style={styles.proCategoryTag}>ABOGADA</Text>
            <Text style={styles.proName}>Lic. Laura Mendias</Text>
          </View>

          {/* Tarjeta Profesional 3 */}
          <View style={styles.proCard}>
            <Text style={styles.proCategoryTag}>CONTADOR</Text>
            <Text style={styles.proName}>Lic. Eduardo Lozano</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // NAVBAR
  navbar: {
    backgroundColor: '#c084fc',
    paddingHorizontal: 30,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#3b0764',
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3e8ff',
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: Platform.OS === 'web' ? 450 : '65%',
  },
  navInput: {
    flex: 1,
    height: 38,
    fontSize: 13,
    color: '#3b0764',
    paddingHorizontal: 10,
  },
  navInputDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#e9d5ff',
  },
  // FILTROS UNIFICADOS
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 25,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#c084fc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#c084fc',
  },
  // SECCIONES COMUNES
  sectionContainer: {
    paddingHorizontal: 30,
    marginTop: 35,
  },
  sectionHeader: {
    fontSize: 28,
    fontWeight: '900',
    color: '#3b0764',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c084fc',
    marginTop: 2,
    marginBottom: 5,
  },
  // CONTENEDOR DE FILAS DE TARJETAS
  cardsRow: {
    flexDirection: Platform.OS === 'web' ? 'row' as any : 'column',
    gap: 20,
    marginTop: 20,
    width: '100%',
  },
  // TARJETAS DE PASOS UNIFICADAS (CÓMO FUNCIONA)
  stepCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    shadowColor: '#c084fc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  stepCardTopBar: {
    backgroundColor: '#f3e8ff',
    height: 35,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  stepCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5b21b6',
    lineHeight: 20,
  },
  // TARJETAS DE PROFESIONISTAS POPULARES
  proCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 24,
    minHeight: 110,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f3e8ff',
    shadowColor: '#c084fc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  proTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#3b0764',
  },
  proCategoryTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#c084fc',
    marginBottom: 4,
  },
  proName: {
    fontSize: 16,
    fontWeight: '700', // Corregido de '850' a un valor estándar admitido por TypeScript
    color: '#3b0764',
  },
});