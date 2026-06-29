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

  const defaultYear = years[0] ?? new Date().getFullYear()
  const defaultMonth =
    albums.find((album) => album.year === defaultYear)?.month ??
    new Date().getMonth() + 1

  // State for filters
  const [selectedYear, setSelectedYear] = useState(defaultYear)
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth)

  // Filter albums based on selected year and month
  const filteredAlbums = useMemo(() => {
    return albums.filter(
      (album) => album.year === selectedYear && album.month === selectedMonth
    )
  }, [albums, selectedYear, selectedMonth])

  return (
    <div
      className="border border-gray-200 dark:border-gray-800"
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
            <button
              key={album.id}
              type="button"
              aria-pressed={selectedAlbum?.id === album.id}
              className="hover:bg-[var(--c-ui-bg-hover)]"
              onClick={() => onSelectAlbum(album)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelectAlbum(album)
                }
              }}
              style={{
                cursor: 'pointer',
                width: '100%',
                border: 0,
                padding: '8px',
                backgroundColor:
                  selectedAlbum?.id === album.id
                    ? 'var(--c-ui-bg-hover)'
                    : 'transparent',
                color: 'inherit',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                textAlign: 'left',
                transition: 'background-color 0.2s ease',
                fontFamily: 'inherit',
              }}
            >
              <img
                src={album.imageUrl}
                alt={`${album.albumName} cover`}
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'cover',
                }}
              />
              <span>
                <span
                  style={{
                    display: 'block',
                    margin: '0 0 2px 0',
                    fontSize: '14px',
                    fontWeight: '400',
                    color: 'var(--c-text)',
                  }}
                >
                  {album.songTitle}
                </span>
                <span
                  style={{
                    display: 'block',
                    margin: '0 0 2px 0',
                    fontSize: '12px',
                    color: 'var(--c-text-light)',
                  }}
                >
                  from "{album.albumName}"
                </span>
                <span
                  style={{
                    display: 'block',
                    margin: 0,
                    fontSize: '12px',
                    color: 'var(--c-text-light)',
                  }}
                >
                  {album.artist}
                </span>
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
