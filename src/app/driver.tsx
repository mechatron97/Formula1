import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useLocalSearchParams } from 'expo-router';

const query = gql
`query MyQuery{
    drivers(search: "lewi"){
      response {
        id
        image
        name
        nationality
        number
        birthdate
        birthplace
        abbr
        career_points
        podiums
        teams {
          team {
            logo
            name
          }
          season
        }
        grands_prix_entered
        highest_grid_position
        highest_race_finish {
          number
          position
        }
        world_championships
      }
    }
  }`;

const DriverDetails = () => {

  // const { id } = useLocalSearchParams();

  const { data, loading } = useQuery(query, { variables: { search: 'l' } });

  if (loading) {
    return <ActivityIndicator />;
  }

  const drivers = data.drivers.response[0];

  // console.log(JSON.stringify(drivers, null, 2));

  if (!drivers) {
    return <Text>Driver not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: drivers.image }} style={styles.image}
        resizeMode="contain" />
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Name: {drivers.name}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Acronym: {drivers.abbr}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Country: {drivers.nationality}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Number: {drivers.number}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Birth Date: {drivers.birthdate}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Birthplace: {drivers.birthplace}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Career Points: {drivers.career_points}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    margin: 5,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    padding: 10
  },
  page: {
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#ED0500',
    borderRadius: 50,
    alignItems: 'center',
    flex: 0.7
},
    buttonText: {
        color: '#FDFDFD',
        fontFamily: 'F1-Regular',
        fontSize: 14,
        padding: 10,
        paddingHorizontal: 10
    },
    buttonsRow: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20
  },
  time: {
    fontSize: 12,
    backgroundColor: 'gainsboro',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    color: 'dimgray',
    fontWeight: '500',
    marginTop: 5,
  },
});

export default DriverDetails;