export type Image = {
  metadata: {
    height: number;
    width: number;
  };
  url: string;
};

export type Concert = {
  date: string;
  images: Array<Image>;
  location: {
    city: string;
    state: string;
  };
  name: string;
};

const concert: Concert = {
  name: 'ACL Live',
  date: 'Jun 01',
  location: {
    city: 'Austin',
    state: 'TX',
  },
  images: [
    {
      url: '/images/widgets/widget-3/venue-extra-wide@1x.jpg',
      metadata: {
        height: 150,
        width: 540,
      },
    },
    {
      url: '/images/widgets/widget-3/venue-extra-wide@2x.jpg',
      metadata: {
        height: 300,
        width: 1080,
      },
    },
    {
      url: '/images/widgets/widget-3/venue-extra-wide@4x.jpg',
      metadata: {
        height: 600,
        width: 2160,
      },
    },
    {
      url: '/images/widgets/widget-3/venue-square@1x.jpg',
      metadata: {
        height: 150,
        width: 150,
      },
    },
    {
      url: '/images/widgets/widget-3/venue-square@2x.jpg',
      metadata: {
        height: 300,
        width: 300,
      },
    },
    {
      url: '/images/widgets/widget-3/venue-square@4x.jpg',
      metadata: {
        height: 600,
        width: 600,
      },
    },
    {
      url: '/images/widgets/widget-3/venue-wide@1x.jpg',
      metadata: {
        height: 150,
        width: 300,
      },
    },
    {
      url: '/images/widgets/widget-3/venue-wide@2x.jpg',
      metadata: {
        height: 300,
        width: 600,
      },
    },
    {
      url: '/images/widgets/widget-3/venue-wide@4x.jpg',
      metadata: {
        height: 600,
        width: 1200,
      },
    },
  ],
};

export default concert;
