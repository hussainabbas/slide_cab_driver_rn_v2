import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { colors, dimensions } from '../../utils/resources';

const EarningsScreen: React.FC = () => {
  const { earnings } = useSelector((state: RootState) => state.driver);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earnings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.earningsCard}>
          <Text style={styles.cardTitle}>Today's Earnings</Text>
          <Text style={styles.amount}>${earnings.today.toFixed(2)}</Text>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.cardTitle}>Total Earnings</Text>
          <Text style={styles.amount}>${earnings.total.toFixed(2)}</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Weekly Summary</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Trips Completed:</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Hours Driven:</Text>
            <Text style={styles.statValue}>0h</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Average per Trip:</Text>
            <Text style={styles.statValue}>$0.00</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: dimensions.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  headerTitle: {
    fontSize: dimensions.fontSize.title,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    padding: dimensions.spacing.lg,
  },
  earningsCard: {
    backgroundColor: colors.white,
    padding: dimensions.spacing.lg,
    borderRadius: dimensions.borderRadius.md,
    marginBottom: dimensions.spacing.md,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: dimensions.spacing.sm,
    color: colors.textPrimary,
  },
  amount: {
    fontSize: dimensions.fontSize.header,
    fontWeight: 'bold',
    color: colors.success,
  },
  statsCard: {
    backgroundColor: colors.white,
    padding: dimensions.spacing.lg,
    borderRadius: dimensions.borderRadius.md,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: dimensions.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  statLabel: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: dimensions.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

export default EarningsScreen;
