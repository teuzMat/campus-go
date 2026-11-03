import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function NewTaskModal() {
  const [taskName, setTaskName] = useState('');

  function handleSaveTask() {
    if (taskName.trim() === '') {
      Alert.alert('Aviso', 'Por favor, digite um nome para a tarefa.');
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Sucesso', 'Tarefa gravada!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.title}>Criar Nova Tarefa</Text>
      <Text style={styles.subtitle}>Planeie os seus próximos estudos.</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Ex: Rever apontamentos de Segurança" 
        placeholderTextColor="#9CA3AF"
        value={taskName}
        onChangeText={setTaskName}
        autoFocus
      />

      <View style={styles.buttonRow}>
        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </Pressable>
        
        <Pressable style={styles.saveButton} onPress={handleSaveTask}>
          <Text style={styles.saveButtonText}>Salvar Tarefa</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#151A27', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#9CA3AF', fontSize: 16, marginBottom: 32, textAlign: 'center' },
  input: { width: '100%', maxWidth: 400, backgroundColor: '#1B2130', color: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 32, borderWidth: 1, borderColor: '#7C3AED' },
  buttonRow: { flexDirection: 'row', gap: 16, width: '100%', maxWidth: 400 },
  cancelButton: { flex: 1, backgroundColor: '#1B2130', borderWidth: 1, borderColor: '#202638', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  cancelButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  saveButton: { flex: 1, backgroundColor: '#7C3AED', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});