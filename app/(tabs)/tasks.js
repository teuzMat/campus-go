import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator, useWindowDimensions } from 'react-native';
import { router, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const [locationLabel, setLocationLabel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  async function checkInHandler() {
    setIsLoading(true);
    const place = await getCurrentPlace();
    setIsLoading(false);

    if (place) setLocationLabel(place.label);
    else Alert.alert('Permissão Negada', 'Não foi possível obter a sua localização.');
  }

  async function reminderHandler() {
    const success = await scheduleReminder("Lembrete CampusGo", 10);
    if (success) {
      Alert.alert("Agendado", "Receberá uma notificação em 10 segundos.");
    } else {
      Alert.alert("Erro", "A permissão para notificações foi negada.");
    }
  }

  function finishTaskHandler() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Sucesso", "Tarefa concluída");
  }

  return (
    <View style={styles.container}>
      <View style={[styles.content, isDesktop && styles.desktopContent]}>
        <Text style={styles.headerTitle}>Gestão de Tarefas</Text>

        <Link href="/new-task" asChild>
          <Pressable style={styles.primaryButton}>
            <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Nova Tarefa (Modal)</Text>
          </Pressable>
        </Link>

        <Pressable style={styles.secondaryButton} onPress={() => router.push('/task/42')}>
          <Ionicons name="document-text-outline" size={20} color="#7C3AED" />
          <Text style={styles.secondaryButtonText}>Abrir Tarefa 42</Text>
        </Pressable>

        <View style={styles.divider} />

        <Pressable style={styles.locationButton} onPress={checkInHandler} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : (
            <>
              <Ionicons name="location-outline" size={24} color="#FFFFFF" />
              <Text style={styles.locationButtonText}>Estudei aqui</Text>
            </>
          )}
        </Pressable>

        {locationLabel ? (
          <View style={styles.locationResult}>
            <Text style={styles.locationLabel}>Último Check-in:</Text>
            <Text style={styles.locationValue}>📍 {locationLabel}</Text>
          </View>
        ) : null}

        <View style={styles.divider} />

        <View style={styles.actionsRow}>
          <Pressable style={styles.actionButton} onPress={reminderHandler}>
            <Ionicons name="notifications-outline" size={24} color="#D8B4FE" />
            <Text style={styles.actionButtonText}>Lembrar em 10 s</Text>
          </Pressable>

          <Pressable style={[styles.actionButton, styles.finishButton]} onPress={finishTaskHandler}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#10B981" />
            <Text style={[styles.actionButtonText, { color: '#10B981' }]}>Concluir</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19', justifyContent: 'center' },
  content: { padding: 24, justifyContent: 'center', width: '100%' },
  desktopContent: { width: '60%', alignSelf: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', marginBottom: 24, textAlign: 'center' },
  primaryButton: { flexDirection: 'row', backgroundColor: '#7C3AED', paddingVertical: 16, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 12 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  secondaryButton: { flexDirection: 'row', backgroundColor: '#1B2130', borderWidth: 1, borderColor: '#202638', paddingVertical: 16, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8 },
  secondaryButtonText: { color: '#D8B4FE', fontSize: 16, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#202638', marginVertical: 24 },
  locationButton: { flexDirection: 'row', backgroundColor: '#10B981', paddingVertical: 16, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8 },
  locationButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  locationResult: { marginTop: 16, backgroundColor: '#151A27', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#202638', alignItems: 'center' },
  locationLabel: { color: '#9CA3AF', fontSize: 12, fontWeight: '600', marginBottom: 4 },
  locationValue: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', textAlign: 'center' },
  actionsRow: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  actionButton: { flex: 1, flexDirection: 'row', backgroundColor: '#1B2130', borderWidth: 1, borderColor: '#3B0764', paddingVertical: 16, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8 },
  actionButtonText: { color: '#D8B4FE', fontSize: 14, fontWeight: '700' },
  finishButton: { borderColor: '#064E3B', backgroundColor: '#064E3B20' }
});