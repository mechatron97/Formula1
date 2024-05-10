import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <Link href="splash/animation" asChild>
    <Button title='Go to Animation' />
    </Link>
  )
}

export default index