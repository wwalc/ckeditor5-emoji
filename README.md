CKEditor 5 emoji feature
========================

This package implements the emoji feature for CKEditor 5.

<img width="658" alt="Screenshot of a emoji plugin in CKEditor 5." src="https://user-images.githubusercontent.com/545175/33665566-a536a6cc-da97-11e7-9481-1d95c24a5fe5.png">

## Enabling the emoji plugin

Since this is a third-party plugin, it is not enabled by default in CKEditor 5 and has to be added to it manually. For more information check the official documentation about [creating custom builds](https://docs.ckeditor.com/ckeditor5/latest/builds/guides/development/custom-builds.html).

To install it, run:
```
npm install --save @wwalc/ckeditor5-emoji
```

When updating the build configuration use the following:
 * `@wwalc/ckeditor5-emoji/src/emoji` - plugin name
 * `emoji` - toolbar item (button)

## License

Licensed under the GPL, LGPL and MPL licenses, at your choice. For full details about the license, please check the `LICENSE.md` file.
