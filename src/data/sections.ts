import type { Discipline } from '@/types';
import { toolsByDiscipline } from './tools';

/** `cta` = the themed "get in touch" block at the bottom of each discipline page
    (the `[discipline]` route — blog has its own page, so its cta is unused).
    Edit heading/note/subject freely; the accent themes itself to the zone. */
interface Section {
  intro: string;
  tools: string[];
  cta?: { heading: string; note?: string; subject?: string };
}

export const SECTIONS: Record<Discipline, Section> = {
  code: {
    intro: 'Production frontend for agencies, publishers and product teams — plus the things I build for myself. Responsive, accessible, shipped.',
    tools: toolsByDiscipline.code,
    cta: { heading: 'Got something to build?', note: 'Frontend, end to end.', subject: 'Project enquiry — Code' },
  },
  music: {
    intro: 'Ambient recordings, tape experiments and the occasional synthesiser piece.',
    tools: toolsByDiscipline.music,
    cta: { heading: 'Need a track or a score?', note: 'Ambient to arrangement.', subject: 'Project enquiry — Music' },
  },
  sound: {
    intro: 'Field recordings, SFX libraries, and sound for screen.',
    tools: toolsByDiscipline.sound,
    cta: { heading: 'Need sound for your screen?', note: 'Design, edit, mix.', subject: 'Project enquiry — Sound' },
  },
  photo: {
    intro: 'Mostly 35mm. Mostly not trying too hard.',
    tools: toolsByDiscipline.photo,
    cta: { heading: 'Need someone behind the lens?', note: 'Film or digital.', subject: 'Project enquiry — Photo' },
  },
  video: {
    intro: 'Short films, experiments and things that needed to move.',
    tools: toolsByDiscipline.video,
    cta: { heading: 'Got something that needs to move?', note: 'Concept to final cut.', subject: 'Project enquiry — Video' },
  },
  blog: {
    intro: 'Notes, essays and dev logs. Mostly about whatever I\'m currently chewing on — usually code, sometimes sound, occasionally a book.',
    tools: toolsByDiscipline.blog,
  },
};
