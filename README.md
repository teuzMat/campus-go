# 🎓 CampusGo

Um aplicativo mobile completo desenvolvido em React Native e Expo para auxiliar na organização acadêmica, controle de tarefas, gestão financeira estudantil e acompanhamento de avisos.

## 🚀 Tecnologias Utilizadas

* **React Native & Expo:** Framework principal para desenvolvimento multiplataforma.
* **Expo Router:** Roteamento baseado em ficheiros (File-based routing).
* **AsyncStorage:** Armazenamento de dados local persistente.
* **Context API:** Gestão de estados globais (despesas financeiras).
* **Recursos Nativos (Expo SDK):** Location, Image Picker, Notifications, Haptics.

---

## 📋 Requisitos Acadêmicos Atendidos

Este projeto foi estruturado para cumprir 5 tarefas principais:

### 1. Navegação Avançada
* Implementação de rotas com **Expo Router**.
* Sistema de navegação principal baseado em **Tabs** (Início, Tarefas, Bolso, Perfil).
* Roteamento aninhado (Stack) contendo telas secundárias:
  * **Modal:** Abertura de formulário de Nova Tarefa.
  * **Rotas Dinâmicas:** Passagem de parâmetros via URL (ex: `/task/[id]`).

### 2. Armazenamento Local e Estado Global
* Utilização da **Context API** para gerenciar o estado das despesas (`expenses-context.js`).
* Persistência de dados utilizando `@react-native-async-storage/async-storage`, garantindo que os lançamentos financeiros não sejam perdidos ao fechar o app.

### 3. Integração com Recursos Nativos de Hardware
* **Câmera e Galeria (`expo-image-picker`):** Funcionalidade para alterar o avatar do usuário na tela de Perfil.
* **GPS e Geolocalização (`expo-location`):** Funcionalidade de "Check-in" na aba de Tarefas, capturando e revertendo as coordenadas do dispositivo para um endereço legível (Rua/Bairro/Estado).

### 4. Notificações, Vibração e Animações
* **Notificações Locais (`expo-notifications`):** Agendamento de lembretes de estudo disparados após 10 segundos.
* **Feedback Tátil (`expo-haptics`):** Resposta física do dispositivo ao concluir tarefas ou salvar novos dados.
* **Animações Nativas:** Criação de um componente customizado `FadeIn` (utilizando a API `Animated` do React Native) para transição suave dos itens no Mural de Avisos.

### 5. Consumo de API REST
* Integração com API externa (JSONPlaceholder) via `fetch`.
* Tratamento completo de UI/UX com 3 estados:
  * **Carregamento (Loading):** Exibição de `ActivityIndicator`.
  * **Erro:** Mensagem de falha com opção de tentar novamente (Retry).
  * **Sucesso:** Exibição dos dados em uma `FlatList` com recurso de *Pull-to-Refresh*.
* **Bônus (+0,5):** Implementação de requisição `POST` para criação de um novo aviso, retornando o ID gerado pelo servidor em um Alert.

---

## 📱 Como Executar o Projeto

1. Clone o repositório ou extraia os ficheiros do projeto.
2. Instale as dependências executando `npm install` no terminal.
3. Inicie o servidor do Expo limpando o cache com o comando `npx expo start -c`.
4. **Importante:** Leia o QR Code com o aplicativo **Expo Go** no seu dispositivo físico (Android ou iOS). Testes no navegador web (Web Bundling) não suportam as APIs nativas de notificação e câmera utilizadas neste projeto.

---

## 👨‍💻 Autor

**Mateus Cantanhêde da Cruz**  
Matrícula: 24214290038  
*Curso de Análise e Desenvolvimento de Sistemas (ADS) - IESB*