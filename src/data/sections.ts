import type { Discipline } from '@/types';

/** `cta` = the themed "get in touch" block at the bottom of each discipline page. */
interface Section {
  intro: string;
  cta?: { heading: string; note?: string; subject?: string };
}

export const SECTIONS: Record<Discipline, Section> = {
  code: {
    intro: 'Production frontend for agencies, publishers and product teams, plus the things I build for myself. Responsive, accessible, shipped.',
    cta: { heading: 'Got something to build?', note: 'Frontend, end to end.', subject: 'Project enquiry: Code' },
  },
  music: {
    intro: 'Original scores and music, written and recorded at home. Mostly for film.',
    cta: { heading: 'Need a track or a score?', note: 'Written and recorded.', subject: 'Project enquiry: Music' },
  },
  sound: {
    intro: 'A Sound Design degree, and the audio underneath the film and music work.',
    cta: { heading: 'Need sound for your screen?', note: 'Design, edit, mix.', subject: 'Project enquiry: Sound' },
  },
  photo: {
    intro: 'Mostly 35mm. Mostly not trying too hard.',
    cta: { heading: 'Need someone behind the lens?', note: 'Film or digital.', subject: 'Project enquiry: Photo' },
  },
  video: {
    intro: 'Short films, music videos and documentary pieces, mostly self-shot and edited.',
    cta: { heading: 'Got something that needs to move?', note: 'Concept to final cut.', subject: 'Project enquiry: Video' },
  },
  blog: {
    intro: 'Notes, essays and dev logs, mostly about whatever I\'m chewing on: usually code, sometimes sound, occasionally a book.',
  },
};
