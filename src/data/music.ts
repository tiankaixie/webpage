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
]
