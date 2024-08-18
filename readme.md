# parse-torrent-filename

A robust and flexible library for parsing torrent filenames, extracting valuable information such as title, year, season, episode, quality, and more.

## Installation

```bash
npm install parse-torrent-filename
```

## Usage

```javascript
const parseTorrentFilename = require('parse-torrent-filename');

const parsed = parseTorrentFilename('The.Walking.Dead.S05E03.720p.HDTV.x264-ASAP[ettv]');
console.log(parsed);
```

Output:

```json
{
 "title": "The Walking Dead",
 "season": 5,
 "episode": 3,
 "resolution": "720p",
 "quality": "HDTV",
 "codec": "x264",
 "group": "ASAP"
}
```

## Features

- Extracts a wide range of information from torrent filenames
- Handles various naming conventions and formats
- Customizable with user-defined patterns and types
- Supports movies, TV shows, and other media types

## Extracted Information

The library can extract the following information (when available):

- Title
- Year
- Season
- Episode
- Episode Name
- Resolution (e.g., 720p, 1080p)
- Quality (e.g., HDTV, BluRay, WEB-DL)
- Codec (e.g., x264, XviD)
- Audio (e.g., AAC, AC3, DTS)
- Group
- Region
- Extended Edition
- Hardcoded Subtitles
- Proper Release
- Repack
- Container (e.g., MKV, AVI)
- Website
- Language

## Advanced Usage

### Custom Patterns and Types

You can add custom regex patterns or override existing ones:

```javascript
ptn.configure({
 newPattern: /customRegex/,
 existingPattern: /overrideRegex/
}, {
 newPattern: 'customType'
});
const result = ptn('Filename with custom pattern', {
 additionalPattern: /extraRegex/
}, {
 additionalPattern: 'extraType'
});



### Handling Special Cases

The library intelligently handles various edge cases, such as:

- Titles with numbers (e.g., "2047 - Sights of Death")
- Multiple languages (e.g., "MULTI", "TRUEFRENCH")
- Unconventional separators (dots, underscores)

## How It Works

1. The library uses a series of regular expressions to identify different parts of the filename.
2. It processes the filename in multiple passes, extracting information in a specific order.
3. The title is cleaned up by removing unnecessary characters and adjusting spacing.
4. Special cases and edge cases are handled through various conditional checks.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Testing

The test suite covers a wide range of filename formats.

To run the tests:

```bash
npm test
```

## License

This project is licensed under the MIT License.

## Acknowledgments

This library is a fork of [clems6ever/torrent-name-parser](https://github.com/clems6ever/torrent-name-parser).

---

For more detailed information on the implementation and available options, please refer to the source code and comments within the library.
