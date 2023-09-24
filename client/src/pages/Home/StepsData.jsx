import CONSTANTS from '../../constants';
import styles from './Home.module.sass';

export const stepsData = [
  {
    containerStyle: styles.whiteContainer,
    stepStyle: styles.stepReverse,
    imageSrc: `${CONSTANTS.STATIC_IMAGES_PATH}gif/1-compressed.gif`,
    title: 'Step 1: Launch a Naming Contest',
    textStyle: '',
    points: [
      'Start your project right with our proven Naming Brief template',
      'We’ll walk you through exactly what you need to share about your project in order to get an awesome Name',
    ],
  },
  {
    containerStyle: styles.greenContainer,
    stepStyle: styles.step,
    imageSrc: `${CONSTANTS.STATIC_IMAGES_PATH}gif/2-compressed-new.gif`,
    title: 'Step 2: Ideas start pouring in within minutes',
    textStyle: styles.greenStep,
    points: [
      '100s of naming experts start submitting name ideas',
      'Names automatically checked for URL availability',
    ],
  },
  {
    containerStyle: styles.greyContainer,
    stepStyle: styles.stepReverse,
    imageSrc: `${CONSTANTS.STATIC_IMAGES_PATH}gif/3-compressed.gif`,
    title: 'Step 3: Rate Entries & Brainstorm with Creatives',
    textStyle: '',
    points: [
      'Provide instant feedback on Names',
      'Send private feedback or public messages to all creatives',
      'The more entries you rate - the submissions get better and better',
    ],
  },
];
