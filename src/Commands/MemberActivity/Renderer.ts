import * as ReactDOMServer from 'react-dom/server';
import { writeFile, unlink } from 'fs/promises';
import sharp from 'sharp';
import path from 'path';

// converting to PNG so that discord will show a preview
export const jsxToPNGBuffer = async (element: JSX.Element) => {
  const html = ReactDOMServer.renderToStaticMarkup(element);
  const ultraHack = html.substring(31, html.length - 6);

  const tempFileName = `${Date.now()}.svg`;
  const fullPath = path.join(__dirname, `../../../${tempFileName}`);

  // remove wrapping div
  await writeFile(`${tempFileName}`, ultraHack);
  const buffer = await sharp(fullPath).png().toBuffer();
  await unlink(fullPath);

  return buffer;
};
