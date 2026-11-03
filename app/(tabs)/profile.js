import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { pickImage } from '../../services/media';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function loadPhoto() {
      try {
        const savedPhoto = await AsyncStorage.getItem('@profile-photo');
        if (savedPhoto) setPhotoUri(savedPhoto);
      } catch (error) {
        console.error('Erro ao carregar foto', error);
      }
    }
    loadPhoto();
  }, []);

  async function handleImagePick() {
    const uri = await pickImage();
    if (uri) {
      setPhotoUri(uri);
      try {
        await AsyncStorage.setItem('@profile-photo', uri);
      } catch (error) {
        console.error('Erro ao salvar foto', error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      
      <Pressable style={styles.avatarContainer} onPress={handleImagePick}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="person" size={60} color="#7C3AED" />
          </View>
        )}
        <View style={styles.editBadge}>
          <Ionicons name="camera" size={16} color="#FFFFFF" />
        </View>
      </Pressable>
      
      <Text style={styles.name}>Mateus Cantanhêde</Text>
      <Text style={styles.subtitle}>24214290038</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19', alignItems: 'center', paddingTop: 80 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', marginBottom: 40 },
  avatarContainer: { position: 'relative', marginBottom: 24 },
  // Tarefa 3: O avatar precisa ter largura, altura e borderRadius para aparecer
  avatar: { width: 140, height: 140, borderRadius: 70, borderWidth: 3, borderColor: '#7C3AED' },
  placeholder: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#151A27', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#202638' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#7C3AED', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#0B0F19' },
  name: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#9CA3AF', fontSize: 16 }
});