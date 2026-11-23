/**
 * Peer-reviewed papers that support one statement on a lesson screen, shown as a "Supporting source" link.
 *
 * Every entry was fetched from PubMed (NCBI E-utilities) on 2026-11-22: the supporting sentence appears word for word
 * in the paper's abstract, and `claim` appears word for word in the screen's English text (tests/citations.test.ts).
 * Author, journal, and year are not translated. Full table with study types and notes: docs/curriculum/SOURCE_CITATIONS.md.
 */
export interface ScreenCitation {
  pmid: string;
  doi?: string;
  firstAuthor: string;
  journal: string;
  year: number;
  title: string;
  studyType: 'guideline' | 'systematic review and meta-analysis' | 'systematic review' | 'randomized trial' | 'cohort' | 'cross-sectional study' | 'cross-sectional survey' | 'narrative review';
  /** The English sentence on the screen that this paper supports. */
  claim: string;
  /** Sentence from the PubMed abstract that supports the claim. */
  supportingQuote: string;
  /** Limits a reviewer should know about (study design, partial support, wording that goes further than the paper). */
  reviewNote?: string;
}

export const SCREEN_CITATIONS: Record<string, ScreenCitation> = {
  "m1-06": { pmid: "28162150", doi: "10.5664/jcsm.6506", firstAuthor: "Kapur", journal: "J Clin Sleep Med", year: 2017, studyType: "guideline",
    title: "Clinical Practice Guideline for Diagnostic Testing for Adult Obstructive Sleep Apnea: An American Academy of Sleep Medicine Clinical Practice Guideline.",
    claim: "Symptoms can raise concern for sleep apnea, but they cannot confirm it on their own.",
    supportingQuote: "We recommend that clinical tools, questionnaires and prediction algorithms not be used to diagnose OSA in adults, in the absence of polysomnography or home sleep apnea testing." },
  "m1-07": { pmid: "31792939", doi: "10.1002/14651858.CD003531.pub4", firstAuthor: "Kennedy", journal: "Cochrane Database Syst Rev", year: 2019, studyType: "systematic review and meta-analysis",
    title: "Pressure modification or humidification for improving usage of continuous positive airway pressure machines in adults with obstructive sleep apnoea.",
    claim: "The pressure helps hold the upper airway open during sleep.",
    reviewNote: "The supporting sentence is from the Cochrane review background, not a pooled result.",
    supportingQuote: "They deliver air pressure by a nasal or oronasal mask to prevent the airway from closing, reducing sleep disturbance and improving sleep quality." },
  "m3-05": { pmid: "29892255", doi: "10.3389/fneur.2018.00091", firstAuthor: "Li", journal: "Front Neurol", year: 2018, studyType: "systematic review and meta-analysis",
    title: "Association between Sleep-Disordered Breathing during Pregnancy and Maternal and Fetal Outcomes: An Updated Systematic Review and Meta-Analysis.",
    claim: "Research has found associations between OSA during pregnancy and conditions including gestational diabetes, high blood pressure, and preeclampsia.",
    supportingQuote: "SDB during pregnancy was associated with a significantly increased risk of gestational diabetes mellitus (GDM), pregnancy-induced hypertension (PIH), and preeclampsia (PEC), but not significantly associated with fetal maternal outcomes, namely APGAR score and birth weight." },
  "m3-06": { pmid: "41066984", doi: "10.1016/j.ejogrb.2025.114753", firstAuthor: "Yao", journal: "Eur J Obstet Gynecol Reprod Biol", year: 2025, studyType: "cross-sectional study",
    title: "Obstructive sleep apnea in pregnancy: Nationwide assessment of obstetric characteristics and maternal morbidity at delivery.",
    claim: "In a large U.S. study of more than 18 million hospital deliveries, people with OSA were more likely to also have:",
    reviewNote: "National Inpatient Sample (18,056,390 deliveries, 2016 to 2020); OSA and other conditions come from hospital billing codes. The same abstract reports cesarean delivery in 62.3% of the OSA group vs 50.4% (matched cohort), which supports the screen's next statement.",
    supportingQuote: "Patients with OSA were more likely to have a diagnosis of obesity (69.7 % vs 11.4 %, adjusted-odds ratio [aOR] 9.97, 95 % confidence interval [CI] 9.67-10.28), asthma (28.0 % vs 5.2 %, aOR 3.19, 95%CI 3.09-3.29), pre-gestational hypertension (24.8 % vs 2.8 %, aOR 2.77, 95%CI 2.68-2.87), and polycystic ovary syndrome (5.6 % vs 0.7 %, aOR 2.58, 95%CI 2.42-2.74)." },
  "m3-07": { pmid: "29031756", doi: "10.1016/j.sleep.2017.06.035", firstAuthor: "Bourjeily", journal: "Sleep Med", year: 2017, studyType: "cohort",
    title: "Obstructive sleep apnea in pregnancy is associated with adverse maternal outcomes: a national cohort.",
    claim: "A national study of more than 1.5 million deliveries found that people with OSA had a higher risk of rare but serious heart problems, such as cardiomyopathy and heart failure.",
    reviewNote: "1,577,632 deliveries (2010 to 2014); OSA identified from delivery discharge codes, so undiagnosed OSA is missed.",
    supportingQuote: "OSA status was also associated with a 2.5-3.5-fold increase in risk of severe complications such as cardiomyopathy, congestive heart failure, and hysterectomy." },
  "m3-04": { pmid: "31792939", doi: "10.1002/14651858.CD003531.pub4", firstAuthor: "Kennedy", journal: "Cochrane Database Syst Rev", year: 2019, studyType: "systematic review and meta-analysis",
    title: "Pressure modification or humidification for improving usage of continuous positive airway pressure machines in adults with obstructive sleep apnoea.",
    claim: "The air pressure holds your airway open, a bit like a splint made of air.",
    reviewNote: "Same review as Module 1, Step 8. The supporting sentence is from the review background, and the splint comparison is plain-language wording, not the review's.",
    supportingQuote: "They deliver air pressure by a nasal or oronasal mask to prevent the airway from closing, reducing sleep disturbance and improving sleep quality." },
  "m4-06": { pmid: "37007771", doi: "10.3389/fmed.2023.1144170", firstAuthor: "Bisson", journal: "Front Med (Lausanne)", year: 2023, studyType: "narrative review",
    title: "Preeclampsia pathophysiology and adverse outcomes during pregnancy and postpartum.",
    claim: "In addition to the information mentioned in the video, it's important to note that preeclampsia puts you at risk for organ damage in addition to just the heart.",
    reviewNote: "Narrative review (the team-chosen paper). It supports only the sentence about organ damage beyond the heart.",
    supportingQuote: "Preeclampsia causes significant short- and long-term maternal morbidity and mortality, not only in the cardiovascular system but also in other organ systems throughout the body." },
  "m2-04": { pmid: "40423062", doi: "10.3390/jpm15050192", firstAuthor: "Rapelli", journal: "J Pers Med", year: 2025, studyType: "systematic review",
    title: "Three in a Bed: Can Partner Support Improve CPAP Adherence? A Systematic Review and Intervention Recommendations.",
    claim: "Studies show individuals with partners actually experience better CPAP adherence, meaning your partner can help keep you accountable!",
    supportingQuote: "Partner support, relationship quality, and collaborative efforts emerged as facilitators of adherence, with partnered individuals exhibiting higher adherence to CPAP use." },
  "m2-05": { pmid: "38084019", doi: "10.1111/jsr.14125", firstAuthor: "Laharnar", journal: "J Sleep Res", year: 2024, studyType: "cross-sectional survey",
    title: "Bed partner perception of CPAP therapy on relationship satisfaction and intimacy-A European perspective from the ESADA network.",
    claim: "CPAP has been shown to increase intimacy between couples! One study showed that 41% of bed partners reported increased relationship satisfaction (47% said no change), and 71% said that their sleep quality improved.",
    reviewNote: "Bed-partner survey. The numbers match the slide exactly, but the slide opener \"shown to increase intimacy\" goes further than the survey, which reports no negative effects on intimacy.",
    supportingQuote: "For 41% of bed partners, relationship satisfaction increased (no change for 47%)." },
  "m5-02": { pmid: "33571887", doi: "10.1016/j.smrv.2021.101436", firstAuthor: "Lu", journal: "Sleep Med Rev", year: 2021, studyType: "systematic review and meta-analysis",
    title: "Sleep disturbances during pregnancy and adverse maternal and fetal outcomes: A systematic review and meta-analysis.",
    claim: "Good sleep is also important during pregnancy as poor sleep is linked to poor outcomes in pregnancy.",
    supportingQuote: "Significant associations were found between sleep disturbances in pregnancy and a variety of maternal complications and adverse fetal outcomes." },
  "m5-05": { pmid: "25535358", doi: "10.1073/pnas.1418490112", firstAuthor: "Chang", journal: "Proc Natl Acad Sci U S A", year: 2015, studyType: "randomized trial",
    title: "Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness.",
    claim: "Blue lights (and bright lights in general) inhibit your body's production of the sleepy chemical (melatonin), which is great in the morning when you want to wake up, but is detrimental at night when you want to feel tired.",
    supportingQuote: "Participants reading an LE-eBook took longer to fall asleep and had reduced evening sleepiness, reduced melatonin secretion, later timing of their circadian clock, and reduced next-morning alertness than when reading a printed book." },
  "m5-06": { pmid: "33164742", doi: "10.5664/jcsm.8986", firstAuthor: "Edinger", journal: "J Clin Sleep Med", year: 2021, studyType: "guideline",
    title: "Behavioral and psychological treatments for chronic insomnia disorder in adults: an American Academy of Sleep Medicine clinical practice guideline.",
    claim: "This is called stimulus control, where you retrain your brain to associate your bedroom with sleep, and not work, stress, scrolling, or wakefulness. It's a well-proven tactic, especially among patients with insomnia.",
    reviewNote: "The AASM recommendation for stimulus control is CONDITIONAL, so the slide phrase \"well-proven\" is a little strong.",
    supportingQuote: "3. We suggest that clinicians use stimulus control as a single-component therapy for the treatment of chronic insomnia disorder in adults. (CONDITIONAL)." },
  "m5-20": { pmid: "31193832", doi: "10.1016/j.eclinm.2019.03.014", firstAuthor: "Cronin", journal: "EClinicalMedicine", year: 2019, studyType: "systematic review and meta-analysis",
    title: "An Individual Participant Data Meta-analysis of Maternal Going-to-Sleep Position, Interactions with Fetal Vulnerability, and the Risk of Late Stillbirth.",
    claim: "After 28 weeks, try to sleep on your side as much as possible.",
    supportingQuote: "This IPD meta-analysis confirms that supine going-to-sleep position is independently associated with late stillbirth." },
  "m5-21": { pmid: "34081551", doi: "10.1080/15402002.2021.1931221", firstAuthor: "Choong", journal: "Behav Sleep Med", year: 2022, studyType: "systematic review and meta-analysis",
    title: "Effectiveness of Exercise in Improving Sleep Outcomes among Perinatal Women: A Systematic Review and Meta-analysis of randomised Controlled Trials.",
    claim: "Regular exercise is an effective way to improve your sleep!",
    supportingQuote: "Exercise interventions produced significant effects on improving sleep among perinatal women." },
  "m6-04": { pmid: "41366751", doi: "10.1186/s12884-025-08569-x", firstAuthor: "Khurmatullina", journal: "BMC Pregnancy Childbirth", year: 2025, studyType: "systematic review and meta-analysis",
    title: "Global prevalence and risk of gastroesophageal reflux disease symptoms in pregnancy: a systematic review and meta-analysis.",
    claim: "This condition also often worsens later in pregnancy.",
    reviewNote: "Cited only for \"worsens later in pregnancy\". The slide range of 30 to 80% is not in this abstract (pooled prevalence 41%, 26% to 56% by trimester).",
    supportingQuote: "Subgroup analysis by trimester revealed a progressive increase in GERD prevalence, from 26.12% in the first trimester to 33.40% in the second, peaking at 55.93% in the third, reflecting the growing physiological burden." },
  "m6-05": { pmid: "31347796", doi: "10.4088/JCP.18r12527", firstAuthor: "Fawcett", journal: "J Clin Psychiatry", year: 2019, studyType: "systematic review and meta-analysis",
    title: "The Prevalence of Anxiety Disorders During Pregnancy and the Postpartum Period: A Multivariate Bayesian Meta-Analysis.",
    claim: "Symptoms of anxiety during pregnancy are very common, with studies reporting a prevalence of ~20% of pregnant women meeting the criteria for an anxiety disorder and with higher rates based on symptoms.",
    reviewNote: "The pooled 20.7% covers pregnancy and the postpartum period together.",
    supportingQuote: "Peripartum anxiety disorders are more prevalent than previously thought, with 1 in 5 women in a typical sample meeting diagnostic criteria for at least 1 disorder." },
  "m6-07": { pmid: "31909512", doi: "10.1111/apt.15610", firstAuthor: "Li", journal: "Aliment Pharmacol Ther", year: 2020, studyType: "systematic review and meta-analysis",
    title: "Systematic review with meta-analysis: the risks of proton pump inhibitors during pregnancy.",
    claim: "Large reviews of studies have not linked H2 blockers to birth defects, but results for proton pump inhibitors are mixed, so talk with your doctor about the benefits and risks before starting either kind of medicine.",
    reviewNote: "Supports both halves: no link for H2 blockers, and an association (odds ratio 1.28) for PPIs. A later meta-analysis (Peron 2023, PMID 37269915) found no significant increase for first-trimester PPI use, which is why the slide says the results are mixed.",
    supportingQuote: "No associations were found between H2RA and congenital malformations." },
  "m6-08": { pmid: "42343881", doi: "10.1192/bjp.2026.10694", firstAuthor: "Leng", journal: "Br J Psychiatry", year: 2026, studyType: "systematic review and meta-analysis",
    title: "Efficacy of psychological treatments for perinatal depression and anxiety: systematic review and network meta-analysis.",
    claim: "More notable treatments can include education, counseling, or Cognitive Behavioral Therapy (CBT).",
    supportingQuote: "This network meta-analysis identifies CBT as the most consistently supported psychological treatment for perinatal depression and anxiety." },
  "m7-03": { pmid: "37797413", doi: "10.1016/j.sleep.2023.08.023", firstAuthor: "Fietze", journal: "Sleep Med", year: 2023, studyType: "cross-sectional survey",
    title: "Nocturnal positive pressure ventilation improves relationship satisfaction of patients with OSA and their partners.",
    claim: "It is common to believe that CPAP may impact your partner negatively or that your partner may not like to see you that way, but studies show 90% of bed partners were happy with the treatment and 75% would recommend it to others",
    reviewNote: "Bed-partner survey; it is the source of the slide figures (\"over 90%\" and \"over 75%\").",
    supportingQuote: "The survey revealed bed partners' positive attitude towards their partner's CPAP therapy (over 90% of bed partners were happy with the therapy, over 75% would recommend the therapy)." },
  "m8-06": { pmid: "17580592", doi: "10.1093/sleep/30.6.711", firstAuthor: "Weaver", journal: "Sleep", year: 2007, studyType: "cohort",
    title: "Relationship between hours of CPAP use and achieving normal levels of sleepiness and daily functioning.",
    claim: "After you've practiced during the first part of the night, work toward using PAP the whole night.",
    supportingQuote: "Our analyses suggest that a greater percentage of patients will achieve normal functioning with longer nightly CPAP durations, but what constitutes adequate use varies between different outcomes." },
  "m8-07": { pmid: "30736887", doi: "10.5664/jcsm.7640", firstAuthor: "Patil", journal: "J Clin Sleep Med", year: 2019, studyType: "guideline",
    title: "Treatment of Adult Obstructive Sleep Apnea with Positive Airway Pressure: An American Academy of Sleep Medicine Clinical Practice Guideline.",
    claim: "Your PAP device also collects treatment and use data that your healthcare team can review.",
    supportingQuote: "(2) Adequate follow-up, including troubleshooting and monitoring of objective efficacy and usage data to ensure adequate treatment and adherence, should occur following PAP therapy initiation and during treatment of OSA." },
  "m9-06": { pmid: "19961025", firstAuthor: "Ryan", journal: "J Clin Sleep Med", year: 2009, studyType: "randomized trial",
    title: "Effects of heated humidification and topical steroids on compliance, nasal symptoms, and quality of life in patients with obstructive sleep apnea syndrome using nasal continuous positive airway pressure.",
    claim: "Nasal saline and PAP humidification may make you more comfortable, but too much humidity can cause extra moisture in the mask.",
    reviewNote: "Supports the humidification part only; the abstract does not address saline or condensation.",
    supportingQuote: "The addition of a humidifier, but not nasal steroids decreases the frequency of nasal symptoms in unselected OSAS patients initiating CPAP therapy; however compliance and quality of life remain unaltered." },
  "m9-09": { pmid: "39215936", doi: "10.1007/s11325-024-03152-8", firstAuthor: "Fukutome", journal: "Sleep Breath", year: 2024, studyType: "cohort",
    title: "Prevalence of continuous positive airway pressure-related aerophagia in obstructive sleep apnea: an observational study of 753 cases undergoing CPAP/BiPAP treatment in a sleep clinic - part one of a two-part series.",
    claim: "Burping or bloating may be a sign that you're swallowing air.",
    reviewNote: "Retrospective observational study, a weaker design. It defines PAP-related aerophagia (swallowed air) by burping and bloating.",
    supportingQuote: "Newly developed criteria (flatulence, eructation, and abdominal bloating, with quantitative evaluation of these symptoms and a clear timing of onset) were used to diagnose C-aerophagia." },
};

/** Slide statements that PubMed evidence contradicts or overstates. They are not cited; they need the content owner's decision. */
export const CITATION_CONFLICTS: { screenId: string; claim: string; pmids: string[]; issue: string }[] = [
  // The Module 2 birth-weight question (m3-q4) was listed here until the 2026-11-22 rework retired it.
];

export const pubmedUrl = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

/** "Kapur et al., J Clin Sleep Med, 2017". The same in every language. */
export const citationLabel = (citation: ScreenCitation) => `${citation.firstAuthor} et al., ${citation.journal}, ${citation.year}`;
