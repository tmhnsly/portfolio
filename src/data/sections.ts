import type { Discipline } from '@/types';
import { toolsByDiscipline } from './tools';

export const SECTIONS: Record<Discipline, { intro: string; tools: string[] }> = {
  code: {
    intro: 'Production frontend, generative builds and the occasional creative experiment. Things I make on the web.',
    tools: toolsByDiscipline.code,
  },
  music: {
    intro: 'Ambient recordings, tape experiments and the occasional synthesiser piece.',
    tools: toolsByDiscipline.music,
  },
  sound: {
    intro: 'Field recordings, SFX libraries, and sound for screen.',
    tools: toolsByDiscipline.sound,
  },
  photo: {
    intro: 'Mostly 35mm. Mostly not trying too hard.',
    tools: toolsByDiscipline.photo,
  },
  video: {
    intro: 'Short films, experiments and things that needed to move.',
    tools: toolsByDiscipline.video,
  },
  blog: {
    intro: 'Notes, essays and dev logs. Mostly about whatever I\'m currently chewing on — usually code, sometimes sound, occasionally a book.',
    tools: toolsByDiscipline.blog,
  },
};
