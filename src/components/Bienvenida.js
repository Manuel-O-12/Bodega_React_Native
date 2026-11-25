import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const INITIAL_PRODUCTS = [
  { id: '1', nombre: 'Arroz Extra 1kg', precio: 24.50, stock: 45, categoria: 'Granos' },
  { id: '2', nombre: 'Aceite Vegetal 900ml', precio: 38.00, stock: 20, categoria: 'Abarrotes' },
  { id: '3', nombre: 'Leche Entera 1L', precio: 26.00, stock: 32, categoria: 'Lácteos' },
];

export default function Bienvenida({ user, onLogout }) {
  // Captura de datos de productos mediante estados (useState)
  const [productos, setProductos] = useState(INITIAL_PRODUCTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [salesModalVisible, setSalesModalVisible] = useState(false);

  // Estados del formulario para nuevo producto
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  const displayName = user?.name || 'Usuario';

  const handleAddProduct = () => {
    if (!nombre.trim() || !precio.trim() || !stock.trim()) {
      Alert.alert('Campos requeridos', 'Por favor llena todos los datos del producto.');
      return;
    }

    const nuevo = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      precio: parseFloat(precio) || 0,
      stock: parseInt(stock, 10) || 0,
      categoria: 'Abarrotes',
    };

    setProductos([nuevo, ...productos]);
    setNombre('');
    setPrecio('');
    setStock('');
    setModalVisible(false);
  };

  const handleDeleteProduct = (id) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que deseas eliminar este producto del inventario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setProductos(productos.filter((p) => p.id !== id));
          },
        },
      ]
    );
  };

  const renderProductoCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.iconBox}>
          <MaterialIcons name="inventory" size={24} color="#2979ff" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.nombre}</Text>
          <View style={styles.cardMeta}>
            <Text style={styles.cardPrice}>${item.precio.toFixed(2)}</Text>
            <Text style={styles.cardStock}>Stock: {item.stock}</Text>
            <Text style={styles.cardCategory}>{item.categoria}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => handleDeleteProduct(item.id)}
        style={styles.btnDelete}
        activeOpacity={0.7}
      >
        <MaterialIcons name="delete-outline" size={22} color="#e53935" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2979ff" />

      {/* AppBar estilo Material / Flutter */}
      <View style={styles.appBar}>
        <View style={styles.appBarTitleContainer}>
          <Text style={styles.appBarTitle}>Inventario</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>BodegaApp</Text>
          </View>
        </View>

        <View style={styles.appBarActions}>
          {/* Carrito de ventas */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setSalesModalVisible(true)}
            activeOpacity={0.7}
          >
            <MaterialIcons name="shopping-cart" size={24} color="#ffffff" />
            {productos.length > 0 && (
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>{productos.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Cerrar Sesión */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onLogout}
            activeOpacity={0.7}
          >
            <MaterialIcons name="logout" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Saludo de Bienvenida */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeGreeting}>¡Hola, {displayName}! 👋</Text>
        <Text style={styles.welcomeSubtitle}>
          Panel de gestión activo con {productos.length} productos registrados.
        </Text>
      </View>

      {/* Lista de Productos */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderProductoCard}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="inventory-2" size={64} color="#b0bec5" />
            <Text style={styles.emptyText}>No hay productos registrados.</Text>
            <Text style={styles.emptySubtext}>Presiona + para agregar uno.</Text>
          </View>
        }
      />

      {/* Botón Flotante (FAB +) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <MaterialIcons name="add" size={32} color="#ffffff" />
      </TouchableOpacity>

      {/* Modal para Agregar Producto */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Agregar Producto</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <View style={styles.modalInputGroup}>
                <Text style={styles.modalLabel}>Nombre del producto</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="Ej. Harina de Trigo 1kg"
                  placeholderTextColor="#9e9e9e"
                  value={nombre}
                  onChangeText={setNombre}
                />
              </View>

              <View style={styles.modalInputGroup}>
                <Text style={styles.modalLabel}>Precio unitario ($)</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="0.00"
                  placeholderTextColor="#9e9e9e"
                  value={precio}
                  onChangeText={setPrecio}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.modalInputGroup}>
                <Text style={styles.modalLabel}>Cantidad en stock</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="0"
                  placeholderTextColor="#9e9e9e"
                  value={stock}
                  onChangeText={setStock}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.btnModalCancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.btnModalCancelText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnModalSave}
                  onPress={handleAddProduct}
                >
                  <Text style={styles.btnModalSaveText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal: Registro de Ventas */}
      <Modal
        visible={salesModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSalesModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Registro de Ventas</Text>
              <TouchableOpacity onPress={() => setSalesModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.salesBody}>
              <MaterialIcons name="shopping-cart" size={54} color="#2979ff" />
              <Text style={styles.salesTitle}>Módulo BodegaApp</Text>
              <Text style={styles.salesDesc}>
                Tienes actualmente {productos.length} productos disponibles en inventario.
              </Text>
              <TouchableOpacity
                style={styles.btnModalSave}
                onPress={() => setSalesModalVisible(false)}
              >
                <Text style={styles.btnModalSaveText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  appBar: {
    height: 60,
    backgroundColor: '#2979ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  appBarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  appBarTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 6,
    position: 'relative',
  },
  cartCountBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#ff5252',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartCountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  welcomeBanner: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  welcomeGreeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 90,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  cardStock: {
    fontSize: 12,
    color: '#64748b',
  },
  cardCategory: {
    fontSize: 12,
    color: '#94a3b8',
  },
  btnDelete: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#2979ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#2979ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#2979ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalForm: {
    padding: 20,
  },
  modalInputGroup: {
    marginBottom: 14,
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 6,
  },
  modalTextInput: {
    height: 46,
    borderWidth: 1.5,
    borderColor: '#2979ff',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#212121',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  btnModalCancel: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModalCancelText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '600',
  },
  btnModalSave: {
    flex: 1,
    height: 46,
    backgroundColor: '#2979ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModalSaveText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  salesBody: {
    padding: 24,
    alignItems: 'center',
  },
  salesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 12,
  },
  salesDesc: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
});
