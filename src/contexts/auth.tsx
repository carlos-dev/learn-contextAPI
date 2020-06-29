import React, {createContext, useState, useEffect, useContext} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'
import * as auth from '../services/auth'

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: User | null;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData() {
      const user = await AsyncStorage.getItem('@user')
      const token = await AsyncStorage.getItem('@token')

      if (user && token) {
        api.defaults.headers['Authorizarion'] = `Bearer ${token}`
        setUser((JSON.parse(user)))
        setLoading(false)
      }
    }

    loadStorageData()
  })
  
  async function signIn() {
    const response = await auth.signIn()
    
    setUser(response.user)

    api.defaults.headers['Authorizarion'] = `Bearer ${response.token}`

    await AsyncStorage.setItem('@user', JSON.stringify(response.user))
    await AsyncStorage.setItem('@token', response.token)
  }
  
  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null)
    })
  }

    console.log(user);

  return (
    <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
} 
