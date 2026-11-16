import { Redirect, type Href } from 'expo-router';
import React from 'react';

// Development-only route. In a production build __DEV__ is false, the review screen and its text are not
// required, and the route redirects to Home. It is not linked from any learner screen.
function Hidden() { return <Redirect href={'/' as Href} />; }

export default __DEV__
  // A lazy require keeps the review screen and its text out of production bundles (verified with expo export).
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ? (require('@/src/qa/CurriculumReviewScreen') as typeof import('@/src/qa/CurriculumReviewScreen')).CurriculumReviewScreen
  : Hidden;
