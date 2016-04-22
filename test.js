import simpleMediaQueries from './index';
import postcss from 'postcss';
import assert from 'assert';

it('should replace a media query', done => {
  verify('p { margin: 0; @media (mq("medium")) { margin: 25px 0; } }', 'p { margin: 0; @media only screen and ( min-width: 48em ) { margin: 25px 0; } }', done);
});

function verify(input, out, done) {
  postcss([simpleMediaQueries])
    .process(input)
    .then(res => {
      assert(res.warnings().length === 0);
      assert(res.css === out);
      done();
    })
    .catch(err => {
      done(err);
    })
}
