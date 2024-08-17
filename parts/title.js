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

	// Split the title by spaces, preserving hyphens when surrounded by letters
	var words = clean.split(/(?<=\S)(?=\s)|(?<=\s)(?=\S)/);

	// Join the words back together, preserving original capitalization
	clean = words.join('');

	// Remove season and episode information if present
	clean = clean.replace(/\s+-\s+\d+x\d+.*$/, '');

	// Replace hyphens with spaces if there are no other spaces
	if (clean.indexOf(' ') === -1) clean = clean.replace(/-/g, ' ');

	core.emit('part', {
		name: 'title',
		raw: raw,
		clean: clean
	});
});
