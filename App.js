"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Text } from "react-native"
import { DatabaseService } from "./src/services/database"
import ProductForm from "./src/components/ProductForm"
import ProductList from "./src/components/ProductList"

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeDatabase()
  }, [])

  const initializeDatabase = async () => {
    try {
      await DatabaseService.initDatabase()
      await loadProducts()
    } catch (error) {
      console.error("Erro ao inicializar banco:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadProducts = async () => {
  try {
    const productList = await DatabaseService.getAllProducts()
    setProducts(productList)
  } catch (error) {
    console.error("Erro ao carregar produtos:", error)
  }
}


  const addProduct = async (name, quantity) => {
    try {
      await DatabaseService.addProduct(name, quantity)
      await loadProducts() // Recarrega a lista
    } catch (error) {
      console.error("Erro ao adicionar produto:", error)
    }
  }

  const deleteProduct = async (id) => {
    try {
      await DatabaseService.deleteProduct(id)
      await loadProducts() // Recarrega a lista
    } catch (error) {
      console.error("Erro ao deletar produto:", error)
    }
  }

  const sortByQuantity = async (order = "ASC") => {
    try {
      const productList = await DatabaseService.getProductsByQuantity(order)
      setProducts(productList)
    } catch (error) {
      console.error("Erro ao ordenar produtos:", error)
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}></View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <View style={styles.content}>
        <ProductForm onAddProduct={addProduct} />
        <View style={styles.sortButtons}>
          <TouchableOpacity style={styles.sortButton} onPress={() => loadProducts ("ASC")}>
            <Text style={styles.sortButtonText}>Inserções</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortButton} onPress={() => sortByQuantity("DESC")}>
            <Text style={styles.sortButtonText}>Maior Estoque</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortButton} onPress={() => sortByQuantity("ASC")}>
            <Text style={styles.sortButtonText}>Menor Estoque</Text>
          </TouchableOpacity>
        </View>
        <ProductList products={products} onDeleteProduct={deleteProduct} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sortButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 4,
  },
  sortButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 2,
  },
  sortButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
})
