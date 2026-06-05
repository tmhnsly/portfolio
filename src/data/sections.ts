import type { Discipline } from '@/types';

/** `cta` = the themed "get in touch" block at the bottom of each discipline page. */
interface Section {
  intro: string;
  cta?: { heading: string; note?: string; subject?: string };
}

export const SECTIONS: Record<Discipline, Section> = {
  code: {
    intro: 'Production frontend for agencies, publishers and product teams, plus the things I build for myself. Responsive, accessible, shipped.',
    cta: { heading: 'Got a frontend to build?', note: 'From design to shipped.', subject: 'Project enquiry: Code' },
  },
  audio: {
    intro: 'Scores and sound design: the audio under the film work, plus a few pieces that stand on their own.',
    cta: { heading: 'Need sound for the screen?', note: 'Score, design, mix.', subject: 'Project enquiry: Audio' },
  },
  video: {
    intro: 'Short films, music videos and documentary pieces, mostly self-shot and edited.',
    cta: { heading: 'Got something to film?', note: 'Concept to final cut.', subject: 'Project enquiry: Video' },
  },
  blog: {
    intro: 'Notes, essays and dev logs, mostly about whatever I\'m chewing on: usually code, sometimes sound, occasionally a book.',
  },
};
