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
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          height: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: window.innerWidth >= 768 ? '28px' : '12px',
          display: 'flex',
          gap: '12px',
        }}
      >
        <div
          className="border-1 border-gray-200 dark:border-gray-800"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: window.innerWidth >= 768 ? 'row' : 'column',
            gap: '12px',
            padding: '12px',
            backgroundColor: 'transparent',
            height: window.innerWidth >= 768 ? '100%' : 'auto',
          }}
        >
          <AlbumList
            albums={albums}
            selectedAlbum={selectedAlbum}
            onSelectAlbum={setSelectedAlbum}
            isMobile={window.innerWidth < 768}
          />
          <AlbumDisplay
            album={selectedAlbum}
            isMobile={window.innerWidth < 768}
          />
        </div>
      </div>
    </div>
  )
}
