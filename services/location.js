import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  
  if (status !== 'granted') {
    return null;
  }
  
  try {
    const location = await Location.getCurrentPositionAsync({});
    const place = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
    
    if (place && place.length > 0) {
      const current = place[0];
      
      // Monta as partes do endereço e remove os itens vazios
      const addressParts = [
        current.street || current.name,   // Quadra / Conjunto / Rua
        current.district,                 // Setor / Bairro
        current.city || current.subregion // Cidade / Região Administrativa
      ].filter(Boolean); 
      const fullAddress = `${addressParts.join(' - ')}, ${current.region}`;
      
      return { label: fullAddress };
    }
    return { label: 'Localização encontrada' };
  } catch (error) {
    console.error(error);
    return null;
  }
}