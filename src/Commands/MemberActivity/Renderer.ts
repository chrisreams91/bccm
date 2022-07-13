import * as ReactDOMServer from 'react-dom/server';
import { LineChart } from './LineChart';
import { writeFile } from 'fs/promises';
import sharp from 'sharp';
import path from 'path';

export const render = async () => {
  const html = LineChart();
  const x = ReactDOMServer.renderToStaticMarkup(html);
  const ultraHack = x.substring(31, x.length - 6);
  await writeFile('test.svg', ultraHack);

  await sharp(path.join(__dirname, '../../../test.svg'))
    .png()
    .toFile('test.png');
};
