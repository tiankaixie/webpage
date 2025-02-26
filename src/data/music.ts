export interface Album {
  id: string
  songTitle: string // The title of the song
  albumName: string // The name of the album
  artist: string
  year: number
  month: number // 1-12 representing months
  imageUrl: string
  description: string
}

export const albums: Album[] = [
  {
    id: '1',
    songTitle: 'And The Winner Is',
    albumName: 'Free Soul',
    artist: 'Ronghao Li',
    year: 2025,
    month: 2,
    imageUrl: '/albums/freesouls.jpg',
    description: 'No reason, just can not stop looping.',
  },
  {
    id: '2',
    songTitle: 'Eclipse',
    albumName: 'Underwater Pipe Dreams',
    artist: 'Inner Wave',
    year: 2025,
    month: 2,
    imageUrl: '/albums/eclipse.jpg',
    description: 'Dreamers never sleep.',
  },
  {
    id: '3',
    songTitle: 'Tioga Pass',
    albumName: 'Black Classical Music',
    artist: 'Yussef Dayes',
    year: 2025,
    month: 2,
    imageUrl: '/albums/tiogapass.jpg',
    description: 'The best classical music.',
  },
  {
    id: '4',
    songTitle: "Let's Get it Right",
    albumName: 'Profound Mysteries II',
    artist: 'Royksopp',
    year: 2025,
    month: 2,
    imageUrl: '/albums/letsgetitright.jpg',
    description: 'You need to get it right, as always.',
  },
  {
    id: '5',
    songTitle: 'Mexico',
    albumName: 'Speakerzoid',
    artist: 'The Jungle Giants',
    year: 2025,
    month: 2,
    imageUrl: '/albums/mexico.jpg',
    description: 'My wife went to Mexico for a month, and I miss her.',
  },
]
