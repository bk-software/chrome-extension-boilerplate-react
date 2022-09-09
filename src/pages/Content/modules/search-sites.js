export const searchSites = {
  ludwig: {
    name: 'Ludwig',
    url: (text) => `https://ludwig.guru/s/${text}`,
  },
  sentenceStack: {
    name: 'Sentence Stack',
    url: (text) => `https://sentencestack.com/q/${text}`,
  },
  googletranslateHeb: {
    name: 'Goolge trans Heb',
    url: (text) =>
      `https://translate.google.com/?sl=auto&tl=iw&text=${text}&op=translate`,
  },
  googletranslateEng: {
    name: 'Goolge trans Eng',
    url: (text) =>
      `https://translate.google.com/?sl=auto&tl=en&text=${text}&op=translate`,
  },
  zetatext: {
    name: 'Zeta Text',
    url: (text) => `http://zetatext.com/s/se/${text}`,
  },
};
