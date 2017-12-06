CKEditor 5 emoji feature
========================

This package implements the emoji feature for CKEditor 5.

<img width="658" alt="Screenshot of a emoji plugin in CKEditor 5." src="https://user-images.githubusercontent.com/545175/33665566-a536a6cc-da97-11e7-9481-1d95c24a5fe5.png">

The plugin was created during hackathon, it is roughly based on the source code of the link plugin. It basically inserts Unicode emoji into the editor at the current cursor position.

## CKEditor 5 compatibility

The plugin was built on top of the latest development version of CKEditor 5 (`0c7bc99ab`) and *does not work with the latest "official release" (ver. 1.0.0-alpha.2)*.
It should be compatible with 1.0.0-alpha.3 though (once it is released).

## Enabling the emoji plugin

Since this is a third-party plugin, it is not enabled by default in CKEditor 5 and has to be added to it manually. For more information check the official documentation about [creating custom builds](https://docs.ckeditor.com/ckeditor5/latest/builds/guides/development/custom-builds.html).

To install it, run:
```
npm install --save @wwalc/ckeditor5-emoji
```

When updating the build configuration use the following:
 * `@wwalc/ckeditor5-emoji/src/emoji` - plugin name
 * `emoji` - toolbar item (button)

*Note: the above steps will not work today, due to compatibility issues described above.*

## Configuration

The list of Emojis is configurable via `config.emoji`:

```
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [
            Essentials,
            Paragraph, Heading, Bold, Italic, List, Emoji
        ],
        emoji: [
            { name: 'smile', text: '😀' },
            { name: 'wink', text: '😉' },
            { name: 'cool', text: '😎' },
            { name: 'surprise', text: '😮' },
            { name: 'confusion', text: '😕' },
            { name: 'crying', text: '😢' }
        ],
        toolbar: [ 'headings', 'undo', 'redo', 'bold', 'italic', 'emoji' ]
    } )
    .then( editor => {
        window.editor = editor;
    } )
    .catch( err => {
        console.error( err.stack );
    } );
```

## Support

The plugin comes with no support. However if you find it useful, feel free to submit an issue and/or send a pull request.

## License

Licensed under the GPL, LGPL and MPL licenses, at your choice. For full details about the license, please check the `LICENSE.md` file.
