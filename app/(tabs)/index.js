import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNotices } from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';
import { api } from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context'; 

export default function MuralScreen() {
  const { notices, isLoading, error, reload } = useNotices();
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function handleRefresh() {
    setIsRefreshing(true);
    await reload();
    setIsRefreshing(false);
  }

  async function handleCreateNotice() {
    try {
      const novoAviso = await api.create('/posts', { title: 'Novo Aviso', body: 'Estudar muito para PDM!', userId: 1 });
      Alert.alert('Aviso Criado', `Sucesso! ID devolvido pelo servidor: ${novoAviso.id}`);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível criar o aviso.');
    }
  }

  function renderNotice({ item }) {
    return (
      <FadeIn>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </View>
      </FadeIn>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mural de Avisos</Text>
        <Pressable onPress={handleCreateNotice} style={styles.bonusButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      {isLoading && !isRefreshing && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text style={styles.loadingText}>A procurar avisos...</Text>
        </View>
      )}

      {error && !isLoading && (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={styles.errorText}>Não foi possível ligar ao servidor.</Text>
          <Pressable style={styles.retryButton} onPress={reload}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      )}

      {!isLoading && !error && (
        <FlatList
          data={notices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotice}
          contentContainerStyle={styles.listContainer}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum aviso disponível no momento.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingBottom: 16 },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800' },
  bonusButton: { backgroundColor: '#7C3AED', padding: 8, borderRadius: 12 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { color: '#9CA3AF', marginTop: 12 },
  errorText: { color: '#FFFFFF', fontSize: 16, marginTop: 12, marginBottom: 24, textAlign: 'center' },
  retryButton: { backgroundColor: '#EF4444', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  retryButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  listContainer: { padding: 24, paddingTop: 0 },
  card: { backgroundColor: '#151A27', padding: 20, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#202638' },
  cardTitle: { color: '#D8B4FE', fontSize: 18, fontWeight: '700', marginBottom: 8, textTransform: 'capitalize' },
  cardBody: { color: '#9CA3AF', fontSize: 14, lineHeight: 20 },
  emptyText: { color: '#9CA3AF', textAlign: 'center', marginTop: 32 }
});