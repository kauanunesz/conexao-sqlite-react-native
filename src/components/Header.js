import { View, Text, StyleSheet } from "react-native"

const Header = ({ productCount }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.icon}>📦</Text>
          <Text style={styles.title}>Produtos</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{productCount} itens</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
  },
  badge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
})

export default Header
