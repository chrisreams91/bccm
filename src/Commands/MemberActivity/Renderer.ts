import * as ReactDOMServer from 'react-dom/server';
import { writeFile } from 'fs/promises';
import sharp from 'sharp';
import path from 'path';

// converting to PNG so that discord will show a preview
export const jsxToPNGBuffer = async (element: JSX.Element) => {
  const html = ReactDOMServer.renderToStaticMarkup(element);
  const buf = ReactDOMServer.renderToStaticNodeStream(element);
  // remove wrapping div
  const ultraHack = html.substring(31, html.length - 6);
  await writeFile('test.svg', ultraHack);

  return sharp(path.join(__dirname, '../../../test.svg')).png().toBuffer();
};
