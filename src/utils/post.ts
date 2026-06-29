import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

type PostCollectionKey = 'blog' | 'changelog'

/**
 * Retrieves filtered posts from the specified content collection.
 * In production, it filters out draft posts.
 *
 * @async
 * @param {ContentCollectionKey} contentCollectionType
 *  The type of the content collection to filter.
 * @returns {Promise<CollectionEntry<ContentCollectionKey>[]>}
 *  A promise that resolves to the filtered posts.
 */
export async function getFilteredPosts<K extends PostCollectionKey>(
  contentCollectionType: K
): Promise<CollectionEntry<K>[]> {
  return await getCollection(contentCollectionType, ({ data }) => {
    return import.meta.env.PROD && 'draft' in data ? !data.draft : true
  })
}

/**
 * Sorts an array of posts by their publication date in descending order.
 *
 * @param {CollectionEntry<ContentCollectionKey>[]} posts - An array of posts to sort.
 * @returns {CollectionEntry<ContentCollectionKey>[]} - The sorted array of posts.
 */
export function getSortedPosts(
  posts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'>[]
export function getSortedPosts(
  posts: CollectionEntry<'changelog'>[]
): CollectionEntry<'changelog'>[]
export function getSortedPosts(
  posts: (CollectionEntry<'blog'> | CollectionEntry<'changelog'>)[]
) {
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )
}
