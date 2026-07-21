import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const resourceGroups = [
  {
    title: 'Source document',
    items: [
      'docs/CIAS App_ EZ-PAP .pdf',
      '30-page outline for a clickable question-based CPAP education app.',
      'The source asks for each question header to reveal short bullet points that users advance through.',
    ],
  },
  {
    title: 'Covered app sections',
    items: [
      'Section I: What OSA is, symptoms, risk factors, diagnosis, treatment, pregnancy relevance, and healthy sleep.',
      'Section II: Getting started with CPAP and building toward full-night use.',
      'Section III: Troubleshooting mask fit, leaks, dryness, irritation, congestion, bloating, temperature, cleaning, and travel.',
      'Sections V and VI: Healthy sleep plus intimacy, dating, and partner support.',
    ],
  },
  {
    title: 'Clinical boundary',
    items: [
      'This app is educational and should support, not replace, clinician guidance.',
      'Patients should follow their prescribed pressure settings, device instructions, and equipment supplier guidance.',
      'Persistent symptoms, severe sleepiness, pregnancy concerns, or CPAP intolerance should be escalated to the care team.',
    ],
  },
];

export default function ResourcesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>EZ-PAP build notes</Text>
          <Text style={styles.title}>The app is now anchored to the CIS/CIAS source document.</Text>
          <Text style={styles.subtitle}>
            This tab keeps the source basis visible while the Learn tab turns the document into a mobile education flow.
          </Text>
        </View>

        {resourceGroups.map((group) => (
          <View key={group.title} style={styles.card}>
            <Text style={styles.cardTitle}>{group.title}</Text>
            {group.items.map((item) => (
              <View key={item} style={styles.row}>
                <View style={styles.dot} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  header: {
    backgroundColor: '#0f766e',
    borderRadius: 18,
    padding: 22,
    marginBottom: 14,
  },
  eyebrow: {
    color: '#ccfbf1',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    lineHeight: 33,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ecfeff',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 17,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0f766e',
    marginTop: 7,
  },
  itemText: {
    flex: 1,
    color: '#334155',
    fontSize: 15,
    lineHeight: 22,
  },
});
