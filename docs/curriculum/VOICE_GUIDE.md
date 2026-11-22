# Voice guide for Claude-written lessons

Written 2026-11-22 for display Modules 9 (Getting Started with PAP) and 10 (Troubleshooting PAP), which Claude wrote. Modules 1 to 8 come from Eli's CIAS program and keep their own wording.

## Where the voice comes from

The model is Eli's own CIAS write-up of the same topics, in `docs/CIAS App_ EZ-PAP extracted.txt` (Section II, getting used to CPAP, and Section III, troubleshooting CPAP), plus the CIAS lesson text in `src/content/en/cias-source.ts`.

Rough counts from the bundled English text (sentence boundaries estimated by punctuation):

| Text | Words | About how many sentences | Exclamation points | "you" or "your" per 100 words |
| --- | --- | --- | --- | --- |
| CIAS lessons (`cias-source.ts`) | 6,013 | 294 | 36 (about 1 in 8 sentences) | 3.6 |
| Module 9 before this rewrite | 1,396 | 99 | 0 | 3.1 |
| Module 10 before this rewrite | 1,772 | 122 | 0 | 1.4 |

## What the CIAS voice does

- Talks to the learner as "you", and to the program as "we" ("we recommend", "Below, find our advice").
- Opens warmly and normalizes a hard start: "Congratulations on taking this important step...", "and that is ok!", "Don't be surprised if it takes awhile...", "It's normal for people to take some time to adjust".
- Uses contractions (it's, don't, you'll).
- Uses an exclamation point for encouragement, about one in eight sentences, never on a warning.
- Gives concrete, everyday examples: "while reading a book, or watching TV".
- Defines terms in plain words in parentheses: "(windpipe)", "(nasal congestion)".
- Puts options and steps in bullet lists.
- Sends the learner to a person: "Talk to your healthcare provider", "Reach out to the healthcare provider who prescribed your machine".

## Rules for Claude-written text

1. Address the learner as "you". Never "a PAP user" or "a person".
2. Any list of three or more things goes in a bullet list (a paragraph whose lines start with "•").
3. Contractions are fine. Keep paragraphs to one to three sentences.
4. Use an exclamation point only to encourage, at most about one per screen, and never with safety or pressure warnings.
5. Keep every clinical anchor from the version being rewritten: hedges ("may", "can", "some"), numbers, "don't change your prescribed pressure on your own", and every safety instruction.
6. Do not bring back CIAS advice that the app removed on purpose (brand names, mouth tape, petroleum creams, vinegar soaks) without a clinical decision.
7. Check-your-understanding questions in these modules: three per module, one at the end of each third, never at the start. Select all that apply, five options, two correct. Every option gets its own one-sentence explanation. Correct options are about as long as the wrong ones, and wrong options are plausible mistakes, not extreme ones.
8. Apply the `humanizer` and `sleep-app-content-quality` skills, and update Spanish (usted), Brazilian Portuguese, and Haitian Creole in the same change.
