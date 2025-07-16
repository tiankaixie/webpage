import React, { useState, useMemo } from 'react'
import { MONTHS } from '../../utils/constants'

export default function AlbumList({
  albums,
  selectedAlbum,
  onSelectAlbum,
  isMobile,
}) {
  // Get unique years from albums
  const years = useMemo(() => {
    const uniqueYears = [...new Set(albums.map((album) => album.year))]
    return uniqueYears.sort((a, b) => b - a) // Sort descending
  }, [albums])

  // State for filters
  const [selectedYear, setSelectedYear] = useState(
    years.length > 0 ? years[0] : new Date().getFullYear()
  )
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1) // 1-12

  // Filter albums based on selected year and month
  const filteredAlbums = useMemo(() => {
    return albums.filter(
      (album) => album.year === selectedYear && album.month === selectedMonth
    )
  }, [albums, selectedYear, selectedMonth])

  return (
    <div
      className="border-1 border-gray-200 dark:border-gray-800"
      style={{
        width: isMobile ? '100%' : '50%',
        height: isMobile ? 'auto' : '100%',
        maxHeight: isMobile ? '40vh' : '100%',
        overflowY: 'auto',
        backgroundColor: 'transparent',
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
      }}
    >
      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '6px',
          padding: '12px',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--c-bg)',
          zIndex: 1,
        }}
      >
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          style={{
            padding: '2px 8px',
            backgroundColor: 'var(--c-bg)',
            color: 'var(--c-text)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgb(229, 231, 235)',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'inherit',
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          style={{
            padding: '2px 8px',
            backgroundColor: 'var(--c-bg)',
            color: 'var(--c-text)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgb(229, 231, 235)',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'inherit',
          }}
        >
          {MONTHS.map((month, index) => (
            <option key={index + 1} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Albums List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 12px',
          paddingBottom: isMobile ? '12px' : 0,
        }}
      >
        {filteredAlbums.length === 0 ? (
          <div
            style={{
              padding: '8px',
              textAlign: 'center',
              color: 'var(--c-text-light)',
              fontSize: '13px',
            }}
          >
            No albums found for {MONTHS[selectedMonth - 1]} {selectedYear}
          </div>
        ) : (
          filteredAlbums.map((album) => (
            <div
              key={album.id}
              onClick={() => onSelectAlbum(album)}
              style={{
                'cursor': 'pointer',
                'padding': '8px',
                'backgroundColor':
                  selectedAlbum?.id === album.id
                    ? 'var(--c-bg-hover)'
                    : 'transparent',
                'display': 'flex',
                'gap': '12px',
                'alignItems': 'center',
                'transition': 'background-color 0.2s ease',
                ':hover': {
                  backgroundColor: 'var(--c-bg-hover)',
                },
              }}
            >
              <img
                src={album.imageUrl}
                alt={album.title}
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'cover',
                }}
              />
              <div>
                <h3
                  style={{
                    margin: '0 0 2px 0',
                    fontSize: '14px',
                    fontWeight: '400',
                    color: 'var(--c-text)',
                  }}
                >
                  {album.songTitle}
                </h3>
                <p
                  style={{
                    margin: '0 0 2px 0',
                    fontSize: '12px',
                    color: 'var(--c-text-light)',
                  }}
                >
                  from "{album.albumName}"
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    color: 'var(--c-text-light)',
                  }}
                >
                  {album.artist}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
