export type Track = {
  isExplicit: boolean;
  length: string;
  name: string;
};

export type Album = {
  band: {
    name: string;
  };
  name: string;
  publicationDate: string;
  totalLengthInMinutes: number;
  tracks: Array<Track>;
};

const album: Album = {
  name: 'How to Be a Human Being',
  publicationDate: '2016',
  totalLengthInMinutes: 43,
  band: {
    name: 'Glass Animals',
  },
  tracks: [
    {
      name: 'Life Itself',
      length: '4:41',
      isExplicit: false,
    },
    {
      name: 'Youth',
      length: '3:51',
      isExplicit: false,
    },
    {
      name: 'Season 2 Episode 3',
      length: '4:04',
      isExplicit: false,
    },
    {
      name: 'Pork Soda',
      length: '4:14',
      isExplicit: true,
    },
    {
      name: "Mama's Gun",
      length: '4:27',
      isExplicit: false,
    },
    {
      name: 'Cane Shuga',
      length: '3:17',
      isExplicit: false,
    },
    {
      name: '[Premade Sandwiches]',
      length: '0:36',
      isExplicit: true,
    },
    {
      name: 'The Other Side of Paradise',
      length: '5:21',
      isExplicit: true,
    },
    {
      name: 'Take a Slice',
      length: '3:50',
      isExplicit: true,
    },
    {
      name: 'Poplar St',
      length: '4:23',
      isExplicit: false,
    },
    {
      name: 'Agnes',
      length: '4:32',
      isExplicit: true,
    },
  ],
};

export default album;
