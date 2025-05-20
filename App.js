import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const moods = [
  { title: 'HAPPY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5qOzVPo3zjjhaQNtV7bOUaUW3O_b1fgDnTw&s' },
  { title: 'RELAXING', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjoXxDtPY1fRMQ1y-SJjyZb-b9nOY521SMog&s' },
  { title: 'DREAMY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPOVp7XV3mfhqddfbXKNEZMa2O3u_LTVVCXw&s' },
  { title: 'ENERGIZED', image: 'https://img.freepik.com/free-photo/man-silhouette-angrily-screaming-shadow-back-lit-white-background_140725-161505.jpg?semt=ais_hybrid&w=740' },
  { title: 'SAD', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TW6mLqATiReOEaMwwlgJIS5dc_XlpFikkQ&s' },
  { title: 'SEXY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRztRLhJO9JT3_kYGCTvCZV0uH1a_AzMWpg8A&s' },
  { title: 'FOCUSED', image: 'https://www.thoughtco.com/thmb/GaiuduCRVyxn3qWpJ5yWin2LfdU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-518845884-58d2d9625f9b584683f323ce.jpg' },
  { title: 'ANGRY', image: 'https://images.squarespace-cdn.com/content/v1/589b12468419c22a6dc74e65/1558341618782-7FJAPQ2YR2NRC5U2VP9J/image-asset.jpeg' },
  { title: 'ROMANTIC', image: 'https://www.hcbh.org/media/giyfs1eb/falling-in-love.png' },
  { title: 'NOSTALGIC', image: 'https://www.brainsway.com/wp-content/uploads/2023/05/Nostalgic-Depression.jpg' },
];

const moodTracks = {
  HAPPY: [
    { title: "Happy – Pharrell Williams", embed: "https://open.spotify.com/embed/track/60nZcImufyMA1MKQY3dcCH" },
    { title: "Good as Hell – Lizzo", embed: "https://open.spotify.com/embed/track/0k664IuFwVP557Gnx7RhIl" },
    { title: "Can't Stop The Feeling – JT", embed: "https://open.spotify.com/embed/track/6JV2JOEocMgcZxYSZelKcc" },
    { title: "Walking on Sunshine", embed: "https://open.spotify.com/embed/track/3DQVGC1MFT3FGM3ZLbm1Nf" },
    { title: "Uptown Funk – Bruno Mars", embed: "https://open.spotify.com/embed/track/32OlwWuMpZ6b0aN2RZOeMS" },
  ],
  ENERGIZED: [
    { title: "Can't Hold Us – Macklemore", embed: "https://open.spotify.com/embed/track/0c6Y8g1g0g0g0g0g0g0g0g" },
    { title: "Stronger – Kanye West", embed: "https://open.spotify.com/embed/track/0c6Y8g1g0g0g0g0g0g0g0g" },
    { title: "Eye of the Tiger – Survivor", embed: "https://open.spotify.com/embed/track/0c6Y8g1g0g0g0g0g0g0g0g" },
    { title: "Thunder – Imagine Dragons", embed: "https://open.spotify.com/embed/track/0c6Y8g1g0g0g0g0g0g0g0g" },
    { title: "We Will Rock You – Queen", embed: "https://open.spotify.com/embed/track/0c6Y8g1g0g0g0g0g0g0g0g" },
  ],
  ROMANTIC: [
    { title: "Perfect – Ed Sheeran", embed: "https://open.spotify.com/embed/track/0VjIjW4z4g0g0g0g0g0g0g" },
    { title: "All of Me – John Legend", embed: "https://open.spotify.com/embed/track/0VjIjW4z4g0g0g0g0g0g0g" },
    { title: "A Thousand Years – Christina Perri", embed: "https://open.spotify.com/embed/track/0VjIjW4z4g0g0g0g0g0g0g" },
    { title: "Can't Help Falling in Love – Elvis Presley", embed: "https://open.spotify.com/embed/track/0VjIjW4z4g0g0g0g0g0g0g" },
    { title: "I Will Always Love You – Whitney Houston", embed: "https://open.spotify.com/embed/track/0VjIjW4z4g0g0g0g0g0g0g" },
  ],
  RELAXING: [
  { title: "Electra – Airstream", embed: "https://open.spotify.com/embed/track/2ZsWcZ2Zq3c5vZzZzZzZzZ" },
  { title: "Clair de Lune – Claude Debussy", embed: "https://open.spotify.com/embed/track/3zBhihYUHBmGd2bcQIobrF" },
  { title: "Holocene – Bon Iver", embed: "https://open.spotify.com/embed/track/0bYg9bo50gSsH3LtXe2SQn" },
  { title: "Pure Shores – All Saints", embed: "https://open.spotify.com/embed/track/1cTZMwcBJT0Ka3UJPXOeeN" },
  { title: "Someone Like You – Adele", embed: "https://open.spotify.com/embed/track/4kflIGfjdZJW4ot2ioixTB" },
],
  DREAMY: [
    { title: "I'll Be Missing You", embed: "https://open.spotify.com/embed/track/7H6ev70Weq6DdpZyyTmUXk" },
    { title: "Cold Little Heart", embed: "https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp" },
    { title: "Where Is My Mind", embed: "https://open.spotify.com/embed/track/2VxeLyX666F8uXCJ0dZF8B" },
    { title: "Apocalypse - Cigarettes After Sex", embed: "https://open.spotify.com/embed/track/3AVrVz5rK8Hrqo9YGiVGN5" },
    { title: "In The Air Tonight", embed: "https://open.spotify.com/embed/track/18AXbzPzBS8Y3AkgSxzJPb" },
  ],
  SAD: [
    { title: "Someone Like You – Adele", embed: "https://open.spotify.com/embed/track/4kflIGfjdZJW4ot2ioixTB" },
    { title: "Let Her Go – Passenger", embed: "https://open.spotify.com/embed/track/4Y1fTcf3dYJiRz6C3nYhWW" },
    { title: "When I Was Your Man – Bruno Mars", embed: "https://open.spotify.com/embed/track/0y60itmpH0aPKsFiGxmtnh" },
    { title: "Fix You – Coldplay", embed: "https://open.spotify.com/embed/track/6KuQTIu1KoTTkLXKrwlLPV" },
    { title: "The Night We Met – Lord Huron", embed: "https://open.spotify.com/embed/track/2u8XzYh6VhXdiK8vL7zRbq" },
  ],
SEXY: [
    { title: "Call Out My Name – The Weeknd", embed: "https://open.spotify.com/embed/track/2XU0oxnq2qxCpomAAuJY8K" },
    { title: "Redbone – Childish Gambino", embed: "https://open.spotify.com/embed/track/3UmaczJpikHgJFyBTAJVoz" },
    { title: "Earned It (Fifty Shades of Grey) – The Weeknd", embed: "https://open.spotify.com/embed/track/1cQ3LIkZE68pMSnPhZWXLu" },
    { title: "Lotus Flower – Radiohead", embed: "https://open.spotify.com/embed/track/6G8kHiVZlDPOmcUUMqGgGj" },
    { title: "Adorn – Miguel", embed: "https://open.spotify.com/embed/track/0FnbfN1X2o7Yqf4Hl5w0iJ" },
  ],
FOCUSED: [
  { title: "Weightless – Marconi Union", embed: "https://open.spotify.com/embed/track/6kkwzB6hXLIONkEk9JciA6" },
  { title: "Night Owl – Galimatias", embed: "https://open.spotify.com/embed/track/4xsum9mtqZB1pUuhw6wCQo" },
  { title: "Kusanagi – Oatmello", embed: "https://open.spotify.com/embed/track/5APkeOxFMV3oEo2pR9tgS0" },
  { title: "Luv(sic) Part 3 – Nujabes", embed: "https://open.spotify.com/embed/track/4xlpJ99yL9xYQtzG6c3hwk" },
  { title: "Drift – Nosaj Thing", embed: "https://open.spotify.com/embed/track/2uOpFzvNQqFAWh8lZxosX0" },

],
ANGRY: [
  { title: "Psychosocial – Slipknot", embed: "https://open.spotify.com/embed/track/2MvIMgtWyK88OiPi0J8Dg3" },
  { title: "Chop Suey! – System Of A Down", embed: "https://open.spotify.com/embed/track/7kwiwQhWRBSP1PJv4ZFJUK" },
  { title: "Down with the Sickness – Disturbed", embed: "https://open.spotify.com/embed/track/79qOmULc1p6IP1do5kgwg7" },
  { title: "Bodies – Drowning Pool", embed: "https://open.spotify.com/embed/track/3xktQXIr1OD3ENc19viwDP" },
  { title: "Freak on a Leash – Korn", embed: "https://open.spotify.com/embed/track/7B9S4RiRczdw1B9ddjpFe8" },
],
NOSTALGIC: [
  { title: "Bohemian Rhapsody – Queen", embed: "https://open.spotify.com/embed/track/7tFiyTwD0nx5a1eklYtX2J" },
  { title: "Take On Me – a-ha", embed: "https://open.spotify.com/embed/track/2WfaOiMkCvy7F5fcp2zZ8L" },
  { title: "Africa – Toto", embed: "https://open.spotify.com/embed/track/2374M0fQpWi3dLnB54qaLX" },
  { title: "Smells Like Teen Spirit – Nirvana", embed: "https://open.spotify.com/embed/track/5ghIJDpPoe3CfHMGu71E6T" },
  { title: "Every Breath You Take – The Police", embed: "https://open.spotify.com/embed/track/5Z01UMMf7V1o0MzF86s6WJ" },
],
};

const isPasswordStrong = (password) => {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  return strongRegex.test(password);
};

function HomeScreen({ navigation, isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = () => {
    if (!isPasswordStrong(password)) {
      Alert.alert('Weak Password', 'Use at least 6 characters, including uppercase, lowercase, number, and symbol.');
      return;
    }
    setIsLoggedIn(true);
  };

  const filteredMoods = moods.filter(mood => mood.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>GROOVE TUNES</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ color: '#1DB954', textAlign: 'right', marginBottom: 10 }}>
            {showPassword ? 'Hide' : 'Show'} Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text style={{ color: '#1DB954', textAlign: 'center', marginTop: 10 }}>
            {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={() => setIsLoggedIn(false)}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>GROOVE 🎧 TUNES</Text>

      <View style={styles.socialLinks}>
        <Text style={styles.link} onPress={() => Linking.openURL('https://facebook.com')}>Facebook</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://instagram.com')}>Instagram</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search mood..."
        placeholderTextColor="#aaa"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={() => setSearchQuery('')}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>FEATURED MOODS</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {filteredMoods.map((mood, index) => (
          <TouchableOpacity key={index} style={styles.moodBox} onPress={() => navigation.navigate('Mood', { mood: mood.title })}>
            <Image source={{ uri: mood.image }} style={styles.moodImage} />
            <Text style={styles.moodText}>{mood.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.chatbotButton} onPress={() => navigation.navigate('Chatbot')}>
        <Text style={styles.chatbotButtonText}>Chat with AI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function MoodScreen({ route, navigation }) {
  const { mood } = route.params;
  const tracks = moodTracks[mood];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{mood} Playlist</Text>
      {tracks ? (
        tracks.map((track, index) => (
          <View key={index} style={{ height: 80, marginBottom: 10 }}>
            <WebView
              source={{ uri: track.embed }}
              style={{ flex: 1 }}
              javaScriptEnabled
              domStorageEnabled
            />
          </View>
        ))
      ) : (
        <Text style={styles.noTracksText}>No tracks available for this mood.</Text>
      )}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function ChatbotScreen() {
  const [chatbotInput, setChatbotInput] = React.useState('');
  const [chatbotResponse, setChatbotResponse] = React.useState('');

  const handleChatbotSubmit = () => {
    const lowerInput = chatbotInput.toLowerCase();
    let response = '';

    if (lowerInput.includes('sad')) {
      response = 'For a sad mood, try listening to "Someone Like You – Adele" or "Let Her Go – Passenger".';
    } else if (lowerInput.includes('focus')) {
      response = 'To help you focus, I recommend "Weightless – Marconi Union" or "Night Owl – Galimatias".';
    } else if (lowerInput.includes('work out')) {
      response = 'A great workout playlist includes "Can\'t Hold Us – Macklemore" and "Eye of the Tiger – Survivor".';
    } else if (lowerInput.includes('relaxing')) {
      response = 'For relaxing music, try "Electra – Airstream" or "Clair de Lune – Claude Debussy".';
    } else if (lowerInput.includes('romantic')) {
      response = 'When feeling romantic, listen to "Perfect – Ed Sheeran" or "All of Me – John Legend".';
    } else if (lowerInput.includes('energized')) {
      response = 'To wake up energized, try "Uptown Funk – Bruno Mars" or "Stronger – Kanye West".';
    } else if (lowerInput.includes('anxiety') || lowerInput.includes('stress')) {
      response = 'For anxiety or stress relief, listen to "Weightless – Marconi Union" or "Holocene – Bon Iver".';
    } else if (lowerInput.includes('creativity')) {
      response = 'To inspire creativity, try "Luv(sic) Part 3 – Nujabes" or "Drift – Nosaj Thing".';
    } else if (lowerInput.includes('happy')) {
      response = 'A great song to dance to when you’re happy is "Happy – Pharrell Williams".';
    } else if (lowerInput.includes('dreamy')) {
      response = 'For dreamy vibes, listen to "Cold Little Heart" or "Where Is My Mind".';
    } else if (lowerInput.includes('pumped up')) {
      response = 'To get pumped up, try "We Will Rock You – Queen" or "Thunder – Imagine Dragons".';
    } else if (lowerInput.includes('long drive')) {
      response = 'A good mix for a long drive includes "Bohemian Rhapsody – Queen" and "Africa – Toto".';
    } else if (lowerInput.includes('angry')) {
      response = 'For an angry mood, listen to "Psychosocial – Slipknot" or "Chop Suey! – System Of A Down".';
    } else if (lowerInput.includes('chill electronic')) {
      response = 'Chill electronic music fits well with moods like "RELAXING" or "DREAMY".';
    } else if (lowerInput.includes('lazy sunday')) {
      response = 'For a lazy Sunday, try "Someone Like You – Adele" or "Holocene – Bon Iver".';
    } else {
      response = 'I am still learning. Can you ask something else?';
    }

    setChatbotResponse(response);
    setChatbotInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chatbot</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Ask me something..."
        placeholderTextColor="#aaa"
        onChangeText={setChatbotInput}
        value={chatbotInput}
      />
      <TouchableOpacity style={styles.chatbotButton} onPress={handleChatbotSubmit}>
        <Text style={styles.chatbotButtonText}>Ask</Text>
      </TouchableOpacity>
      {chatbotResponse ? <Text style={styles.chatbotResponse}>{chatbotResponse}</Text> : null}
    </SafeAreaView>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Mood" component={MoodScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1DB954',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderColor: '#1DB954',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1DB954',
    textAlign: 'center',
    marginVertical: 10,
  },
  logout: {
    position: 'absolute',
    left: 10,
    top: 40,
    zIndex: 10,
  },
  logoutText: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
    gap: 20,
  },
  link: {
    color: '#1DB954',
    textDecorationLine: 'underline',
  },
  searchBar: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodBox: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    overflow: 'hidden',
  },
  moodImage: {
    height: 100,
    width: '100%',
  },
  moodText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
  },
  chatbotButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  chatbotButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  chatbotResponse: {
    color: '#1DB954',
    marginTop: 10,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  homeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noTracksText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

