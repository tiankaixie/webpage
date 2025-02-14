import React, { useState } from 'react'
import AlbumList from './AlbumList'
import AlbumDisplay from './AlbumDisplay'

export default function MusicGallery({ albums }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  return (
    <div
      style={{
        height: 'calc(100vh - 128px)',
        position: 'fixed',
        left: 0,
        right: 0,
        top: '64px',
        backgroundColor: 'var(--c-bg)',
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
      }}
    >
      <div
        style={{
          height: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '28px',
          display: 'flex',
          gap: '12px',
        }}
      >
        <div
          className="border-1 border-gray-200 dark:border-gray-800"
          style={{
            width: '100%',
            display: 'flex',
            gap: '12px',
            padding: '12px',
            backgroundColor: 'transparent',
          }}
        >
          <AlbumList
            albums={albums}
            selectedAlbum={selectedAlbum}
            onSelectAlbum={setSelectedAlbum}
          />
          <AlbumDisplay album={selectedAlbum} />
        </div>
      </div>
    </div>
  )
}
