import React from 'react'
import {View, Button, StyleSheet} from 'react-native'
import {useAuth} from '../../contexts/auth'

const SignIn: React.FC = () => {
  const {signIn} = useAuth()

  
  
  function handleSignIn() {
    signIn()    
    // console.log('signed', signed);
    // console.log(user);
  }
  
  return (
    <View style={styles.container}>
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default SignIn