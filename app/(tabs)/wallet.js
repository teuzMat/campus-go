import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Share, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../../store/expenses-context';
import { SafeAreaView } from 'react-native-safe-area-context'; 

export default function WalletScreen() {
  const { expenses, addExpense } = useExpenses();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const total = expenses.reduce((acumulador, item) => acumulador + (item.amount || 0), 0);

  async function shareHandler() {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre no CampusGo.` });
    } catch (error) { console.log('Erro ao partilhar:', error); }
  }

  function handleAddExpense() {
    const valor = parseFloat(amount.replace(',', '.'));
    if (isNaN(valor) || valor <= 0 || description.trim() === '') {
      alert('Por favor, insira uma descrição e um valor válido.');
      return;
    }
    addExpense({ description, amount: valor, date: new Date().toISOString() });
    setAmount('');
    setDescription('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          
          <View style={styles.card}>
            <View style={styles.headerCard}>
              <Ionicons name="wallet" size={32} color="#7C3AED" />
              <Text style={styles.title}>Resumo de Gastos</Text>
            </View>
            <Text style={styles.label}>Total Exibido</Text>
            <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>Adicionar Novo Gasto</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Descrição (ex: Lanche da tarde)" 
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Valor (ex: 15.50)" 
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Pressable style={styles.addButton} onPress={handleAddExpense}>
              <Text style={styles.addButtonText}>Adicionar Gasto</Text>
            </Pressable>
          </View>

          <Pressable style={styles.shareButton} onPress={shareHandler}>
            <Ionicons name="share-social-outline" size={24} color="#FFFFFF" />
            <Text style={styles.shareText}>Compartilhar resumo</Text>
          </Pressable>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  keyboardView: { flex: 1 },
  scroll: { padding: 24, alignItems: 'center' },
  card: { width: '100%', maxWidth: 900, backgroundColor: '#151A27', borderRadius: 24, padding: 32, borderWidth: 1, borderColor: '#202638', alignItems: 'center', marginBottom: 24 },
  headerCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  title: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  label: { color: '#9CA3AF', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  total: { color: '#D8B4FE', fontSize: 40, fontWeight: '900' },
  form: { width: '100%', maxWidth: 900, backgroundColor: '#151A27', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: '#202638' },
  formTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 16 },
  input: { backgroundColor: '#1B2130', color: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#202638' },
  addButton: { backgroundColor: '#10B981', padding: 16, borderRadius: 12, alignItems: 'center' },
  addButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  shareButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7C3AED', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 14, gap: 8, marginBottom: 40 },
  shareText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});