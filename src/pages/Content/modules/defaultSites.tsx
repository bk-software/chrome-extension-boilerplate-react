export type SearchEngine = {
  name: string;
  searchString: string;
};

const defaultSites: Array<SearchEngine> = [
  {
    name: 'Ludwig',
    searchString: 'https://ludwig.guru/s/@@@',
  },
  {
    name: 'Sentence Stack',
    searchString: 'https://sentencestack.com/q/@@@',
  },
  {
    name: 'Goolge trans Heb',
    searchString:
      'https://translate.google.com/?sl=auto&tl=iw&text=@@@&op=translate',
  },
  {
    name: 'Goolge trans Eng',
    searchString:
      'https://translate.google.com/?sl=auto&tl=en&text=@@@&op=translate',
  },
  {
    name: 'Your Dictionary',
    searchString: 'https://sentence.yourdictionary.com/@@@',
  },
];

export default defaultSites;
