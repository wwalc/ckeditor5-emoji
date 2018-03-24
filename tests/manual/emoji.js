/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document, console, window */

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Emoji from '../../src/emoji';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import List from '@ckeditor/ckeditor5-list/src/list';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [
			Essentials,
			Paragraph, Heading, Emoji, Bold, Italic, List
		],
		emoji: [
			{ name: 'smile', text: '😀' },
			{ name: 'wink', text: '😉' },
			{ name: 'cool', text: '😎' },
			{ name: 'surprise', text: '😮' },
			{ name: 'confusion', text: '😕' }
		],
		toolbar: [ 'heading', 'undo', 'redo', 'bold', 'italic', 'bulletedList', 'numberedList', 'emoji' ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
