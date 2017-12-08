/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module emoji/ui/emojilistview
 */

import View from '@ckeditor/ckeditor5-ui/src/view';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';

import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';
import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';
import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';

import '../../theme/emojilistview.css';

/**
 * The emoji list view controller class.
 *
 * See {@link module:emoji/ui/emojilistview~EmojiListView}.
 *
 * @extends module:ui/view~View
 */
export default class EmojiListView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor.locale );

		/**
		 * Tracks information about DOM focus in the form.
		 *
		 * @readonly
		 * @member {module:utils/focustracker~FocusTracker}
		 */
		this.focusTracker = new FocusTracker();

		/**
		 * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
		 *
		 * @readonly
		 * @member {module:utils/keystrokehandler~KeystrokeHandler}
		 */
		this.keystrokes = new KeystrokeHandler();
		this.emojiButtonViews = new ViewCollection( editor.locale );

		/**
		 * The Smile button view.
		 *
		 * @member {module:ui/button/buttonview~ButtonView}
		 */
		editor.config.get( 'emoji' ).forEach( emoji => {
			this.emojiButtonViews.add( this._createButton( emoji.text, 'emoji:' + emoji.name ) );
		} );

		/**
		 * A collection of views which can be focused in the form.
		 *
		 * @readonly
		 * @protected
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this._focusables = new ViewCollection();

		/**
		 * Helps cycling over {@link #_focusables} in the form.
		 *
		 * @readonly
		 * @protected
		 * @member {module:ui/focuscycler~FocusCycler}
		 */
		this._focusCycler = new FocusCycler( {
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				// Navigate form fields backwards using the Shift + Tab keystroke.
				focusPrevious: 'shift + tab',

				// Navigate form fields forwards using the Tab key.
				focusNext: 'tab'
			}
		} );

		this.setTemplate( {
			tag: 'form',

			attributes: {
				class: [
					'ck-emoji',
				],

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: [
				{
					tag: 'div',

					attributes: {
						class: [
							'ck-emoji__actions'
						]
					},

					children: this.emojiButtonViews
				}
			]
		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		submitHandler( {
			view: this
		} );

		this.emojiButtonViews.map( v => {
			// Register the view as focusable.
			this._focusables.add( v );

			// Register the view in the focus tracker.
			this.focusTracker.add( v.element );
		} );

		// Start listening for the keystrokes coming from #element.
		this.keystrokes.listenTo( this.element );
	}

	/**
	 * Focuses the fist {@link #_focusables} in the form.
	 */
	focus() {
		this._focusCycler.focusFirst();
	}

	/**
	 * Creates a button view.
	 *
	 * @private
	 * @param {String} label The button label
	 * @param {String} [eventName] An event name that the `ButtonView#execute` event will be delegated to.
	 * @returns {module:ui/button/buttonview~ButtonView} The button view instance.
	 */
	_createButton( label, eventName ) {
		const button = new ButtonView( this.locale );

		button.label = label;
		button.withText = true;

		if ( eventName ) {
			button.delegate( 'execute' ).to( this, eventName );
		}

		return button;
	}
}

/**
 * Fired when the emoji button is clicked ({module:emoji/emoji~EmojiListView}).
 *
 * @event emoji:{type}
 * @param {String} type The emoji type.
 */
