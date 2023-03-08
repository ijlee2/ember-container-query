export type Product = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  rating: number;
  seller: string;
  shortDescription: string;
};

const products: Product[] = [
  {
    description: 'Made with organic herbs',
    id: '1',
    imageUrl:
      'https://images.pexels.com/photos/414645/pexels-photo-414645.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Vanilla Ice Cream Cake',
    price: 40,
    rating: 4.5,
    seller: "Amy's",
    shortDescription: 'Made with organic herbs',
  },
  {
    description: 'Decorate your laptop with Tomster and Zoey!',
    id: '2',
    imageUrl:
      'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Ember.js Stickers',
    price: 8,
    rating: 5,
    seller: 'Ember',
    shortDescription: 'Decorate your laptop with Tomster and Zoey!',
  },
  {
    description: 'A chocolate sponge cake with a rich cherry filling',
    id: '3',
    imageUrl:
      'https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Black Forest Cake',
    price: 70,
    rating: 5,
    seller: 'The local Konditorei',
    shortDescription: 'A chocolate sponge cake with a rich cherry filling',
  },
  {
    description:
      'Tempore culpa repellat voluptatum blanditiis recusandae voluptatum similique sint aliquid. Saepe enim pariatur eaque eaque reprehenderit voluptates. Iure voluptate sequi harum. Voluptate asperiores placeat itaque nemo molestiae ducimus provident. Repellendus vel eius nihil minus similique quam nobis iste assumenda.',
    id: '4',
    imageUrl:
      'https://images.pexels.com/photos/1857730/pexels-photo-1857730.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Frozen Sausages',
    price: 9,
    rating: 1,
    seller: 'Jakubowski, Purdy and Macejkovic',
    shortDescription: 'Visionary executive local area network',
  },
  {
    description:
      'Minus explicabo expedita voluptas inventore dicta dignissimos earum. Architecto voluptatibus omnis doloremque autem. Maxime sunt laudantium sit totam. Incidunt consequatur totam animi consectetur. Tenetur velit nihil quas officia maiores modi. Soluta a culpa fuga animi nam recusandae assumenda quas laudantium.',
    id: '5',
    imageUrl:
      'https://images.pexels.com/photos/1450114/pexels-photo-1450114.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Steel Pants',
    price: 78,
    rating: 2,
    seller: 'Hilpert, Schamberger and Emard',
    shortDescription: 'Seamless fault-tolerant synergy',
  },
  {
    description:
      'Dicta dolorum ea est accusamus accusamus et dolorum repellat. Sed rem pariatur pariatur animi assumenda deserunt. Laborum aspernatur optio quo aliquam.',
    id: '6',
    imageUrl:
      'https://images.pexels.com/photos/696407/pexels-photo-696407.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Wooden Chair',
    price: 30,
    rating: 4,
    seller: 'Larson, Hermann and Wehner',
    shortDescription: 'Customizable zero administration challenge',
  },
  {
    description:
      'Magni natus qui facere. Numquam illum voluptate. Voluptates provident inventore expedita veritatis. Itaque quae perspiciatis aliquid. Quas consequatur facere quia reprehenderit eos vel.',
    id: '7',
    imageUrl:
      'https://images.pexels.com/photos/1233101/pexels-photo-1233101.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Frozen Sausages',
    price: 66,
    rating: 3.5,
    seller: 'Shanahan LLC',
    shortDescription: 'Fully-configurable client-driven neural-net',
  },
  {
    description:
      'Quae ipsum ducimus atque distinctio similique voluptatum sequi ea. Officiis adipisci fugiat possimus. Tenetur eligendi voluptatem nulla magnam itaque fugiat enim laudantium voluptate. Voluptatem eaque nostrum quibusdam at. Cum itaque ipsa assumenda reprehenderit dolor animi inventore rem. Reprehenderit nesciunt non itaque labore accusamus maxime.',
    id: '8',
    imageUrl:
      'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Soft Pants',
    price: 19,
    rating: 2,
    seller: 'Goldner - Grant',
    shortDescription: 'Total responsive attitude',
  },
  {
    description:
      'Reprehenderit eos esse pariatur soluta tempore tempora. Rem consequuntur excepturi officiis mollitia eos sint dolor nisi tempore. Culpa maxime nihil odit. Aliquam sapiente illum quos magnam odio aliquid provident illo sint.',
    id: '9',
    imageUrl:
      'https://images.pexels.com/photos/1857730/pexels-photo-1857730.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Concrete Sausages',
    price: 15,
    rating: 4,
    seller: 'Tremblay, Kulas and Considine',
    shortDescription: 'Intuitive reciprocal solution',
  },
  {
    description:
      'Ipsa minima consectetur reprehenderit labore qui earum numquam praesentium. Consectetur corporis expedita similique nobis. Numquam ipsa officiis consequatur itaque. Maxime modi vero nam aut optio aut.',
    id: '10',
    imageUrl:
      'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Frozen Pants',
    price: 60,
    rating: 3.5,
    seller: 'Roob, Murray and Bergnaum',
    shortDescription: 'Monitored eco-centric installation',
  },
  {
    description:
      'Aliquam explicabo fugiat quidem libero tenetur nobis aliquid voluptas. Modi ab ipsa quisquam numquam rem molestiae. Molestiae pariatur unde perferendis fugit itaque temporibus quo ducimus. Natus cum quibusdam harum in perspiciatis perspiciatis. Magni quis quaerat reprehenderit facere.',
    id: '11',
    imageUrl:
      'https://images.pexels.com/photos/2736220/pexels-photo-2736220.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Rubber Soap',
    price: 58,
    rating: 4,
    seller: 'Ullrich - Paucek',
    shortDescription: 'Vision-oriented encompassing encoding',
  },
  {
    description:
      'Dolores perspiciatis enim. Eligendi dolores dolorum ratione quasi quae quas commodi incidunt. Dolore assumenda impedit optio quam explicabo. Laudantium accusamus asperiores assumenda excepturi at non iure consequatur repudiandae. Id vitae quo. Illo architecto dolores quisquam quia labore magni optio nulla est.',
    id: '12',
    imageUrl:
      'https://images.pexels.com/photos/3609985/pexels-photo-3609985.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Bronze Towel',
    price: 31,
    rating: 2.5,
    seller: 'Schaden and Sons',
    shortDescription: 'Reactive scalable circuit',
  },
  {
    description:
      'Odit provident earum eum tenetur ab perspiciatis minima quia impedit. Eos debitis qui atque officiis accusamus ullam maiores dolor. Aperiam eligendi deserunt tempora. Provident odit debitis voluptas provident sit. Magni quia quas voluptas voluptas aut officiis cum aliquid.',
    id: '13',
    imageUrl:
      'https://images.pexels.com/photos/1790965/pexels-photo-1790965.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Rubber Mug',
    price: 61,
    rating: 5,
    seller: 'Murray LLC',
    shortDescription: 'Universal zero defect conglomeration',
  },
  {
    description:
      'Sapiente voluptates tempore quia nam sed iste blanditiis. Non quam modi veniam nemo doloribus rem est. Suscipit qui quibusdam. Temporibus reiciendis alias dolorem nemo odio blanditiis deleniti. Porro suscipit nam labore reprehenderit quidem. Sed aperiam hic tenetur quidem.',
    id: '14',
    imageUrl:
      'https://images.pexels.com/photos/1440391/pexels-photo-1440391.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Cotton Pasta',
    price: 80,
    rating: 1.5,
    seller: 'Kihn Group',
    shortDescription: 'Triple-buffered system-worthy emulation',
  },
  {
    description:
      'Dolore necessitatibus dolor voluptates quidem. Maiores aspernatur eius possimus odio recusandae et asperiores. Dolorum explicabo inventore placeat consequatur repudiandae est quidem adipisci qui. Nihil laboriosam laborum ratione dolore minus. Ipsum doloremque quaerat dolore. Sequi hic quod.',
    id: '15',
    imageUrl:
      'https://images.pexels.com/photos/63448/pexels-photo-63448.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Cotton Gloves',
    price: 73,
    rating: 4,
    seller: 'Gutkowski LLC',
    shortDescription: 'Focused neutral product',
  },
  {
    description: 'Odit laborum a. Alias molestias quia quasi ratione enim.',
    id: '16',
    imageUrl:
      'https://images.pexels.com/photos/280453/pexels-photo-280453.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Cotton Pizza',
    price: 55,
    rating: 1.5,
    seller: 'Durgan, Kuhlman and Berge',
    shortDescription: 'Devolved asymmetric frame',
  },
  {
    description:
      'Voluptatum commodi magnam corporis id laboriosam necessitatibus dicta explicabo. Ut magnam expedita suscipit ea. Autem maxime nobis minus tenetur impedit labore officia. Amet qui blanditiis quod est at doloribus. Possimus earum odit debitis totam veniam neque amet. Molestiae error vel vel ipsum.',
    id: '17',
    imageUrl:
      'https://images.pexels.com/photos/116148/pexels-photo-116148.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Soft Chair',
    price: 64,
    rating: 2,
    seller: 'Von, Metz and Padberg',
    shortDescription: 'Switchable scalable time-frame',
  },
  {
    description:
      'Corrupti labore at labore cumque odio. Quos mollitia id aliquid hic esse expedita odit iste. Officia reprehenderit dolores. Amet itaque velit quae voluptatum.',
    id: '18',
    imageUrl:
      'https://images.pexels.com/photos/663455/pexels-photo-663455.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Concrete Pants',
    price: 76,
    rating: 4.5,
    seller: 'Mraz, Kohler and Schneider',
    shortDescription: 'Innovative uniform monitoring',
  },
  {
    description:
      'Ipsum veniam aliquam. Reiciendis temporibus unde repellat tempora quod deleniti necessitatibus quos. Eaque quas sint perspiciatis vel impedit dolore.',
    id: '19',
    imageUrl:
      'https://images.pexels.com/photos/357576/pexels-photo-357576.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Soft Sausages',
    price: 36,
    rating: 3.5,
    seller: 'Stamm, Leannon and Pouros',
    shortDescription: 'Integrated intangible superstructure',
  },
  {
    description:
      'Totam amet vel ex ullam iste sint hic exercitationem. Perspiciatis eos commodi quia impedit quam recusandae laborum vitae nulla. Debitis quae non ea accusamus harum fuga tempore facilis recusandae. Voluptates ex perspiciatis fugiat sint nemo deleniti incidunt rerum architecto.',
    id: '20',
    imageUrl:
      'https://images.pexels.com/photos/128408/pexels-photo-128408.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Cotton Pasta',
    price: 97,
    rating: 2.5,
    seller: 'Hammes - Renner',
    shortDescription: 'Stand-alone full-range toolset',
  },
  {
    description:
      'Earum veritatis autem similique amet. Numquam asperiores corporis sapiente quis repellat reiciendis aut ipsa. Labore natus nobis. Eos laboriosam iure praesentium occaecati quisquam exercitationem. Consequuntur repudiandae exercitationem voluptas excepturi voluptatum vitae earum quia odit.',
    id: '21',
    imageUrl:
      'https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Soft Shoes',
    price: 63,
    rating: 1.5,
    seller: 'Tromp Inc',
    shortDescription: 'Profound 4th generation project',
  },
  {
    description:
      'Dolore exercitationem error dicta quos fuga excepturi et. Libero quis voluptate dolorem blanditiis accusamus porro quisquam dolorum perspiciatis. Ea repellendus saepe quia ipsam esse odio.',
    id: '22',
    imageUrl:
      'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Soft Pants',
    price: 16,
    rating: 2.5,
    seller: 'Daugherty and Sons',
    shortDescription: 'Organized fresh-thinking data-warehouse',
  },
  {
    description:
      'Voluptatibus tempora officia debitis ducimus cumque. Nisi voluptate veritatis nam harum. Error voluptate nulla cumque culpa ullam expedita hic.',
    id: '23',
    imageUrl:
      'https://images.pexels.com/photos/230128/pexels-photo-230128.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Wooden Towel',
    price: 47,
    rating: 2,
    seller: 'Cummerata Group',
    shortDescription: 'Operative transitional methodology',
  },
  {
    description:
      'Fugiat vero distinctio porro animi doloremque tenetur esse maiores. Quisquam illo eum facere adipisci doloremque quidem pariatur. Modi maxime nisi fugiat cum et. Consequatur accusantium doloribus quod numquam explicabo libero eos totam. Fuga suscipit laudantium.',
    id: '24',
    imageUrl:
      'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Bronze Cake',
    price: 97,
    rating: 4.5,
    seller: 'Littel, King and Bogan',
    shortDescription: 'Managed didactic access',
  },
  {
    description:
      'Nisi dolorum sit voluptatum veritatis error consequatur. Minima dicta quo dolores omnis rerum dolore voluptatem accusantium officiis.',
    id: '25',
    imageUrl:
      'https://images.pexels.com/photos/910625/pexels-photo-910625.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Fresh Chair',
    price: 69,
    rating: 3.5,
    seller: 'Hettinger Inc',
    shortDescription: 'Horizontal bandwidth-monitored parallelism',
  },
  {
    description:
      'Mollitia est non mollitia doloribus a. Error incidunt tempora modi exercitationem. Distinctio eaque beatae at exercitationem vitae assumenda. Reiciendis impedit voluptas non officia nemo. Tenetur quos libero vero explicabo laborum optio.',
    id: '26',
    imageUrl:
      'https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Rubber Pasta',
    price: 22,
    rating: 1.5,
    seller: 'Durgan and Sons',
    shortDescription: 'Total attitude-oriented moderator',
  },
  {
    description: 'Neque voluptates asperiores aliquid. Odit alias id.',
    id: '27',
    imageUrl:
      'https://images.pexels.com/photos/1306248/pexels-photo-1306248.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Plastic Shoes',
    price: 76,
    rating: 2,
    seller: 'Hackett Group',
    shortDescription: 'Grass-roots static orchestration',
  },
  {
    description:
      'Tenetur maxime aliquid beatae sequi. Aspernatur sapiente aut alias corporis officia.',
    id: '28',
    imageUrl:
      'https://images.pexels.com/photos/744365/pexels-photo-744365.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Soft Hat',
    price: 18,
    rating: 5,
    seller: 'White Inc',
    shortDescription: 'Mandatory eco-centric structure',
  },
  {
    description:
      'Reprehenderit alias accusantium voluptate iure illum sequi. Nam consectetur at autem quaerat ea totam aspernatur possimus fugit. Debitis dolorem non vero quasi. Cupiditate optio facere mollitia earum eveniet laboriosam libero doloremque quod.',
    id: '29',
    imageUrl:
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Soft Shoes',
    price: 17,
    rating: 3,
    seller: 'Koch, Ebert and Corkery',
    shortDescription: 'Up-sized secondary archive',
  },
  {
    description:
      'Sint minus aliquid tenetur vitae sit soluta. Ab ea ex ratione amet aliquid deleniti est. Repudiandae deleniti officiis et repellat mollitia nihil facilis provident. Nemo debitis dignissimos quaerat. Totam placeat officiis occaecati voluptatum ad adipisci ab.',
    id: '30',
    imageUrl:
      'https://images.pexels.com/photos/242149/pexels-photo-242149.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Steel Hat',
    price: 35,
    rating: 4,
    seller: 'Daniel and Sons',
    shortDescription: 'Open-source 4th generation leverage',
  },
  {
    description:
      'Fuga libero sed quidem repellat dolores. Est eaque distinctio laborum ad sit. Pariatur tenetur dolorem cumque repellendus cupiditate sed ut quae. Tempora accusantium cumque ipsam dolores provident inventore doloribus molestias. Alias dolor deleniti nemo repudiandae corrupti omnis perspiciatis at.',
    id: '31',
    imageUrl:
      'https://images.pexels.com/photos/1441024/pexels-photo-1441024.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Granite Balloon',
    price: 27,
    rating: 2.5,
    seller: 'Bruen - Spinka',
    shortDescription: 'Realigned bifurcated Graphical User Interface',
  },
  {
    description:
      'Iusto nobis natus illum ipsum provident quis. Officia dolor autem ipsum assumenda. Asperiores qui error. Dolorem animi nisi animi voluptate amet. A corporis ea.',
    id: '32',
    imageUrl:
      'https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Fresh Gloves',
    price: 6,
    rating: 5,
    seller: 'Boehm, Bosco and Cole',
    shortDescription: 'Centralized logistical matrix',
  },
  {
    description:
      'Explicabo omnis ad error commodi. Vel atque harum illum porro suscipit. Sequi praesentium cumque accusamus dolorum deserunt suscipit totam debitis assumenda. Ad aspernatur deserunt alias nesciunt saepe provident dignissimos commodi. Excepturi reprehenderit vel minus.',
    id: '33',
    imageUrl:
      'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
    name: 'Wooden Shoes',
    price: 77,
    rating: 5,
    seller: 'Feil - Harvey',
    shortDescription: 'Phased clear-thinking projection',
  },
];

export default products;
