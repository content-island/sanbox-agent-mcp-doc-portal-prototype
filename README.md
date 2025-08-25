# Documentation Portal

A professional Astro-based documentation portal integrated with Content Island CMS.

## Features

- 📚 **Modern Documentation Portal**: Clean, responsive design with sidebar navigation
- 🔄 **Content Island Integration**: Seamless CMS integration with TypeScript support
- 📝 **Markdown Support**: Full markdown rendering with syntax highlighting
- � **Responsive Design**: Mobile-friendly with collapsible navigation
- ♿ **Accessibility**: WCAG compliant with keyboard navigation support
- 🎨 **Syntax Highlighting**: Code blocks with highlight.js integration
- 🚀 **Static Generation**: Fast loading with Astro's static site generation

## Prerequisites

- Node.js 18.14.1 or higher
- npm or yarn package manager
- Content Island account with access token

## Installation

1. **Clone and setup the project:**
   ```bash
   cd /path/to/your/project
   npm install
   ```

2. **Environment Configuration:**
   
   Copy the example environment file and add your Content Island access token:
   ```bash
   cp .env .env.local
   ```
   
   Edit `.env.local` and replace `your_token_here` with your actual Content Island access token:
   ```
   CONTENT_ISLAND_ACCESS_TOKEN=your_actual_token_here
   ```

3. **Get your Content Island Access Token:**
   - Log in to your Content Island dashboard
   - Navigate to Settings > API Keys
   - Create a new access token or copy an existing one
   - Add the token to your `.env.local` file

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:4321`

## Content Structure

This documentation portal expects the following Content Island content types:

### Root
- **Purpose**: Starting point that references all folders
- **Fields**:
  - `folders`: Array of folder references

### Folder
- **Purpose**: Documentation sections/categories
- **Fields**:
  - `title`: Display name for the folder
  - `slug`: URL-friendly identifier
  - `items`: Array of page references

### Item (Pages)
- **Purpose**: Individual documentation pages
- **Fields**:
  - `title`: Page title
  - `slug`: URL-friendly identifier  
  - `description`: Optional page description
  - `content`: Markdown content

## URL Structure

- Home: `/`
- Documentation pages: `/[folder-slug]/[item-slug]`

Example: `/getting-started/installation`

## API Functions

The project includes the following Content Island API functions:

### Root Functions
- `getRoot()`: Get the root content with folder references

### Folder Functions
- `getFolderList()`: Get all folders
- `getFolderBySlug(slug)`: Get folder by slug
- `getFolderById(id)`: Get folder by ID
- `getFoldersByIds(ids)`: Get multiple folders by IDs

### Item Functions
- `getItemList()`: Get all items/pages
- `getItemBySlug(slug)`: Get item by slug
- `getItemById(id)`: Get item by ID
- `getItemsByIds(ids)`: Get multiple items by IDs

### Navigation Function
- `getNavigationStructure()`: Get complete navigation with folders and their items

## Build Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run astro`: Run Astro CLI commands

## Project Structure

```
src/
├── components/          # Reusable components
├── layouts/
│   └── Layout.astro     # Main layout with navigation
├── lib/
│   └── content-island.ts # Content Island API client
├── pages/
│   ├── index.astro      # Home page
│   ├── 404.astro        # Not found page
│   └── [folder]/
│       └── [item].astro # Dynamic documentation pages
├── types/
│   └── content.ts       # TypeScript interfaces
├── utils/
│   └── markdown.ts      # Markdown parsing utilities
└── env.d.ts            # Environment type definitions
```

## Customization

### Styling
The application uses custom CSS defined in the Layout component. You can modify the styles in:
- `src/layouts/Layout.astro` (main styles)

### Markdown Rendering
Markdown processing is handled in `src/utils/markdown.ts` using:
- **marked**: Markdown parsing
- **highlight.js**: Syntax highlighting

### Navigation
The sidebar navigation is automatically generated from your Content Island structure. To modify the navigation behavior, edit:
- `src/lib/content-island.ts` (data fetching)
- `src/layouts/Layout.astro` (navigation rendering)

## Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting provider

3. **Set environment variables** on your hosting platform:
   - `CONTENT_ISLAND_ACCESS_TOKEN`: Your Content Island access token

### Popular hosting options:
- **Vercel**: Automatic deployment with environment variables
- **Netlify**: Static site hosting with build commands
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Static website hosting

## Troubleshooting

### Common Issues

1. **"Failed to load navigation data" error**
   - Check your Content Island access token
   - Verify your content structure matches the expected types
   - Ensure your Content Island project has the correct content types

2. **Pages not generating correctly**
   - Verify folder and item slugs are unique and URL-safe
   - Check that all required fields are filled in Content Island
   - Review the browser console for detailed error messages

3. **Styles not loading**
   - Check that highlight.js CSS is loading correctly
   - Verify custom CSS in Layout.astro is not being overridden

4. **Build failures**
   - Ensure all environment variables are set during build
   - Check for TypeScript errors in the build output
   - Verify all Content Island API calls are working

### Debug Mode

Enable debug logging by adding console output in:
- `src/lib/content-island.ts` (API calls)
- `src/pages/[folder]/[item].astro` (static path generation)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For Content Island specific issues:
- Content Island Documentation: https://docs.contentisland.net/
- Content Island Support: Contact your Content Island administrator

For technical issues with this documentation portal:
- Check the troubleshooting section above
- Review Astro documentation: https://docs.astro.build/
- Create an issue in the project repository
