import { createClient } from '@content-island/api-client';
import type { Folder, Item, Root } from '../types/content';

// Initialize Content Island client
const client = createClient({
  accessToken: import.meta.env.CONTENT_ISLAND_ACCESS_TOKEN,
});

// Root content functions
export async function getRoot(): Promise<Root | null> {
  try {
    const content = await client.getContent<Root>({
      contentType: 'Root'
    });
    return content;
  } catch (error) {
    console.error('Error fetching root:', error);
    return null;
  }
}

// Folder content functions
export async function getFolderList(): Promise<Folder[]> {
  try {
    const folders = await client.getContentList<Folder>({
      contentType: 'Folder'
    });
    return folders;
  } catch (error) {
    console.error('Error fetching folder list:', error);
    return [];
  }
}

export async function getFolderBySlug(slug: string): Promise<Folder | null> {
  try {
    const folder = await client.getContent<Folder>({
      contentType: 'Folder',
      'fields.slug': slug
    });
    return folder;
  } catch (error) {
    console.error('Error fetching folder by slug:', error);
    return null;
  }
}

export async function getFolderById(id: string): Promise<Folder | null> {
  try {
    const folder = await client.getContent<Folder>({
      id
    });
    return folder;
  } catch (error) {
    console.error('Error fetching folder by ID:', error);
    return null;
  }
}

export async function getFoldersByIds(ids: string[]): Promise<Folder[]> {
  if (!ids.length) return [];
  
  try {
    const folders = await client.getContentList<Folder>({
      id: { in: ids }
    });
    return folders;
  } catch (error) {
    console.error('Error fetching folders by IDs:', error);
    return [];
  }
}

// Item content functions
export async function getItemList(): Promise<Item[]> {
  try {
    const items = await client.getContentList<Item>({
      contentType: 'Item'
    });
    return items;
  } catch (error) {
    console.error('Error fetching item list:', error);
    return [];
  }
}

export async function getItemBySlug(slug: string): Promise<Item | null> {
  try {
    const item = await client.getContent<Item>({
      contentType: 'Item',
      'fields.slug': slug
    });
    return item;
  } catch (error) {
    console.error('Error fetching item by slug:', error);
    return null;
  }
}

export async function getItemById(id: string): Promise<Item | null> {
  try {
    const item = await client.getContent<Item>({
      id
    });
    return item;
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    return null;
  }
}

export async function getItemsByIds(ids: string[]): Promise<Item[]> {
  if (!ids.length) return [];
  
  try {
    const items = await client.getContentList<Item>({
      id: { in: ids }
    });
    return items;
  } catch (error) {
    console.error('Error fetching items by IDs:', error);
    return [];
  }
}

// Navigation types for proper typing
export interface NavigationFolder extends Omit<Folder, 'items'> {
  items: Item[];
}

// Helper function to get complete navigation structure
export async function getNavigationStructure(): Promise<{
  folders: NavigationFolder[]
}> {
  try {
    const root = await getRoot();

    if (!root) {
      return { folders: [] };
    }

    // Get folders referenced by root
    const folders = await getFoldersByIds(root.folders);
    
    // For each folder, get its associated items
    const foldersWithItems = await Promise.all(
      folders.map(async (folder): Promise<NavigationFolder> => {
        const items = folder.items ? await getItemsByIds(folder.items) : [];
        return {
          ...folder,
          items
        };
      })
    );

    return { folders: foldersWithItems };
  } catch (error) {
    console.error('Error building navigation structure:', error);
    return { folders: [] };
  }
}
