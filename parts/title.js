'use strict';

var core = require('../core');

require('./common');

var torrent, start, end, raw;

core.on('setup', function (data) {
	torrent = data;
	start = 0;
	end = undefined;
	raw = undefined;
});

core.on('part', function (part) {
	if (!part.match) {
		return;
	}

	if (part.match.index === 0) {
		start = part.match[0].length;
		return;
	}

	if (!end || part.match.index < end) {
		end = part.match.index;
	}
});

core.on('common', function () {
	var raw = end ? torrent.name.substr(start, end - start).split('(')[0] : torrent.name;
	var clean = raw;

	// clean up title
	clean = raw.replace(/^ -/, '');

	// if no spaces but has dots, replace dots with spaces
	if (clean.indexOf(' ') === -1 && clean.indexOf('.') !== -1) {
		clean = clean.replace(/\./g, ' ');
	}

	// Replace underscores with spaces, keep hyphens
	clean = clean.replace(/_/g, ' ');

	// Remove any trailing hyphens or spaces, but keep hyphens between words
	clean = clean.replace(/(?:[-\s]+(?=-|\s|$))|(?<=\s)-(?=\s)/g, '').trim();

	// Remove season and episode information if present
	clean = clean.replace(/\s+-\s+\d+x\d+.*$/, '');

	// Preserve hyphens in the middle of the title
	clean = clean.replace(/(\w+)\s+-\s+(\w+)/g, '$1 - $2');

	// Ensure the first letter of each word is capitalized, except for certain small words
	const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
	clean = clean.split(' ').map((word, index) => {
		if (index === 0 || !smallWords.includes(word.toLowerCase())) {
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		}
		return word.toLowerCase();
	}).join(' ');

	// Handle hyphenated words separately to ensure proper capitalization
	clean = clean.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');

	core.emit('part', {
		name: 'title',
		raw: raw,
		clean: clean
	});
});
