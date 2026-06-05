import type { Discipline } from '@/types';

/** `cta` = the themed "get in touch" block at the bottom of each discipline page. */
interface Section {
  intro: string;
  cta?: { heading: string; note?: string; subject?: string };
}

export const SECTIONS: Record<Discipline, Section> = {
  code: {
    intro: 'Production frontend for agencies, publishers and product teams, plus the things I build for myself. Responsive, accessible, shipped.',
    cta: { heading: 'Freelance web development.', note: 'Open to new projects.', subject: 'Project enquiry: Code' },
  },
  audio: {
    intro: 'Scores and sound design: the audio under the film work, plus a few pieces that stand on their own.',
    cta: { heading: 'Scores and sound design.', note: 'Open to commissions.', subject: 'Project enquiry: Audio' },
  },
  video: {
    intro: 'Short films, music videos and documentary pieces, mostly self-shot and edited.',
    cta: { heading: 'Films, shot and edited.', note: 'Open to projects.', subject: 'Project enquiry: Video' },
  },
  blog: {
    intro: 'Notes, essays and dev logs, mostly about whatever I\'m chewing on: usually code, sometimes sound, occasionally a book.',
  },
};
