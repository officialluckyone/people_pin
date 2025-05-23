import { LinearGradient } from 'expo-linear-gradient'
import { MotiView, useAnimationState } from 'moti'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

const { width } = Dimensions.get('window')

function Shimmer({ style }: { style: any }) {
  const animation = useAnimationState({
    from: { translateX: -width },
    to: { translateX: width },
  })

  React.useEffect(() => {
    animation.transitionTo('to', {
      loop: true,
      type: 'timing',
      duration: 1500,
    })
  }, [animation])

  return (
    <View style={[style, styles.shimmerContainer]}>
      <MotiView state={animation} style={[styles.shimmerBar, { borderRadius: style.borderRadius || 0 }]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.6)', 'transparent']}
          start={[0, 0]}
          end={[1, 0]}
          style={{ flex: 1, borderRadius: style.borderRadius || 0 }}
        />
      </MotiView>
    </View>
  )
}

export default function SkeletonCard() {
  return (
    <View style={styles.card}>
        <View style={styles.topRow}>
            <Shimmer style={styles.avatar} />

            <View style={styles.info}>
                <Shimmer style={styles.name} />
                <Shimmer style={styles.username} />
                <Shimmer style={styles.email} />
            </View>
        </View>

        <View style={styles.idBadge}>
            <Shimmer style={styles.idText} />
        </View>

        <View style={styles.locationRow}>
            <Shimmer style={styles.locationIcon} />
            <View style={{ marginLeft: 14, flex: 1 }}>
            <Shimmer style={styles.address} />
            <Shimmer style={styles.coords} />
            </View>
        </View>

        <View style={styles.mapButton}>
            <Shimmer style={styles.mapIcon} />
            <Shimmer style={styles.mapText} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 12,
  },

  info: {
    marginBottom: 12,
  },

  name: {
    width: 180,
    height: 16,
    borderRadius: 4,
    marginBottom: 6,
  },

  username: {
    width: 120,
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
  },

  email: {
    width: 200,
    height: 14,
    borderRadius: 4,
  },

  idBadge: {
    marginBottom: 12,
  },

  idText: {
    width: 50,
    height: 16,
    borderRadius: 6,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  locationIcon: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },

  address: {
    width: '100%',
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
  },

  coords: {
    width: 140,
    height: 14,
    borderRadius: 4,
  },

  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mapIcon: {
    width: 18,
    height: 18,
    borderRadius: 4,
    marginRight: 8,
  },

  mapText: {
    width: 80,
    height: 16,
    borderRadius: 4,
  },

  shimmerContainer: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },

  shimmerBar: {
    width: '30%',
    height: '100%',
    position: 'absolute',
    left: 0,
  },
})
