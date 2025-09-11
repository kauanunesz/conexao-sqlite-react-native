import * as SQLite from "expo-sqlite"

class DatabaseServiceClass {
  constructor() {
    this.db = null
  }

  async initDatabase() {
    try {
      this.db = await SQLite.openDatabaseAsync("products.db")

      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `)

      const result = await this.db.getFirstAsync("SELECT COUNT(*) as count FROM products")

      if (result.count === 0) {
        await this.insertInitialData()
      }

      console.log("Banco de dados inicializado com sucesso!")
    } catch (error) {
      console.error("Erro ao inicializar banco:", error)
      throw error
    }
  }

  async insertInitialData() {
    const initialProducts = [
      { name: "Notebook Dell", quantity: 5 },
      { name: "Mouse Logitech", quantity: 12 },
      { name: "Teclado Mecânico", quantity: 8 },
    ]

    for (const product of initialProducts) {
      await this.addProduct(product.name, product.quantity)
    }
  }

  async getAllProducts() {
    try {
      const products = await this.db.getAllAsync("SELECT * FROM products ORDER BY created_at DESC")
      return products
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      throw error
    }
  }

  async getProductsByQuantity(order = "ASC") {
    try {
      const products = await this.db.getAllAsync(`SELECT * FROM products ORDER BY quantity ${order}`)
      return products
    } catch (error) {
      console.error("Erro ao buscar produtos por quantidade:", error)
      throw error
    }
  }

  async addProduct(name, quantity) {
    try {
      const result = await this.db.runAsync("INSERT INTO products (name, quantity) VALUES (?, ?)", [name, quantity])
      console.log("Produto adicionado com ID:", result.lastInsertRowId)
      return result.lastInsertRowId
    } catch (error) {
      console.error("Erro ao adicionar produto:", error)
      throw error
    }
  }

  async deleteProduct(id) {
    try {
      await this.db.runAsync("DELETE FROM products WHERE id = ?", [id])
      console.log("Produto deletado:", id)
    } catch (error) {
      console.error("Erro ao deletar produto:", error)
      throw error
    }
  }

  async updateProduct(id, name, quantity) {
    try {
      await this.db.runAsync("UPDATE products SET name = ?, quantity = ? WHERE id = ?", [name, quantity, id])
      console.log("Produto atualizado:", id)
    } catch (error) {
      console.error("Erro ao atualizar produto:", error)
      throw error
    }
  }
}

export const DatabaseService = new DatabaseServiceClass()
