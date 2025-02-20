# WebStack-Vue

A modern website navigation platform built with Vue.js, featuring a clean and responsive interface for organizing and managing web bookmarks.

## Features

- 📚 Category Management
  - Create, edit, and delete categories
  - Custom icons for categories
  - Drag-and-drop category reordering (coming soon)

- 🔖 Website Management
  - Add websites with title, URL, description, and logo
  - Edit website information inline
  - Move websites between categories
  - Quick search and filtering (coming soon)

- 🔍 Search Engine Integration
  - Multiple search engine support (Google, Bing, Baidu)
  - Customizable search engines
  - Set default search engine
  - Add custom search engines with icons

- 💾 Data Persistence
  - Automatic saving of changes
  - JSON-based data storage
  - Easy backup and restore

## Tech Stack

- Vue.js
- Bootstrap for styling
- Node.js backend for data persistence
- JSON file storage

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v12.0 or higher)
- Yarn package manager
- A modern web browser

## Project Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd WebStack-vue
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn serve
```

4. Start the backend server (in a separate terminal):
```bash
node server.js
```

The application will be available at `http://localhost:8080`

## Build for Production

To build the project for production:

```bash
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
WebStack-vue/
├── src/                    # Source files
│   ├── assets/            # Static assets
│   ├── components/        # Vue components
│   ├── views/             # Vue views
│   ├── App.vue           # Root component
│   └── main.js           # Entry point
├── public/                # Public static files
├── server.js             # Backend server
└── package.json          # Project dependencies
```

## Configuration

The application can be configured through the following files:
- `src/assets/data.json`: Website and category data
- `vue.config.js`: Vue CLI configuration
- `.env`: Environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original WebStack design inspiration
- Vue.js community
- All contributors who have helped with the project

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## todo
1. wechat qrcode
2. logo
