import { View, Text, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';

const query = gql`query MyQuery($id: Int) {
  races(id: $id) {
    response {
      id
      date
      season
      circuit {
        id
        name
        image
      }
      competition {
        name
        location {
          country
          city
        }
      }
      distance
      laps {
        total
      }
      fastest_lap {
        time
      }
      status
      timezone
      type
    }
  }
}
`;

const RaceDetails = () => {
  const { id } = useLocalSearchParams();

  const { data, loading } = useQuery(query, { variables: { id: id } });

  if (loading) {
    return <ActivityIndicator />;
  }

  const race = data.races.response[0];

  if (!race) {
    return <Text>Race not found</Text>;
  }

  const Qualifiers = () => {
    router.push(`/race/${id}/qualifying`);
  }

  const Driver = () => {
    router.push(`/driver${id}/driver`);
}

  const Rankings = () => {
    router.push(`/race/${id}/race`);
  }

  return (
    <View style={styles.page}>
      <Text style={{ fontSize: 24, fontFamily: 'F1-Regular' }}>
        <Text style={{ fontFamily: 'F1-Bold' }}>
          {race.competition.location.city}{' '}
        </Text>
        {race.season}
      </Text>
      <Text style={{ fontSize: 24, fontFamily: 'F1-Regular' }}>{race.circuit.name}</Text>
      <Image
        source={{ uri: race.circuit.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.container}>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Competition: {race.competition.name}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Date: {new Date(race.date).toDateString()}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Distance: {race.distance}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Total Laps: {race.laps.total}</Text>
      <Pressable onPress={() => Qualifiers()}>
      <Text style={styles.time}>Fastest Lap: {race.fastest_lap.time}</Text>
      </Pressable>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Status: {race.status}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Time Zone: {race.timezone}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'F1-Regular' }}>Type: {race.type}</Text>

      <View style={styles.buttonsRow}>
      <Pressable style={styles.button} onPress={() => Qualifiers()}>
                    <Text style={styles.buttonText}>View Qualifiers</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => Rankings()}>
                    <Text style={styles.buttonText}>View Rankings</Text>
      </Pressable>
      </View>
      </View>
    </View>
  );
};

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

export default RaceDetails;