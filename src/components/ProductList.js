import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native"

const ProductList = ({ products, onDeleteProduct, searchTerm }) => {
  const handleDeleteProduct = (product) => {
    Alert.alert("Confirmar exclusão", `Deseja realmente excluir "${product.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => onDeleteProduct(product.id) },
    ])
  }

  const getStockStatus = (quantity) => {
    if (quantity > 10) return { text: "Em estoque", color: "#16a34a" }
    if (quantity > 5) return { text: "Estoque baixo", color: "#eab308" }
    return { text: "Crítico", color: "#dc2626" }
  }

  const renderProduct = ({ item }) => {
    const stockStatus = getStockStatus(item.quantity)

    return (
      <View style={styles.productCard}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.productDetails}>
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityText}>Qtd: {item.quantity}</Text>
            </View>
            <Text style={[styles.statusText, { color: stockStatus.color }]}>{stockStatus.text}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteProduct(item)}>
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{searchTerm ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>PRODUTOS CADASTRADOS</Text>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={products.length === 0 ? styles.emptyList : null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityBadge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  quantityText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  deleteIcon: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
  },
})

export default ProductList
