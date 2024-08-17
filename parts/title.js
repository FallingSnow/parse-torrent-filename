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
	clean = clean.replace(/[-\s]+$/, '').trim();

	// Split the title by spaces and hyphens
	var words = clean.split(/(?<=\S)(?=[-\s])|(?<=[-\s])(?=\S)/);

	// Capitalize each word, except for certain small words
	const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
	clean = words.map((word, index) => {
		if (word.trim() === '' || word === '-') return word; // Preserve spaces and hyphens
		if (index === 0 || !smallWords.includes(word.toLowerCase())) {
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		}
		return word.toLowerCase();
	}).join('');

	// Remove season and episode information if present
	clean = clean.replace(/\s+-\s+\d+x\d+.*$/, '');

	core.emit('part', {
		name: 'title',
		raw: raw,
		clean: clean
	});
});
