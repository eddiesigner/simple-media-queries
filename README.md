# Simple Media Queries

> [PostCSS](https://github.com/postcss/postcss) plugin for make simple (and **mobile first**) media queries.

## Install

```sh
npm install --save-dev postcss-simple-media-queries
```

## Input / Output

```css
/* Before */
p {
  margin: 0;
  @media (mq('medium')) {
    margin: 25px 0;
  }
}

/* After */
p {
  margin: 0;
}

@media only screen and ( min-width: 42em ) {
  p {
    margin: 25px 0;
  }
}
```

## Usage

This plugin needs to be executed **before** the [postcss-nested](https://github.com/postcss/postcss-nested) plugin.

### PostCSS

```js
var fs = require('fs');
var postcss = require('postcss');
var postcss_nested = require('postcss-nested');
var simple_media_queries = require('postcss-simple-media-queries');
var css = fs.readFileSync('input.css', 'utf8');

var output = postcss([simple_media_queries, postcss_nested])
  .process(css)
  .css;
```

### Gulp

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var postcss_nested = require('postcss-nested');
var simple_media_queries = require('postcss-simple-media-queries');

gulp.task('css', function () {
  var processors = [
    simple_media_queries,
    postcss_nested
  ];

  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});
```


### Options

This is the default configuration:

```js
{
  'initialize': '1px',
  'small': '35.5em', // >= 568px @ 16px
  'medium': '48em', // >= 768px @ 16px
  'large': '64em', // >= 1024px @ 16px
  'extra-large': '80em' // >= 1280px @ 16px
}
```

You can override or extend this configuration object according to your needs, for example:

```js
...
var processors = [
  simple_media_queries({
    'mobile': '32em',
    'tablet': '45em',
    'desktop': '64em',
    'extra-large': '80em',
    'super-large': '96em'
    }),
  postcss_nested
];
...
```
