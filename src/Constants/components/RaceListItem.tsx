import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '../../Constants/Colors';
import dayjs from 'dayjs';

import racesResponse from '../../../assets/data/races.json';
import { Link } from 'expo-router';
const races = racesResponse.data.races.response;

export default function RaceListItem({
  item,
  round,
}: {
  item: (typeof races)[0];
  round: number;
}) {
  return (
    <Link href={`/race/${item.id}`} asChild>
      <Pressable style={styles.itemContainer}>
        <View style={styles.datesContainer}>
          <Text style={styles.date}>
            {dayjs(item.date).subtract(2,'days').format('DD')}
            -{dayjs(item.date).format('DD')}
          </Text>
          <Text style={styles.month}>{dayjs(item.date).format('MMM')}</Text>
          <Text style={styles.month}>{item.season}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.round}>Round {round}</Text>
          <Text style={styles.country}>
            {item.competition.location.country}
            {/* {item.circuit ? ' - ' + item.circuit.name : ''} */}
          </Text>
          <Text style={styles.description}>
            {item.competition.name}
          </Text>
        </View>
        <Entypo name="chevron-right" size={24} color={Colors.primary} />
      </Pressable>
     </Link>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  datesContainer: {
    padding: 10,
    marginRight: 10,
    borderRightWidth: 1,
    borderColor: 'gainsboro',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'F1-Regular',
  },
  month: {
    backgroundColor: 'gainsboro',
    paddingVertical: 3,
    paddingHorizontal: 10,

    borderRadius: 10,
    overflow: 'hidden',

    color: 'dimgray',
    fontWeight: 'bold',
    marginTop: 5,

    fontFamily: 'F1-Bold',
  },
  round: {
    color: Colors.primary,
    fontFamily: 'F1-Regular',
  },
  country: {
    fontSize: 20,
    fontFamily: 'F1-Bold',
    marginVertical: 7,
  },
  description: {
    color: 'dimgray',
  },
});