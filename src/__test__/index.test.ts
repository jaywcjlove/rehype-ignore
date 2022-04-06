import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { rehype } from 'rehype';
import rehypeRaw from 'rehype-raw';
import stringify from 'rehype-stringify';
import rehypeIgnore from '..';

it('rehypeIgnore test case', async () => {
  const html = `<!--rehype:ignore:start--><h1>header</h1><!--rehype:ignore:end-->`;
  const htmlStr = rehype()
    .data('settings', { fragment: true })
    .use(rehypeIgnore, { })
    .use(stringify)
    .processSync(html)
    .toString()
    expect(htmlStr).toEqual('');
});

it('rehypeIgnore test case', async () => {
  const html = `<!--rehype:ignore:start--><h1>header</h1>`;
  const htmlStr = rehype()
    .data('settings', { fragment: true })
    .use(rehypeIgnore, { })
    .use(stringify)
    .processSync(html)
    .toString()
    expect(htmlStr).toEqual(html);
});

it('rehypeIgnore test case', async () => {
  const html = `<h1>header</h1><!--rehype:ignore:end-->`;
  const htmlStr = rehype()
    .data('settings', { fragment: true })
    .use(rehypeIgnore, { })
    .use(stringify)
    .processSync(html)
    .toString()
    expect(htmlStr).toEqual(html);
});

it('rehypeIgnore test case', async () => {
  const html = `<!--rehype:ignore:start--><h1>header</h1><!--rehype:ignore:end--><!--rehype:ignore:end-->`;
  const htmlStr = rehype()
    .data('settings', { fragment: true })
    .use(rehypeIgnore, { })
    .use(stringify)
    .processSync(html)
    .toString()
    expect(htmlStr).toEqual(`<!--rehype:ignore:end-->`);
});

it('rehypeIgnore test case', async () => {
  const html = `<!--rehype:ignore:start-->
<h1>header</h1>
<!--rehype:ignore:end-->
<p>
  Hello <!--rehype:ignore:start--> <code>World</code> <!--rehype:ignore:end-->
</p>
`;
  const expected = `
<p>
  Hello </p>
`
  const htmlStr = rehype()
    .data('settings', { fragment: true })
    .use(rehypeIgnore, { })
    .use(stringify)
    .processSync(html)
    .toString()
    expect(htmlStr).toEqual(expected);
});